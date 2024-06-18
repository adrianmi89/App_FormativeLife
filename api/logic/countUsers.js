import mongoose from "mongoose"
import { User } from '../data/index.js'

function countUser(){
    //TODO completar
    /* const MyCollection = dbConnection.model('MyCollection', collectionSchema);
    MyCollection.count({}, function(err, count) {
    console.log( "Total: ", count);

    db.table_name.count( { column_name: valor } ) */
    count = 0;

    return User.find()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
        if (!user)
            throw new MatchError('user not found')

        count ++;
        const numUsers = {
            num: count
        }

        return numUsers
            .catch(error => { throw new SystemError(error.message) })
    })
    .then(numUsers => { })
}

export default countUser;