import { errors, validate } from "com"

const { SystemError } = errors;

function createCareer(title, description, certification) {
    
    try{
        validate.token(sessionStorage.token);
        validate.text(title);
        validate.text(description, "description");
    }
    catch (error) {
        return Promise.reject(new SystemError(error.message));
    }

    //TODO Mirar lo que hace este código
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("certification", certification);

    return fetch(`${import.meta.env.VITE_API_URL}/career`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: formData
    })
    .then(res => {
        
        if(res.status === 201) return;

        return res.json()
            .then(body => {
                
                const { error, message } = body;
                const ErrorConstructor = typeof error === "string" && errors[error] ? errors[error] : SystemError;
                throw new ErrorConstructor(message);
            })
            .catch(error => {
                throw new SystemError(error.message);
            })
    })
    .catch(error => {
        throw new SystemError(error.message);
    })
}

export default createCareer;