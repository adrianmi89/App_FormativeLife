import { useState, useEffect } from "react";
import logic from "../logic"
import Button from "./Button";
import { errors } from "com"
import ButtonEditProfile from "./ButtonEditProfile";
import ButtonCandidateAdd from "./ButtonInscription";
//import candidateAdd from "./CreateCandidate";

//const { handleAddCandidate } = candidateAdd;

const { RangeError } = errors

function Offer({ offer, onOfferDeleted, onOfferUpdate}){

    const [userExist, setUserExist] = useState(false) // Estado para controlar si es un candidato
    const [candidatesCount, setCandidatesCount] = useState(0) // Contador de candidatos en una oferta

   const userId  = logic.getLoggedInUserId()
    useEffect(() => {
        if (userId && offer.candidates) { // Asegurarse de que la oferta y el estudiante existe antes de acceder a ellos
            setCandidatesCount(offer.candidates.length); // Actualiza el contador de likes con los datos que vengan del servidor

            // Verificar si el usuario ya se ha inscrito en esa oferta
            if (userId && offer.candidates.includes(userId)) {
                setUserExist(true);
            }
        }
    }, [userId, offer]);

    const handleAddCandidate = () => {
        
        try{
            logic.createCandidate(logic.getLoggedInUserId(),offer.id)
                .then(() => {
                    setUserExist(!userExist)
                    setCandidatesCount(userExist ? candidatesCount + 0 : candidatesCount +1)
                })
                .catch(error => {
                    console.error("Error al añadir al estudiante ",error)
                })
        }
        catch(error){
            console.error("Error al intentar inscribirse en la oferta.",error)
        }
    }

    const handleDeleteOffer = () => {
        
        const deleteConfirmed = confirm("Delete ??????")
        
        if(!deleteConfirmed) return;

        try{
            logic.deleteOffer(offer)
            .then(() => {onOfferDeleted()})
            .catch(error =>  {

                console.error(error);
                
                alert(error.message);
            })
        }
        catch(error){
            
            console.error(error);
            alert(error.message);
        }
    }

    const [changeOffer, setChangeOffer] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateSubmit = event => {
        event.preventDefault();

        const form = event.target

        const title = form.title.value;
        const description = form.description.value;
        const minSalary = parseFloat(form.minSalary.value);
        const maxSalary = parseFloat(form.maxSalary.value);
        const publishDate = form.publishDate.value;
        const expirationDate = form.expirationDate.value;

        const updateConfirmed = confirm("Confirm changes ??????");
        
        if(!updateConfirmed) return;
        
        try{
            logic.updateOffer(offer.id, title, description, minSalary, maxSalary, publishDate, expirationDate)
                .then(() => {
                    onOfferUpdate();
                    setChangeOffer(false);

                    console.debug("Se tiene que cerrar");
                })
                .catch(error => {

                errorHandler(error)
                console.error(error);
                alert(error.message);
            })
        }
        catch(error){
            
            errorHandler(error)
            console.error(error);
            alert(error.message);
        }
    }

    const handleCancelEdit = () => {

        setChangeOffer(false);
    }

    //const publishDateFormat = publishDate.getFullYear() + "-" + publishDate.getMonth() + "-" + publishDate.getDay();
    function formatDate(isDate){

        const fecha = new Date(isDate)

        return fecha.toLocaleDateString()
    }

    const errorHandler = (error) => {
        console.error(error.message)

        let feedback = error.message;

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`;

        else if (error instanceof DuplicityError)
            feedback = `${feedback}, please verify credentials`;

        else
            feedback = "Sorry, there was an error, please try again later";

        const isSalaryMinError = error.message.includes("salario")

        setError({ message: feedback, isSalaryMinError });
    }
    console.debug("Offer render");

    return (
        <article className="border-2 border-solid border-black m-10">
            <h2 className="p-2"><span className="font-extrabold">Puesto:</span> { offer.title }</h2>
            <h2 className="p-2"><span className="font-extrabold">Descripción:</span> { offer.description}</h2>
            <h2 className="p-2"><span className="font-extrabold">Salario:</span> { offer.minSalary}</h2>
            <h2 className="p-2"><span className="font-extrabold">Salario Máximo:</span> { offer.maxSalary}</h2>
            <h2 className="p-2"><span className="font-extrabold">Fecha de publicación:</span> { formatDate(offer.publishDate) }</h2>
            <h2 className="p-2"><span className="font-extrabold">Fecha de expiración (aprox):</span> { formatDate(offer.expirationDate) }</h2>
            
            { offer.company.id !== logic.getLoggedInUserId() && 
                <ButtonCandidateAdd userExist={userExist} onClick={ handleAddCandidate }/>
            }
            { offer.company.id === logic.getLoggedInUserId() && 
                <div>
                    <ButtonEditProfile onClick={ handleDeleteOffer} className="bg-red-600">Borrar</ButtonEditProfile>
                </div>
            }
             
            {!changeOffer && offer.company.id === logic.getLoggedInUserId() && <>
           
           <ButtonEditProfile onClick={()=> setChangeOffer(true)} className="bg-green-600">Editar Oferta</ButtonEditProfile>
           <Button>Ver las X solicitudes (Trabajando en ello)</Button>
           </>
           }
           
           {changeOffer && 
           <>
               <form onSubmit={ handleUpdateSubmit }>
                   <label htmlFor="title" className="p-2 font-semibold">Título</label>
                   <input className="mx-2 border-solid border-gray-600 border-2" type="text" defaultValue={offer.title} name="title" /><br/>

                   <label htmlFor="description" className="p-2 font-semibold">Descripción</label>
                   <textarea className="mx-2 border-solid border-gray-600 border-2" type="text" defaultValue={offer.description} name="description" /><br/>

                   <label htmlFor="minSalary" className="p-2 font-semibold">Salario:</label>
                   <input className="mx-2 border-solid border-gray-600 border-2" defaultValue={offer.minSalary} name="minSalary" /><br/>
                   {error?.isSalaryMinError && <span className="text-red-500">{error.message}</span>}<br/>

                   <label htmlFor="maxSalary" className="p-2 font-semibold">Salario Máximo en esta categoría:</label>
                   <input className="mx-2 border-solid border-gray-600 border-2" defaultValue={offer.maxSalary} name="maxSalary" /><br/>

                   <label htmlFor="publishDate" className="p-2 font-semibold">Fecha publicación de la oferta:</label>
                   <input className="mx-2 border-solid border-gray-600 border-2" type="date" defaultValue={offer.publishDate} name="publishDate" required/><br/>

                   <label htmlFor="expirationDate" className="p-2 font-semibold">Fecha de expiración:</label>
                   <input className="mx-2 border-solid border-gray-600 border-2" type="date" defaultValue={offer.expirationDate} name="expirationDate" /><br/>

                   <br/>
                   <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-green-600" type="submit">Guardar</button>
                   <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-red-700" onClick={handleCancelEdit}>Cancelar</button>
               </form>
           </>
           }
           
       </article>
   )
}

export default Offer;