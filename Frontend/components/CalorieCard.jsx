import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const CalorieCard = ({ trackedFoodArray, sendTotalCalorie }) => {
    const [totalFat, setTotalFat] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCalorie, setTotalCalorie] = useState(0);

    const calculateTotalValues = () => {
        let fat = 0;
        let carbohydrates = 0;
        let protein = 0;
        let calorie = 0;
        if(trackedFoodArray) {
            trackedFoodArray.forEach((foodItemArray) => {
                fat += foodItemArray.foodItem.Fat;
                carbohydrates += foodItemArray.foodItem.Carbohydrates;
                protein += foodItemArray.foodItem.Protein;
                calorie += foodItemArray.foodItem.Calories;
            });
    
           
            setTotalFat(Math.round(fat));
            setTotalCarbohydrates(Math.round(carbohydrates));
            setTotalProtein(Math.round(protein));
            setTotalCalorie(Math.round(calorie));

            sendTotalCalorie(Math.round(calorie));
        }

    };

    useEffect(() => {
        calculateTotalValues();
    }, [trackedFoodArray]);

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Carbs</Text>
                <Text style={styles.cardContent}>{totalCarbohydrates}g</Text>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Protein</Text>
                <Text style={styles.cardContent}>{totalProtein}g</Text>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Fat</Text>
                <Text style={styles.cardContent}>{totalFat}g</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: 100,
        height: 82,
        padding: 10,
        backgroundColor: '#dcd6f3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontFamily: 'SemiBold',
    },
    cardContent: {
        fontFamily: 'Medium',
        color: '#57636c',
    },
});

export default CalorieCard;
