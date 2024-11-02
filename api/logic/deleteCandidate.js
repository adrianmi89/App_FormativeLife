import { User, Offer} from "../data/index.js"
import { errors , validate} from "com"

const { SystemError, MatchError } = errors;

function deleteCandidate(studentUserId, offerId) {

validate.id(studentUserId, "userId");
validate.id(offerId, "offerCompanyId");

return User.findById(studentUserId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
        if (!user)
            throw new MatchError('user not found');

        if(user.role !== "student")
            throw new MatchError('user is not a student');

        return Offer.findById(offerId)
            .catch(error => { throw new SystemError(error.message) })        
    })
    .then(offer => {
        if (!offer)
            throw new MatchError("Offer not found");

        const index = offer.candidates.findIndex(candidatesUserId => candidatesUserId.toString() === studentUserId);

        if(index >= 0)
            //Lo único que cambiaría es la función push() por splice(), la lógica es igual a createCandidate
            offer.candidates.splice(index, 1);
        else
            throw new MatchError("User not found to the array Candidates");

        return offer.save()
            .catch(error => { throw new SystemError(error.message) })
    })
}

export default deleteCandidate;