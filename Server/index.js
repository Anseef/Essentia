const express = require('express');
const cors = require('cors');
const { storedFoodCollection, foodDetailsCollection } = require('./mongoDB');

const app = express();
app.use(cors());
app.use(express.json());

// Fetch food data from DB
app.post('/data', async (request, response) => {
  const foodData = request.body;
  if (foodData.food !== '') {
    try {
      const foodArray = await foodDetailsCollection.find({ Name: RegExp(foodData.food, 'i') }).toArray();
      response.json(foodArray);
    } catch (e) {
      console.log(e);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Selected food to DB
app.post('/tracked', async (request, response) => {
  const selectedFood = request.body;
  try {
    const insertQuery = await storedFoodCollection.insertOne(selectedFood);
    if (insertQuery) {
      response.json('Insertion Successful');
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch tracked food from DB
app.post('/trackedFoods', async (request, response) => {
  try {
    const fetchSelected = await storedFoodCollection.find().toArray();
    if (fetchSelected) {
      response.json(fetchSelected);
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete tracked food from DB
app.delete('/tracked/:id', async (request, response) => {
  const foodItemId = request.params.id;
  console.log(foodItemId)
  try {
    const deleteQuery = await storedFoodCollection.deleteOne({ 'foodItem._id': foodItemId });
    if (deleteQuery.deletedCount > 0) {
      response.json('Deletion Successful');
    } else {
      response.status(404).json({ error: 'Food item not found' });
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
