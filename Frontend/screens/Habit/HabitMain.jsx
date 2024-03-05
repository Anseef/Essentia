import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HabitBlock from '../../components/HabitComponents/HabitBlock'

const HabitMain = () => {
  return (
    <SafeAreaView>
      <View>

      </View>
      <View>
        <Text>Today's Progress</Text>
        <View>
          <HabitBlock />
          <HabitBlock />
          <HabitBlock />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HabitMain