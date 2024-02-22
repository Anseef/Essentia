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

// Add Selected food to DB
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

//Update tracked foods in the DB

app.put('/update/:id', async (request, response) => {

  const foodItemId = request.params.id;
  const updatedFoodItemData = request.body;

  try {

    const existingFoodItem = await storedFoodCollection.findOne({ 'foodItem._id' : foodItemId });
    console.log(existingFoodItem)
    if (existingFoodItem) {
      const updatedFoodItem = await storedFoodCollection.findOneAndUpdate (
        { 'foodItem._id': foodItemId },
        { $set: updatedFoodItemData },
        { new: true }
      );
  
      console.log('Updated food item:', updatedFoodItem); // Log for verification
      response.json("Updation Successfull");
    } else {
      response.status(404).json({ success: false, message: `Food item with ID ${foodItemId} not found` });
    }
  } catch (error) {
    console.error(`Error updating food item: ${error}`);
    response.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
