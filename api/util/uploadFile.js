import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase.js"
import sharp from "sharp"

export async function uploadFile(archivo){

    if(!archivo || !archivo.buffer){
        throw new Error("File or file buffer is undefined");
    }

    try{
        //Procesa el archivo dándole una resolución específica
        const fileBuffer = await sharp(archivo.buffer)
        .resize({width: 800, height: 800, fit: "cover"}).toBuffer();

        //Genera un nombre único para el archivo
        const fileName = `${Date.now()}_${archivo.originalname.replace(/\s+/g, '_')}`;
        const fileRef = ref(storage, `files/${fileName}`);

        //Define los metadatos del archivo
        const fileMetadata = {
            contentType: archivo.mimetype
        }

        //Sube el archivo a la nube
        const fileUploadPromise = uploadBytesResumable(
            fileRef,
            fileBuffer,
            fileMetadata
        )
        await fileUploadPromise;

        //Obten la URL de descarga
        const fileDownloadURL = await getDownloadURL(fileRef);

        return { ref: fileRef, downloadURL: fileDownloadURL};
    }
    catch(error){
        throw new Error(`Error uploading file: ${error.message}`);
    }
}