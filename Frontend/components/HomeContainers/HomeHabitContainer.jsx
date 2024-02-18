import { CheckBox,View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const HomeHabitContainer = () => {

  const navigation = useNavigation();

  return (
    <Pressable style = { styles.container}  onPress={() => console.log("Habit Clicked")}>
      <View style = { styles.headingBlock }>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}>Habits</Text>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}> . </Text> 
      </View>
      <View style = {{ alignSelf: 'center' }}>

        <View style = { styles.habitBlock}>
          <BouncyCheckbox
            style = {{ width: '100%' }} 
            size={18}
            fillColor="#836cdd"
            unfillColor="#fff"
            text="Make the bed"
            iconStyle={{ borderColor: '#836cdd',borderRadius: 5 }}
            innerIconStyle={{ borderWidth: 2,borderRadius: 5 }}
            textStyle={{ fontFamily: 'Medium',color: 'black',paddingLeft: 20, paddingTop: 5 }}
          />
        </View>

        <View style = { styles.habitBlock}>
          <BouncyCheckbox
            style = {{ width: '100%' }}   
            size={18}
            fillColor="#836cdd"
            unfillColor="#fff"
            text="Read 10 Pages"
            iconStyle={{ borderColor: '#836cdd',borderRadius: 5 }}
            innerIconStyle={{ borderWidth: 2,borderRadius: 5 }}
            textStyle={{ fontFamily: 'Medium',color: 'black',paddingLeft: 20,paddingTop: 5 }}
          />
        </View>

      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cdc6f3',
    padding: 10,
    height: '100%',
    width: 216,
    borderRadius: 12
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  habitBlock: {
    width: '100%',
    alignItems:'center'
  }

})
export default HomeHabitContainer