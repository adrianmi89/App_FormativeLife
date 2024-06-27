// Fichero que nos va permitir la carga de archivos y almacenarlos en el servicio Firebase de Google

// La librería multer es un middleware que nos permite manejar componentes como form-data, para subir archivos
import multer from 'multer'

    const upload = multer({ dest: "uploads/" });


export default upload; 