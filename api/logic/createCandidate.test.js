import mongoose from 'mongoose'
import createCandidate from './createCandidate.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            createCandidate('663fdcd4a4f8c5a8fada1fdc', '6653505b2ee6e9aa167ca0a0')
                .then(userId => console.log('user logged in', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })