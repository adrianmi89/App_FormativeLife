import { validate, errors } from 'com'

const { SystemError } = errors

function uploadImage(imagen) {

    // TODO validate.imagen
    validate.token(sessionStorage.token);
    return fetch(`${import.meta.env.VITE_API_URL}/images/single`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagen})
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default uploadImage;