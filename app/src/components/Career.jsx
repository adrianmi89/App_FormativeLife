import { useState } from "react"
import logic from "../logic"
import ButtonEditProfile from "./ButtonEditProfile"
import Button from "./Button"
import { errors } from "com"

const { MatchError, ContentError } = errors;

function Career({ career, onCareerDeleted, onCareerUpdate }){

    //Hook para controlar el estado del estudio
    const [changeCareer, setChangeCareer] = useState(false)
    const handleDeleteCareer = () => {

        const deleteConfirmed = confirm("Delete ??????")
        
        if(!deleteConfirmed) return;
        
        try{
            logic.deleteCareer( career.id)
                .then(() => {onCareerDeleted()})
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

    const handleUpdateSubmit = event => {
        event.preventDefault();

        try{
            const form = event.target;
            const title = form.title.value;
            const description = form.description.value;
            const certification = form.certification.files[0] || career.certification;

            if (confirm('Confirm changes?')) {
                logic.updateCareer(career.id, title, description, certification)
                    .then(() => {
                        setChangeCareer(false);
                        onCareerUpdate();
                    })
                    .catch(error => {
                        console.error(error)
                        let feedback = error.message
                        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                            feedback = `${feedback}, please correct it`
                        else if (error instanceof MatchError)
                            feedback = `${feedback}, please verify credentials`
                        else
                            feedback = 'Sorry, there was an error, please try again later'
                        alert(feedback)
                    });
            }
        } catch (error) {
            console.error(error)
            let feedback = error.message
            if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
                feedback = `${feedback}, please correct it`
            else
                feedback = 'Sorry, there was an error, please try again later'
            alert(feedback)
        }
    };

    const handleCancelEdit = () => {

        setChangeCareer(false);
    }

    console.debug("Career render");

    console.log(career)


    return (
        <article className="border-2 border-solid border-black m-10">
            <h2 className="p-2 text-3xl font-bold">{ career.title }</h2>
            <img className="p-2 md:sm w-80 h-60" src={career.certification} />
            <p className="p-3">{ career.description}</p>
            
            { career.student.id === logic.getLoggedInUserId() && 
                <div>
                    <ButtonEditProfile onClick={ handleDeleteCareer } className="bg-red-700">Borrar estudio</ButtonEditProfile>
                </div>
            }
        
            {!changeCareer && career.student.id === logic.getLoggedInUserId() && 

                <ButtonEditProfile onClick={()=> setChangeCareer(true)} className="bg-green-600">Editar estudio</ButtonEditProfile>
           
            }
            {changeCareer && 
            <>
                <form onSubmit={ handleUpdateSubmit }>
                    <label htmlFor="title" className="p-2 font-semibold">Título:</label>
                    <input type="text" className="mx-2 border-solid border-gray-600 border-2" defaultValue={career.title} name="title" /><br/>

                    <label htmlFor="description" className="p-2 font-semibold">Descripción:</label>
                    <textarea type="text" className="mx-2 border-solid border-gray-600 border-2" defaultValue={career.description} name="description" /><br/>

                    <label htmlFor="certification" className="p-2 font-semibold">Certificación:</label>
                    <input type= "file" name="certification" className="mx-2 border-solid border-gray-600 border-2" accept="image/jpeg, image/png, application/pdf" /><br/>

                    <br/>
                    <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-green-600" type="submit">Guardar</button>
                    <button className="p-2 font-semibold text-white hover:text-black border-solid border-white border-2 bg-red-700" onClick={handleCancelEdit}>Cancelar</button>
                </form>
            </>
            }
            
        </article>
    )
}

export default Career;