import { View, Text, Pressable,StyleSheet } from 'react-native'
import React from 'react'
import IconPack from 'react-native-vector-icons/FontAwesome6';

const HomeHealthContainer = () => {

  return (
    <Pressable style = { styles.container}  onPress={() => console.log('Health Clicked')}>
      
      <View style = { styles.headingBlock }>
        <Text style = {{ fontFamily: 'SemiBold', fontSize: 20,paddingTop: 3 }}>Health</Text>
        <IconPack name='heart-circle-check' size={ 20 } style = {{ paddingBottom: 3 }} color={ '#7d5ada'}/> 
      </View>

      <View style = {{ alignSelf: 'center',paddingTop: 10}}>
        <IconPack name='person-running' size={ 38 } color={ '#7d5ada'} />
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
    alignItems: 'center'
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