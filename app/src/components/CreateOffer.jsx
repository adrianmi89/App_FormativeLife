import { useState } from "react";
import logic from "../logic"
import Button from "./Button";


function onCreateOffer({ onCancelClick, onCreateOffer }){

    const handleCancelClick = () => onCancelClick();

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const title = form.name.value;
        const description = form.description.value;
        const minSalary = form.minSalary.value;
        const maxSalary = form.maxSalary.value;
        const fechaPublicacion = form.fechapublicacion.value;
        const fechaExpiracion = form.fechaexpiracion.value;

        try{
            logic.createOffer(title, description, minSalary, maxSalary, fechaPublicacion, fechaExpiracion)
                .then(() => onCreateOffer())
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                })
        }
        catch(error){

            console.error(error);
            alert(error.message);
        }
    }

    console.debug("CreateCareer render");

    return (
        <section className="container container--border-top create-post mx-8">
            <h2 className="text-center font-extrabold text-2xl">Añadir oferta laboral a tu perfil</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name" className="p-2 font-semibold">Título:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="text" id="name" />

                <label htmlFor="description" className="p-2 font-semibold">Descripción de la oferta:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="text" id="description" placeholder="Pequeño resumen de esta formación" />

                <label htmlFor="minSalary" className="p-2 font-semibold">Salario Bruto:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="text" id="minSalary" placeholder=""/>

                <label htmlFor="maxSalary">Salario Máximo:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="text" id="maxSalary" placeholder=""/>

                <label htmlFor="fechapublicacion" className="p-2 font-semibold">Fecha publicación de la oferta:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="date" id="fechapublicacion" placeholder=""/>

                <label htmlFor="fechaexpiracion" className="p-2 font-semibold">Fecha expiración:</label>
                <input className="mx-2 border-solid border-gray-600 border-2" type="date" id="fechaexpiracion" placeholder=""/>

                <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-green-600" type="submit">Publicar</button>
                <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-red-700" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default onCreateOffer;