import mongoose from 'mongoose'
import deleteCandidate from './deleteCandidate.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            deleteCandidate('663fdcd4a4f8c5a8fada1fdc', '665352dc2ee6e9aa167ca0ac')
                .then(userId => console.log('user logged in', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })