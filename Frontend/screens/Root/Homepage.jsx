import { Pressable, Text, View,Button } from 'react-native'
import React, { Component } from 'react'

import { useNavigation } from '@react-navigation/native';

const Homepage = () =>  {

    const navigation = useNavigation();
    return (
      <View>
        <Pressable onPress={() => navigation.navigate('FoodDetails')}>
          <Text>Food Details</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('FoodSelection')}>
          <Text>Food Selection</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('FoodDescription')}>
          <Text>Food Description</Text>
        </Pressable>
      </View>
    )
}

export default Homepage