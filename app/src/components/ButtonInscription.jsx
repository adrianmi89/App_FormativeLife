
import { IconButton } from "@material-tailwind/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ButtonCandidateAdd({userExist, onClick = { onClick }}) {
         
    return userExist ?
       
        <IconButton onClick={onClick} className={"m-2 p-2 text-white bg-blue-600 font-extrabold border-solid border-4 border-black "} >
            Ya inscrito
        </IconButton>
        :
        <IconButton variant="outlined" onClick={onClick} className={"m-2 p-2 text-white bg-blue-600 font-extrabold border-solid border-4 border-black "} >
            Inscribirse
        </IconButton>
}

export default ButtonCandidateAdd;