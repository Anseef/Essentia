import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const TrackedFoodsContext = createContext();

export const TrackedFoodsProvider = ({ children }) => {
    const [trackedFoods, setTrackedFoods] = useState([]);
    const [totalCalorie, setTotalCalorie] = useState(0);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    //console.log(trackedFoods)
    const calculateTotalValues = () => {
        let calorie = 0;
        if(trackedFoods) {
            trackedFoods.forEach((foodItemArray) => {
                if(foodItemArray.foodItem.date === formattedDate){
                    calorie += foodItemArray.foodItem.Calories;
                }
            });
            setTotalCalorie(Math.round(calorie));
        }

    };
    const fetchTrackedFoods = async () => {
        try {
        const response = await axios.post("http://192.168.205.188:8000/trackedFoods");
        setTrackedFoods(response.data);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(()=>{
        fetchTrackedFoods();
        calculateTotalValues();
    },[trackedFoods])

    return (
        <TrackedFoodsContext.Provider value={{ totalCalorie }}>
        {children}
        </TrackedFoodsContext.Provider>
    );
};

export const useTrackedFoods = () => {
    return useContext(TrackedFoodsContext);
};