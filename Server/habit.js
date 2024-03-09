const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const { storedHabitsCollection } = require('./mongoDB');

app.post("/create-habit", async (req, res) => {
    try {
      const newHabitData = req.body;

      console.log("Received new habit data:", newHabitData);

      await storedHabitsCollection.insertOne(newHabitData)
      .then(res.send({ status: 'ok', data: 'Data Inserted Sucessfully' }))

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
});

console.log("Habit")
app.listen(8080, ()=> {
    console.log("Connected to port 8080");
})