
import { Offer, User } from "../data/index.js"
import { validate, errors } from "com"

const { SystemError, MatchError } = errors;

function retrieveOffersFromStudent(targetUserId) {
    validate.id(targetUserId, "targetUserId")

    const targetIdStr = targetUserId.toString()

    return User.findById(targetUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(targetUser => {
            if (!targetUser)
                throw new MatchError("target user not found")

            return Offer.find({ candidates: targetUserId })
                .select("-__v")
                .populate("candidates", "-__v -password -role")
                .lean()
                .then(offers => {
                    offers.forEach(offer => {
                        offer.id = offer._id?.toString() || null
                        delete offer._id

                        let matchedCandidate = null

                        if (Array.isArray(offer.candidates)) {
                            matchedCandidate = offer.candidates.find(candidate =>
                                candidate && candidate._id && candidate._id.toString() === targetIdStr
                            )
                        }

                        if (matchedCandidate && matchedCandidate._id) {
                            const candidateId = matchedCandidate._id.toString()
                            delete matchedCandidate._id
                            matchedCandidate.id = candidateId

                            offer.candidates = matchedCandidate
                        } else {
                            offer.candidates = null
                        }

                        delete offer.candidates
                    })

                    // Devuelve solo las ofertas donde el candidato fue encontrado
                    return offers.filter(offer => offer.candidates != null)
                })
        })
}

export default retrieveOffersFromStudent;



 /* Esto no funciona por qué el campo cantidates es un array
                        if (offer.candidates._id) {
                            const id = offer.candidates._id.toString();
                            delete offer.candidates._id;

                            offer.candidates.id = id;
                        }
                        offer.id = offer._id.toString()

                        delete offer._id; */