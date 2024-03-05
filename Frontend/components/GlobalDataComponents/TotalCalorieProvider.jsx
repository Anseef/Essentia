import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
const TrackedFoodsContext = createContext();
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';

export const TrackedFoodsProvider = ({ children }) => {
    const { userData, localIP } = useContext(AuthContent);

    const [trackedFoods, setTrackedFoods] = useState([]);
    const [totalCalorie, setTotalCalorie] = useState(0);
    const [userDetails, setUserDetails] = useState([]);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const calculateTotalValues = () => {
        let calorie = 0;
        if (trackedFoods) {
            trackedFoods.forEach((foodItemArray) => {
                if (foodItemArray.foodItem.date === formattedDate) {
                    calorie += foodItemArray.foodItem.Calories;
                }
            });
            setTotalCalorie(Math.round(calorie));
        }
    };

    useEffect(() => {
        if (userData) {
            setUserDetails(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (userDetails && userDetails._id) {
            const userId = userDetails._id;
            fetchTrackedFoods(userId);

        }
    }, [userDetails]);

    useEffect(() => {
        if(trackedFoods){
            calculateTotalValues();
        }
    },[trackedFoods])

    useFocusEffect(
        React.useCallback(() => {
            fetchTrackedFoods(userDetails._id);
            calculateTotalValues();
        }, [userDetails._id])
    );

    const fetchTrackedFoods = async (userId) => {
        try {
            const response = await axios.post(`http://${localIP}:8000/trackedFoods`, { userId });
            setTrackedFoods(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <TrackedFoodsContext.Provider value={{ totalCalorie }}>
            {children}
        </TrackedFoodsContext.Provider>
    );
};

export const useTrackedFoods = () => {
    return useContext(TrackedFoodsContext);
};
