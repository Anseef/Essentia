const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const { storedHabitsCollection, completedTasksCollection } = require('./mongoDB');

app.post("/create-habit", async (req, res) => {
    try {
        const newHabitData = req.body;

        await storedHabitsCollection.insertOne(newHabitData)
        .then(res.send({ status: 'ok', data: 'Data Inserted Sucessfully' }))
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/fetch-habit", async (req, res) => {
    try {
        const userId = req.body.userId;
        const fetchHabit = await storedHabitsCollection.find({ userId : userId }).toArray();
        res.json({ status: 'ok', data: fetchHabit });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }      
});

app.post("/insert-completed", async (req, res) => {
    try {
        const completedTask = req.body.completedTask;
        const insertHabit = await completedTasksCollection.insertOne(completedTask);
        if (insertHabit) {
            const fetchCompleted = await completedTasksCollection.find({
                    userId: completedTask.userId,
                    date: completedTask.date
                })
                .toArray();
            res.json({ status: 'ok', data: fetchCompleted });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/fetch-completed", async (req, res) => {
    const userData = req.body.userData;
    try {
        const fetchCompleted = await completedTasksCollection.find({
            userId: userData.userId,
            date: userData.date
        })
        .toArray();
        res.json({ status: 'ok', data: fetchCompleted });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }      
});



console.log("Habit")
app.listen(8080, ()=> {
    console.log("Connected to port 8080");
})