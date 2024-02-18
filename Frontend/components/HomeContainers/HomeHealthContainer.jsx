import { View, Text, Pressable,StyleSheet } from 'react-native'
import React from 'react'

const HomeHealthContainer = () => {

  return (
    <Pressable style = { styles.container}  onPress={() => console.log('Health Clicked')}>
      
      <View style = { styles.headingBlock }>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}>Health</Text>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20 }}>.</Text> 
      </View>

      <View style = {{ alignSelf: 'center',paddingTop: 2}}>
        <Text style = {{ fontFamily: 'ExtraBold' ,fontSize: 36,color: '#7d5ada'}}>Go</Text>
      </View>

    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efeefe',
    padding: 10,
    height: '100%',
    width:120,
    borderRadius: 12
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseDataBlock: {
    paddingTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expenseBlockText: {
    fontFamily: 'SemiBold',
    fontSize: 16
  }
})

export default HomeHealthContainer