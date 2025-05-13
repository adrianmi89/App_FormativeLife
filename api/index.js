import mongoose from "mongoose"
import express from "express"
import upload from "./config/multer.js"
import { google } from "googleapis"
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
const { PORT, MONGO_URL, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

//Configuración de Google OAuth
const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

mongoose.connect(MONGO_URL)
    .then(() => {

        console.log(`DB connected at ${MONGO_URL}`);

        const server = express();

        //URL por defecto
        server.get("/", (req, res) => res.json({ hello: "Bienvenido a mi API, client" }));

        const jsonBodyParser = express.json();

        //Usando la librería cors para que se pueda llamar a la API desde otro servidor (le damos permiso a ese puerto)
        const allowedOrigins = ['http://localhost:5173', 'https://www.formativelife.netlify.app']

        /* const corsOptions = {
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        } */

        server.use(cors());

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
        // Endpoint para iniciar el flujo de autenticación con Google

        server.get('/auth/google', (req, res) => {
            const scopes = [
                'https://www.googleapis.com/auth/calendar.events',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ]

            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent',
            })

            res.redirect(authUrl)

        // Endpoint para manejar el callback de Google

        server.get('/google/redirect', async (req, res) => {
            const { code } = req.query

            try {
                const { tokens } = await oauth2Client.getToken(code)

                oauth2Client.setCredentials(tokens)

                // Guarda los tokens en tu base de datos junto con el usuario autenticado
                // Ejemplo: await logic.saveGoogleTokens(userId, tokens);

                res.status(200).json({ message: 'Google tokens saved successfully', tokens })
            } catch (error) {
                res.status(500).json({ error: 'Failed to retrieve tokens from Google', message: error.message })
            }
        })

        // Obtener eventos del calendario de Google

        server.get('/calendar/events', async (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                // Recupera los tokens de Google guardados en tu base de datos
                const googleTokens = await logic.getGoogleTokens(userId)

                oauth2Client.setCredentials(googleTokens)

                const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

                const { data } = await calendar.events.list({
                    calendarId: 'primary',
                    timeMin: new Date().toISOString(),
                    maxResults: 10,
                    singleEvents: true,
                    orderBy: 'startTime',
                });

                res.json(data.items);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch calendar events', message: error.message })
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
    })

        server.post("/career", upload.fields([{ name: "certification", maxCount: 1 }]), async (req, res) => {

            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: studentUserId } = jwt.verify(token, JWT_SECRET)

                const { title, description } = req.body;
                const archivo = req.files && req.files.certification && req.files.certification[0]

                if (!archivo)
                    return res.status(400).json({ error: "Archivo no encontrado" })

                const { downloadURL } = await uploadFile(archivo);
                const certification = downloadURL;

                const createdCareer = await logic.createCareer(studentUserId, title, description, certification);

                res.status(201).json(createdCareer);
            }
            catch (error) {
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

            return res.json({ message: "Careers" })
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
        //Añadimos al candidato en una oferta
        //Ruta validada con éxito
        server.post("/offers/:offerId/candidates", (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: studentUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')

                const { offerId } = req.params

                logic.createCandidate(studentUserId, offerId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 404;

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            }
            catch (error) {
                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

                if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){

                    status = 400;
                    error = new MatchError(error.message);
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })

            }
        })
        // TODO. Modificarlo
        server.delete("/users/students/:userId/MyCandidatures/:candidatureId", (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: studentUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')

                const { offerId } = req.params

                logic.deleteCandidate(studentUserId, offerId)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 404;

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    })
            }
            catch (error) {
                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

                if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){

                    status = 400;
                    error = new MatchError(error.message);
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })

            }
        })

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
        server.patch('/careers/:targetCareerId', upload.fields([{ name: "certification", maxCount: 1 }]), async (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: studentUserId } = jwt.verify(token, 'esta app va ser disrruptiva en la forma de encontrar trabajo')

                const { title, description } = req.body

                const { targetCareerId } = req.params

                const archivo = req.files && req.files.certification && req.files.certification[0]

                if (!archivo)
                    return res.status(400).json({ error: "Archivo no encontrado" })

                const { downloadURL } = await uploadFile(archivo);
                const certification = downloadURL;

                const updatedCareer = await logic.updateCareer(studentUserId, targetCareerId, title, description, certification);

                res.status(201).json(updatedCareer);
            }
            catch (error) {
                let status = 500;

                if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) status = 400;

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

        // Ruta para acceder las ofertas publicadas de una empresa
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

        // Ruta para acceder a las ofertas activas de un estudiante
        server.get('/users/:targetUserId/offersActives', (req, res) => {
            try {

                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveOffersFromStudent(targetUserId)
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
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 401;

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
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 401;

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
                    .catch(error => {
                        let status = 500;

                        if (error instanceof MatchError) status = 401;

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