//Este archivo hace falta y se llama a la función desde el Offer.jsx en la propiedad onClick del botón
/* import { useState, useEffect } from "react";
import logic from "../logic";

function candidateAdd(studentUserId, offerId){

    const [userExist, setUserExist] = useState(false) // Estado para controlar si es un candidato
    const [candidatesCount, setCandidatesCount] = useState(0) // Contador de candidatos en una oferta


    useEffect(() => {
        if (offer && offer.candidades) { // Asegurarse de que la oferta y el estudiante existe antes de acceder a ellos
            candidatesCount(offerId.candidatesCount.length); // Actualiza el contador de likes con los datos que vengan del servidor

            // Verificar si el usuario ya se ha inscrito en esa oferta
            if (studentUserId && offerId.candidatesCount.includes(studentUserId)) {
                setUserExist(true);
            }
        }
    }, [studentUserId, offerId]);

    const handleAddCandidate = () => {
        
        try{
            logic.createCandidate(studentUserId, offerId)
                .then(() => {
                    setUserExist(!userExist)
                    setCandidatesCount(userExist ? candidatesCount + 0 : candidatesCount +1)
                })
                .catch(error => {
                    console.error("Error al añadir al estudiante ",error)
                })
        }
        catch(error){
            console.error("Error al intentar inscribirse en la oferta.")
        }
    }
}

export default candidateAdd; */

