const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
   name: {
    type: String,
    minlength: 3,
    required: true
   },
   number: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
            // Regex enforces: 2-3 digits - at least enough digits for total 8+ chars
            return /^\d{2}-\d{5,}|\d{3}-\d{4,}$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number! 
            It must be in the format XX-XXXX or XXX-XXXX (digits only, 8+ chars total)`
    }
   }
})

// Optional: Plugin to better performance to unique errors handling
personSchema.plugin(uniqueValidator)

// Transform JSON to eliminate _id and __v
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)