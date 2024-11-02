import { User, Offer} from "../data/index.js"
import { errors , validate} from "com"

const { SystemError, MatchError } = errors;

function createCandidate(studentUserId, offerId) {

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

        if(index < 0)
            offer.candidates.push(studentUserId);
        else
            throw new MatchError("User was already inscribed to this offer");

        return offer.save()
            .catch(error => { throw new SystemError(error.message) })
    })
}

export default createCandidate;