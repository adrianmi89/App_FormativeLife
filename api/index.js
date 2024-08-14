import mongoose from "mongoose"
import express from "express"
import upload from "./config/multer.js"
import { uploadFile } from "./util/uploadFile.js"
import logic from "./logic/index.js"
import cors from "cors"
import { errors } from "com"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
//Faltaba añadir el import de la base de datos para la carga de archivos
import { Career } from "./data/index.js"

dotenv.config();

const { JsonWebTokenError, TokenExpiredError } = jwt;

const { ContentError, DuplicityError, MatchError } = errors;

//Le cambiamos el puerto a la App de esta forma
const { PORT, MONGO_URL, JWT_SECRET } = process.env;

mongoose.connect(MONGO_URL)
    .then(() => {

        console.log(`DB connected at ${MONGO_URL}`);

        const server = express();

        //URL por defecto
        server.get("/", (req, res) => res.json({ hello: "Bienvenido a mi API, client" }));
        
        const jsonBodyParser = express.json();

        //Usando la librería cors para que se pueda llamar a la API desde otro servidor (le damos permiso a ese puerto)
        const allowedOrigins = ['http://localhost:5173', 'https://www.formativelife.netlify.app']

        const corsOptions = {
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        }

        server.use(cors(corsOptions));

        //Configurar el almacenamiento de Multer creando la carpeta de almacenamiento y la ruta

        /* const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "uploads/")
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`)
            }
        }) */

        //const dir = "./images"

        /* if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        } 

        server.post("/images/single", upload.fields([{ name:"imagen", maxCount:1 }]), async(req, res) => {
        
            const body = req.body;
            const image = req.files.imagen;
                
            if(image && image.lenth > 0){

                const { fileDownloadURL } = await uploadFile(image[0]);

                return res.status(200).json({message: "Imagen subida con éxito"});
            }
            else
                return res.status(400).json({message: "Debes enviar una imágen"})           
        }); */
 
        //Le pasamos los datos del registro a la ruta de la API si se validó todo correctamente
        //TEST PASADO
        server.post("/users/students", jsonBodyParser, (req, res) => {
            try {
                const { name, surnames, age, email, password } = req.body;
                logic.registerStudent(name, surnames, age, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {

                        let status = 500;

                        if (error instanceof DuplicityError) status = 409;

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            }
            catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400;

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //TEST PASADO
        server.post("/users/companies", jsonBodyParser, (req, res) => {
            try {
                const { name, address, activity, email, password } = req.body;

                logic.registerCompany(name, address, activity, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {

                        let status = 500;

                        if (error instanceof DuplicityError) status = 409;

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            }
            catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                    status = 400;

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        //Creamos el token del usuario con un ID existente en la base de datos
        //TEST PASADO
        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.autenticateUser(email, password)
                    .then(user => {

                        const token = jwt.sign(
                            { sub: user.id, role: user.role },
                            "esta app va ser disrruptiva en la forma de encontrar trabajo",
                            { expiresIn: "30m" }
                        )
                        res.status(200).json(token);
                    })
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 401;

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            }
            catch (error) {
                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //TEST PASADO
        // TODO Modificar lo de certification
        //server.post('/career', jsonBodyParser,(req, res) => {
            /* try {
                const { authorization } = req.headers
      
                const token = authorization.slice(7)
      
                const { sub: studentUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')
      
                const { title, description, certification } = req.body
      
                logic.createCareer(studentUserId, title, description, certification)
                    .then(() => res.status(201).send())
                    .catch(error =>{
                      let status = 500;
      
                      if(error instanceof MatchError) status = 401;
      
                      res.status(status).json({ error: error.constructor.name, message: error.message })
                })
        } 
        catch(error){
          let status = 500;
      
          if(error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;
      
          res.status(status).json({ error: error.constructor.name, message: error.message })
        } */
      //})

      server.post("/career", upload.fields([{name: "certification", maxCount: 1}]), async(req, res) => {

       try{
            const { authorization } = req.headers
            const token = authorization.slice(7)
            const { sub: studentUserId } = jwt.verify(token, JWT_SECRET)
      
            const { title, description } = req.body;
            const archivo = req.files && req.files.certification && req.files.certification[0]
            
            if(!archivo) 
                return res.status(400).json({ error: "Archivo no encontrado"}) 

            const { downloadURL } = await uploadFile(archivo);
            const certification = downloadURL;

            const createdCareer = await logic.createCareer(studentUserId, title, description, certification);
            
            res.status(201).json(createdCareer);
       }
       catch(error){
        console.error('Error in POST /career:', error.message);

        let status = 500;

        if (error instanceof MatchError) {
            status = 401;
        } else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
            status = 401;
            error = new MatchError(error.message);
        } else if (error instanceof ContentError) {
            status = 400;
        }

        res.status(status).json({ error: error.constructor.name, message: error.message });
       }
    })
    
    server.get("/careers", (req, res) => {

        return res.json({ message : "Careers"})
    })
      //TEST PASADO
      server.post('/offer', jsonBodyParser, (req, res) => {
        try {
            const { authorization } = req.headers
  
            const token = authorization.slice(7)
  
            const { sub: companyUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')
  
            const { title, description, minSalary, maxSalary, publishDate, expirationDate } = req.body
  
            logic.createOffer(companyUserId, title, description, minSalary, maxSalary, publishDate, expirationDate)
                .then(() => res.status(201).send())
                .catch(error =>{
                  let status = 500;
  
                  if(error instanceof MatchError) status = 401;
  
                  res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } 
    catch(error){
      let status = 500;
  
      if(error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;
  
      res.status(status).json({ error: error.constructor.name, message: error.message })
    }
  })
  // Pendiente para subir ficheros
  server.post("/users/students", jsonBodyParser, (req, res) => {
    try {
        const { name, surnames, age, email, password } = req.body;
        logic.registerStudent(name, surnames, age, email, password)
            .then(() => res.status(201).send())
            .catch(error => {

                let status = 500;

                if (error instanceof DuplicityError) status = 409;

                res.status(status).json({ error: error.constructor.name, message: error.message });
            })
    }
    catch (error) {

        let status = 500;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            status = 400;

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
})
  //TEST PASADO
  server.patch('/careers/:targetCareerId', jsonBodyParser, (req, res) => {
    try {
        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { sub: studentUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')

        const { title, description, certification } = req.body

        const { targetCareerId } = req.params

        logic.updateCareer(studentUserId, targetCareerId, title, description, certification)
            .then(() => res.status(204).send())
            .catch(error =>{
              let status = 500;

              if(error instanceof MatchError) status = 401;

              res.status(status).json({ error: error.constructor.name, message: error.message })
        })
    } 
    catch(error){
    let status = 500;

    if(error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

    res.status(status).json({ error: error.constructor.name, message: error.message })
    }
    })

    server.patch('/offers/:targetOfferId', jsonBodyParser, (req, res) => {
        try {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: companyUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')

            const { title, description, minSalary, maxSalary, publishDate, expirationDate } = req.body

            const { targetOfferId } = req.params

            logic.updateOffer(companyUserId, targetOfferId, title, description, minSalary, maxSalary, publishDate, expirationDate)
                .then(() => res.status(204).send())
                .catch(error =>{
                let status = 500;

                if(error instanceof MatchError) status = 401;

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } 
    catch(error){
    let status = 500;

    if(error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

    res.status(status).json({ error: error.constructor.name, message: error.message })
    }
    })

  server.get('/users', (req, res) => {
    try {

        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        logic.retrieveUsers(userId)
            .then(user => res.json(user))
            .catch(error => {

                let status = 500;

                if (error instanceof MatchError) {

                    status = 404;
                }

                res.status(status).json({ error: error.constructor.name, message: error.message });
            })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //TEST PASADO
        server.get('/users/:targetUserId', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {

                        let status = 500;

                        if (error instanceof MatchError) {

                            status = 404;
                        }

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.get('/users/:targetUserId/careers', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveCareersFromStudent(targetUserId)
                    .then(careers => res.json(careers))
                    .catch(error => {

                        let status = 500;

                        if (error instanceof MatchError) {

                            status = 404;
                        }

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })


        server.get('/users/:targetUserId/offers', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveOffersFromCompany(targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {

                        let status = 500;

                        if (error instanceof MatchError) {

                            status = 404;
                        }

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        //TODO Ir al perfil de otro usuario
        server.get('/profile/:targetUserId', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {

                        let status = 500;

                        if (error instanceof MatchError) {

                            status = 404;
                        }

                        res.status(status).json({ error: error.constructor.name, message: error.message });
                    })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/offers/:offerId', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { offerId } = req.params

                logic.deleteOffer(userId, offerId)
                    .then(() => res.status(204).send())
                    .catch(error =>{
                      let status = 500;
      
                      if(error instanceof MatchError) status = 401;
      
                      res.status(status).json({ error: error.constructor.name, message: error.message })
                })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/careers/:careerId', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { careerId } = req.params

                logic.deleteCareer(userId, careerId)
                    .then(() => res.status(204).send())
                    .catch(error =>{
                      let status = 500;
      
                      if(error instanceof MatchError) status = 401;
      
                      res.status(status).json({ error: error.constructor.name, message: error.message })
                })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.delete('/users/:userId', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.deleteCareer(userId)
                    .then(() => res.status(204).send())
                    .catch(error =>{
                      let status = 500;
      
                      if(error instanceof MatchError) status = 401;
      
                      res.status(status).json({ error: error.constructor.name, message: error.message })
                })
            } catch (error) {

                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {

                    status = 400
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        server.listen(PORT, () => console.log("API started"));
    })
    .catch((error) => console.error(error));