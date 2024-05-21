const mongoose = require('mongoose');
const User = require('./models/userModel');

mongoose.connect('mongodb://localhost:27017/mongooseBasic')
    .then(() => console.log('DB connection established'))
    .catch((err) => console.error('Error connecting to Mongo'));

// const user = new User({
//     name: "Guna",
//     age: 28
// });

// user.save().then((res, req) => {
//     console.log('user saved successfully')
// })

async function run() {
    // const newUser = await user.save();
    try {
        const newUser = await User.create({
            name: "Guna",
            email: 'test@example.com',
            age: 38,
            hobbies: ['Sports', 'Music'],
            address: {
                street: '2nd street',
            }
        })

        // const findUser = await User.findById('65ce12ad719793f99b9b3612')
        // const findUser = await User.find({ name: 'Guna' });
        // const findUser = await User.findOne({ name: 'Guna' });
        // const findUser = await User.exists({ name: 'Guna' });
        // const findUser = await User.where('name').equals('Guna');
        // const findUser = await User.where('age').gt(20).limit(1);
        // const findUser = await User.where('_id').equals('65cbb2626fe63727b42acc8f').populate('bestFriend').limit(1);
        // const findUser = await User.findOne({ name: 'Guna' })
        // findUser.sayHi()
        // const findUser = await User.findByName('Guna')
        // const findUser = await User.find().byName('Guna')
        // const findUser = await User.findById('65ce20c66e199033db085b57')
        // console.log('findUser', findUser.namedEmail);
        const findUser = await User.findById('65ce20c66e199033db085b57')
        findUser.name = 'Gunapathi';
        findUser.age = 12;
        await findUser.save();

        console.log('findUser', findUser);
        /* 
        updateOne or updateMany functions will not check valiation as it's based on mongo client,
        so we need to use .save() method from mongoose to save the data with validation
         */
    } catch (err) {
        console.log(err.message)
    }
}

run();
