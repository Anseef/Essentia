const express = require('express');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');

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
        const currentDayIndex = req.body.currentDayIndex
        console.log(currentDayIndex)
        
        const fetchHabit = await storedHabitsCollection.find({ userId : userId, repeatDays: currentDayIndex }).toArray();
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

app.post("/remove-completed", async (req, res) => {
    try {

        const completedTask = req.body.completedTask;
        const filter = {
            date: completedTask.date,
            habitId: completedTask.habitId
        };
               
        
        const removeHabit = await completedTasksCollection.deleteOne(filter);

        if (removeHabit.deletedCount > 0) {
            res.json({ status: 'ok', data: 'Removed Data' });
        } else {
            res.json({ status: 'not found', data: 'No matching document found to remove' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/delete-habit", async (req, res) => {
    try {

        const habitData = req.body.habitData;

        const filter = {
            _id: habitData?.habitId ? new ObjectId(habitData.habitId) : new ObjectId(habitData._id),
            userId: habitData.userId,
        };
               
        
        const deleteHabit = await storedHabitsCollection.deleteOne(filter);

        if (deleteHabit.deletedCount > 0) {
            res.json({ status: 'ok', data: 'Removed Habit' });
        } else {
            res.json({ status: 'not found', data: 'No matching document found to remove' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

console.log("Habit")
app.listen(8080, ()=> {
    console.log("Connected to port 8080");
})