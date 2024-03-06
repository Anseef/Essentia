import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import HabitBlock from '../../components/HabitComponents/HabitBlock'
import Calender from '../../components/CalenderBlock/Calender'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome6'
import { ScrollView } from 'react-native'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';

const HabitMain = () => {
  const navigation = useNavigation();
  const [todayDate, setTodayDate] = useState(new Date());

  useEffect(() => {
    const getTodayDate = () => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setTodayDate(formattedDate);
    };
    getTodayDate();
  }, [])

  //Fetch date based on the click

  const handleBackPress = () => {
    const [year, month, day] = todayDate.split('-').map(Number);
    const previousDate = new Date(year, month - 1, day - 1);
    setTodayDate(formatDate(previousDate));
  };

  const handleForwardPress = () => {
    const [year, month, day] = todayDate.split('-').map(Number);
    const nextDate = new Date(year, month - 1, day + 1);
    setTodayDate(formatDate(nextDate));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={ '#836cdf' } />
      <View style={styles.upperContainer}>

      {/* 
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: -15, marginTop: 10 }}>
            <Ionicons name='chevron-back-outline' size={30} />
          </Pressable>
          <Text style={styles.dateText}>
            Habits
          </Text>

        </View> 
      */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20 }}>
          <Pressable onPress={() => handleBackPress()}>
            <Text style={styles.dateBar}>
              <Ionicons name='chevron-back' size={20} />
            </Text>
          </Pressable>

          <Text style={styles.dateBar}>
            <Text>
              {new Date(todayDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase()}
            </Text>
          </Text>

          <Pressable onPress={() => handleForwardPress()}>
            <Text style={styles.dateBar}>
              <Ionicons name='chevron-forward' size={20} />
            </Text>
          </Pressable>
        </View>

        <Calender />

        <View style={{ marginTop: 25, gap: 10, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'SemiBold', fontSize: 20 }}>
              Task Completed
            </Text>
            <Text style={{ fontFamily: 'SemiBold', fontSize: 20 }}>
              2/6
            </Text>
          </View>
          <Progress.Bar
            progress={0.2}
            width={375}
            color={'#836cdd'}
            unfilledColor={'#d9d4f6'}
            height={9}
            borderRadius={10}
            borderWidth={0}
            animated={true}
          />

        </View>
      </View>

      <View style={styles.taskContainer}>
        <Text style={{ fontFamily: 'Bold', fontSize: 22, paddingTop: 20, paddingLeft: 5 }}>Checklist</Text>

        <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
          <HabitBlock />
          <HabitBlock />
          <HabitBlock />
          <HabitBlock />
          <HabitBlock />
        </ScrollView>

        <Pressable style={styles.addButton} onPress={()=>navigation.navigate('Select a Category')}>
            <FontAwesomeIcons name='plus' size={20} color={ '#fff' } />
        </Pressable>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  upperContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  taskContainer: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#f3f2fc',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  // dateText: {
  //   paddingTop: 15,
  //   fontFamily: 'Bold',
  //   fontSize: 24
  // },
  dateBar: {
    fontFamily: 'SemiBold',
  },
  addButton: {
    backgroundColor: '#836cdd',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 30,
    bottom: 30
  }
});

export default HabitMain