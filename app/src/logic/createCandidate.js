import { errors, validate } from "com"

const { SystemError } = errors;

function createCandidate(studentUserId, offerId){

    validate.token(sessionStorage.token);
    validate.id(studentUserId);
    validate.id(offerId);

    return fetch(`${import.meta.env.VITE_API_URL}/offers/${offerId}/candidates`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentUserId, offerId })
    })
    .catch(error => { throw new Error(error.message) })
    .then(res => {

        if(res.status === 201)
            return

        else{
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {

                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                })
        }
    })
}

export default createCandidate;