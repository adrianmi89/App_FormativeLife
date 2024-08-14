import { useState } from "react"
import logic from "../logic"
import Button from "./ButtonEditProfile"
import { errors } from "com"

const { MatchError, ContentError } = errors;

function CreateCareer({ onCancelClick, onCreateCareer }){

    const handleCancelClick = () => onCancelClick();

    const handleSubmit = async event => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const description = form.description.value;
        const certification = form.certification.files[0];

    try{
        await logic.createCareer(title, description, certification);
        onCreateCareer();
    }
    catch(error){

        console.error('Error en handleSubmit:', error)

            let feedback = 'Lo sentimos, hubo un error. Por favor, inténtelo de nuevo más tarde.'

            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {
                feedback = `${error.message}, por favor corríjalo.`
            } else if (error instanceof MatchError) {
                feedback = `${error.message}, use datos válidos.`
            }

            alert(feedback)
    }
}
 
/* Estilos para el formulario 

            .formContainer{
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            width: fit-content;
            gap: 1rem;
            border: 3px solid white;
            padding: 3rem;
        }
        button{
            background-color: black;
            border: 1px solid transparent;
            color: white;
            width: 100%;
            padding: 1rem;
            cursor: pointer;
            transition-duration: 0.3s;
            text-transform: uppercase;
            font-weight: bold;
        }
        button:hover{
            background-color: white;
            color: black;
            border: 1px solid white;
        }
        input{
            padding: .3rem;
        }
        div{
            display: flex;
            gap: 1rem;
        } */
    return (
        <section className="container container--border-top create-post m-1 border-2 border-solid border-black mx-8">
            <h2 className="text-center font-extrabold text-2xl">Añadir estudio a tu perfil</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name" className="p-2 font-semibold">Nombre del estudio:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" placeholder="Nombre oficial del título" type="text" id="title" />

                <label htmlFor="description" className="p-2 font-semibold">Descripción de la formación:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="text" id="description" placeholder="Pequeño resumen de esta formación" />

                <label htmlFor="image" className="p-2 font-semibold">Certificado del estudio:</label>
                <input className="p-3" type="file" id="certification" accept="image/jpeg, image/png, application/pdf" />

                <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-green-600" type="submit">Publicar</button>
                <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-red-700" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateCareer;