import { Pressable, Text, View,StyleSheet } from 'react-native'
import React from 'react'
import CalenderBlock from '../../components/CalenderBlock/Calender'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHabitContainer from '../../components/HomeContainers/HomeHabitContainer';
import HomeExpenseContainer from '../../components/HomeContainers/HomeExpenseContainer';  
import HomeHealthContainer from '../../components/HomeContainers/HomeHealthContainer';
import HomeFoodContainer from '../../components/HomeContainers/HomeFoodContainer';   

const Homepage = () =>  {

    return (
      <SafeAreaView style = {{ flex: 1, paddingLeft: 20, paddingRight:20}}>

        <View style = { styles.container }>
          <Text style = {{ fontFamily: 'ExtraBold', fontSize: 42, lineHeight: 45, color: '#fff',paddingTop: 15}}>Welcome to Essent!a..</Text>
          <Text style = {{ fontFamily: 'SemiBold', fontSize: 16, color: '#bcacf2',paddingTop:6,paddingBottom: 20}}>A Complete daily planner.</Text>
        </View>

        <View>
          <CalenderBlock />
        </View>

        <View>
          <Text style ={{ fontFamily: 'SemiBold', fontSize: 24,paddingTop: 15}}>Today's Stat</Text>
          
          <View style = {{ paddingTop: 10 }}>
            <View style = {[ styles.componentsBlockContainer,{ height: 170} ]}>
              <HomeFoodContainer/>
              <HomeExpenseContainer/>
            </View>

            <View style ={[ styles.componentsBlockContainer, { height: 118, marginTop: 15 } ]}>
              <HomeHabitContainer/>
              <HomeHealthContainer/>
            </View>

          </View>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#836cdd',
    borderRadius: 25,
    padding: 20,
    marginTop: 20
  },
  componentsBlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

})

export default Homepage