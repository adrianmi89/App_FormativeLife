import { useState } from "react"
import logic from "../logic"
import ButtonEditProfile from "./ButtonEditProfile"
import Button from "./Button"

function Career({ career, onCareerDeleted, onCareerUpdate }){

    const handleDeleteCareer = () => {

        const deleteConfirmed = confirm("Delete ??????")
        
        if(!deleteConfirmed) return;
        
        //logic.getLoggedInUserId(), Le quitamos este parámetro porque la sesión la cogemos desde la API
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

    const [changeCareer, setChangeCareer] = useState(false);

    const handleUpdateSubmit = event => {
        event.preventDefault();

        const form = event.target

        const title = form.title.value;
        const description = form.description.value;
        const certification = form.certification.value;

        const updateConfirmed = confirm("Confirm changes ??????");
        
        if(!updateConfirmed) return;
        
        try{
            logic.updateCareer(career.id, title, description, certification)
                .then(() => {
                    onCareerUpdate();
                    setChangeCareer(false)

                    console.debug("Se tiene que cerrar");
                })
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
                    <label htmlFor="title">Título:</label>
                    <input type="text" defaultValue={career.title} name="title" /><br/>

                    <label htmlFor="description">Descripción:</label>
                    <input type="text" defaultValue={career.description} name="description" /><br/>

                    <label htmlFor="certification">Certificación:</label>
                    <input type= "file" defaultValue={career.certification} name="certification" /><br/>

                    <br/><Button type="submit">Publicar</Button>
                    <Button onClick={handleCancelEdit}>Cancelar</Button>
                </form>
            </>
            }
            
        </article>
    )
}

export default Career;