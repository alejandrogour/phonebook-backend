const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // Regex enforces: 2-3 digits - at least enough digits for total 8+ chars
        return /^\d{2}-\d{5,}|\d{3}-\d{4,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number! 
            It must be in the format XX-XXXX or XXX-XXXX (digits only, 8+ chars total)`,
    },
  },
});

// Optional: Plugin to better performance to unique errors handling
personSchema.plugin(uniqueValidator);

// Transform JSON to eliminate _id and __v
personSchema.set('toJSON', {
  transform: (document, ret) => {
    const transformed = { ...ret, id: ret._id.toString() };
    delete transformed._id;
    delete transformed.__v;
    return transformed;
  },
});

module.exports = mongoose.model('Person', personSchema);
