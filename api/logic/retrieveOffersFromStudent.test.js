import mongoose from 'mongoose'
import retrieveOffersFromStudent from './retrieveOffersFromStudent.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            //debugger
            retrieveOffersFromStudent("663fdd19a4f8c5a8fada1fdf")
                .then(offers => console.log('retrieved offers', offers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })