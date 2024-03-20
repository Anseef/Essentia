import { Text, View,StyleSheet,StatusBar,Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import CalenderBlock from '../../components/CalenderBlock/Calender'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHabitContainer from '../../components/HomeContainers/HomeHabitContainer';
import HomeExpenseContainer from '../../components/HomeContainers/HomeExpenseContainer';  
import HomeHealthContainer from '../../components/HomeContainers/HomeHealthContainer';
import HomeFoodContainer from '../../components/HomeContainers/HomeFoodContainer';   
import IconPack from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';

const Homepage = () =>  {
  const navigation = useNavigation();

  const [todayDate, setTodayDate] = useState(new Date())

  const { userData } = useContext(AuthContent);

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const handleCurrentDay = (currentIndex) => {
    setCurrentDayIndex(currentIndex)
  }

  useEffect(() => {
    const getTodayDate = () => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setTodayDate(formattedDate)
    };
    getTodayDate();
  }, [])

  return (
    <SafeAreaView style = {{ flex: 1, paddingLeft: 20, paddingRight:20,backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={ '#fff' } barStyle = "dark-content"  />
      
      <View style = { styles.headerContainer }>
        <View>
          <Text style={ styles.headerText }>Hello {userData?.name}</Text>
          <Text style={{ fontFamily: 'Medium',fontSize: 14 }}>Today, {new Date().toLocaleDateString('en-US', {  day: 'numeric',month: 'short', })}</Text>
        </View>

        <Pressable onPress={ () => navigation.navigate('Profile')}>
          <IconPack name='user-large' size={ 22 } color={ '#836cdd' }/>
        </Pressable>
      </View>

      <View style = { styles.container }>
        <Text style = {{ fontFamily: 'ExtraBold', fontSize: 42, lineHeight: 45, color: '#fff',paddingTop: 20}}>Welcome to Essent!a..</Text>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 16, color: '#bcacf2',paddingTop:6,paddingBottom: 20}}>A Complete daily planner.</Text>
      </View>

      <View>
        <CalenderBlock currentDate={ todayDate } selectedDayIndex={handleCurrentDay} />
      </View>

      <View>
        <Text style ={{ fontFamily: 'SemiBold', fontSize: 24,paddingTop: 15}}>Today's Stat</Text>
        
        <View style = {{ paddingTop: 10 }}>
          <View style = {[ styles.componentsBlockContainer,{ height: 170} ]}>
            <HomeFoodContainer/>
            <HomeExpenseContainer/>
          </View>

          <View style ={[ styles.componentsBlockContainer, { height: 120, marginTop: 15 } ]}>
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
    marginTop: 20,
    marginBottom:5
  },
  componentsBlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', padding: 5,
    marginTop: 5
  },
  headerText: {
    fontFamily: 'SemiBold',
    fontSize: 19,
    marginBottom: -5
  }

})

export default Homepage