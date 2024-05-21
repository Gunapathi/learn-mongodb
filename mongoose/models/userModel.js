const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: String,
    state: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 50,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not valid`
        }
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    address: addressSchema
})

// custom instance
userSchema.methods.sayHi = function () {
    console.log(`Hii ${this.name}. Welcome...`)
}

// Custom method
userSchema.statics.findByName = function (name) {
    return this.find({ name: name });
}

// Custom Query for .find() - it wont work without that method
userSchema.query.byName = function (name) {
    return this.where({ name: name })
}

// Schema Virtuals
userSchema.virtual('namedEmail').get(function () {
    return `${this.name} <${this.email}>`
})

// Schema Middlewares
userSchema.pre('save', function (next) {
    this.name = `Mr. ${this.name}`;
    next();
})

userSchema.post('save', function (doc, next) {
    doc.name = `${doc.name} modified`;
    next();
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;