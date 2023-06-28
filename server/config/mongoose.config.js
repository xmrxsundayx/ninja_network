// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/ninjaNetworkDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Established a connection to the database'))
//     .catch((err) => console.log('Something went wrong when connecting to the database ', err));

// module.exports = mongoose;

const mongoose = require('mongoose');
const connection = process.env.connection;
mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Established a connection to the database');
    } catch (error) {
        console.error('Something went wrong when connecting to the database:', error);
    }
};

connectToMongoDB();

module.exports = mongoose;