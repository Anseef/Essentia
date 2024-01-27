import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class CalorieCard extends Component {
  render() {
    return (
        <View style = { styles.container}>
            <View style = {styles.cardContainer}>
                <Text style = { styles.cardTitle }>Carbs</Text>
                <Text style = { styles.cardContent }>271g</Text>
            </View>

            <View style = {styles.cardContainer}>
                <Text style = { styles.cardTitle }>Protein</Text>
                <Text style = { styles.cardContent }>202g</Text>
            </View>

            <View style = {styles.cardContainer}>
                <Text style = { styles.cardTitle }>Fat</Text>
                <Text style = { styles.cardContent }>169g</Text>
            </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-around'
    },
    cardContainer: {
        width:100,
        height:82,
        padding: 10,
        backgroundColor: '#dcd6f3',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    cardTitle: {
        fontFamily:'SemiBold',
    },
    cardContent: {
        fontFamily:'Regular',
        color: '#57636c'
    }
})


export default CalorieCard