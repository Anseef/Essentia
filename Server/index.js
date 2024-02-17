const express = require('express');
const cors = require('cors');
const { storedFoodCollection , foodDetailsCollection } = require('./mongoDB')

const app = express();
app.use(cors());
app.use(express.json()); 

// Fetch food data from DB

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


// Selected food to DB

app.post('/tracked', async (request, response) => {
    const selectedFood = request.body;
    try {
        const insertQuery = await storedFoodCollection.insertOne(selectedFood);
        if (insertQuery) {
            response.json("Insertion Successful");
        }
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// fetch Tracked food from DB 

app.post('/trackedFoods',async (request, response) => {
    //const foodTimeArray = request.body;
    try {
        const fetchSelected = await storedFoodCollection.find().toArray()
        if (fetchSelected) {
            response.json(fetchSelected);
        }
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(8000, () => {
  console.log('Server listening on port 8000');
});