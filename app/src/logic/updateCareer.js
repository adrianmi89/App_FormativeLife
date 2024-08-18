import { validate, errors } from 'com'

const { SystemError } = errors

function updateCareer(careerId, title, description, certification) {

    try{
        validate.token(sessionStorage.token);
        validate.id(careerId, "careerId");  // Validar el ID
        validate.text(title);
        validate.text(description, "description");
    }
    catch (error) {
        return Promise.reject(new SystemError(error.message));
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("certification", certification);

    return fetch(`${import.meta.env.VITE_API_URL}/careers/${careerId}`, {
        method: 'PATCH',  // Cambiar de POST a PUT
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: formData
    })
    .then(res => {
        
        if(res.ok) return;  // Manejar cualquier respuesta exitosa

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
    /* validate.token(sessionStorage.token)
    //validate.id(careerId, 'careerId')
    validate.text(title)
    validate.text(description)

    return fetch(`${import.meta.env.VITE_API_URL}/careers/${careerId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, certification })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        }) */
}

export default updateCareer