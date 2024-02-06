import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const NutritionBlock = ({ NutritionValue,Measure }) => {
    return (
        <View style={ styles.container}>
              <Text style = { styles.ContentStyle}>{NutritionValue}</Text>
              <Text style = { styles.ContentStyle}>{Measure}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight:20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ContentStyle : {
        fontFamily: 'SemiBold',
        fontSize:14
    }
});
export default NutritionBlock