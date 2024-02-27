const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/'; //local URL

const dbName = 'essentia'; //Database info
const foodCollection = 'foodDetails'
const sFoodsCollection = 'storedFoods'
const usersCollection = 'users'

const client = new MongoClient(uri);//DB connection
client.connect()
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const database = client.db(dbName);
const foodDetailsCollection = database.collection(foodCollection);
const storedFoodCollection = database.collection(sFoodsCollection);
const userDetailsCollection = database.collection(usersCollection);

module.exports = { foodDetailsCollection, storedFoodCollection, userDetailsCollection }