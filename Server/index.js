const express = require('express');
const cors = require('cors');
const { storedFoodCollection , foodDetailsCollection } = require('./mongoDB')

const app = express();
app.use(cors());
app.use(express.json()); 


app.post('/data', async (request, response) => {
    const foodData = request.body
    if(foodData.food !== ''){
        try {
            const foodArray = await foodDetailsCollection.find( { Name: RegExp(foodData.food, 'i') }).toArray()
            response.json(foodArray);
        } catch (e) {
            console.log(e);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.post('/selected', async (request, response) => {
    const selectedFood = request.body;
    try {
        const insertQuery = await storedFoodCollection.insertOne(selectedFood);
        const allData = await storedFoodCollection.find({
            $and: [
                { "selectedFoods.Date": '2024-02-05' },
                { "selectedFoods.MealTime": 'Dinner' }
            ]
        }).toArray();
        

        allData.map(async (foodItem) => {
            console.log(foodItem);
        });

        if (insertQuery) {
            response.json("Insertion Successful");
        }
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(8000, () => {
  console.log('Server listening on port 8000');
});