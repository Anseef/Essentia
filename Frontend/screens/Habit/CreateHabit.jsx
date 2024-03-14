import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import WeeklyHabitSelector from '../../components/HabitComponents/WeeklyHabitSelector'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'
import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome6'

const CreateHabit = ({ route }) => {

  const navigation = useNavigation();

  let initialTitle = '';
  if (route.params?.habitData) {
    initialTitle = route.params.habitData.title || '';
  }

  let initialPriority = null;
  if (route.params?.habitData) {
    initialPriority = route.params.habitData.priority || null;
  }

  let initialRepeatArray = [0, 1, 2, 3, 4, 5, 6];
  if (route.params?.habitData) {
    initialRepeatArray = route.params.habitData.repeatDays || [];
  }

  const habitId = route.params?.habitData?._id || 0;
  const [title, setTitle] = useState(initialTitle);
  const [customCategory, setCustomCategory] = useState('');
  const [priority, setPriority] = useState(initialPriority);
  const [selectedDays, setSelectedDays] = useState(initialRepeatArray);
  const [error, setError] = useState(null);
  
  const category = route.params?.selectedCategory || 'Not Specified';
  const isEditable = useState(route.params?.isEditable || false);
  const isRemovable = useState(route.params?.isRemovable || false);

  const { userData, localIP } = useContext(AuthContent);

  const handleSelectDays = (days) => {
    setSelectedDays(days);
  };

  const handleSave = async () => {
    if (!title || !priority || selectedDays.length === 0) {
      setError('Please fill all required fields.');
      return;
    }
  
    try {
      const habitData = {
        userId: userData._id,
        title: title,
        category: category === 'Create' ? customCategory : category,
        priority: priority !== 'none' ? parseInt(priority) : 0,
        repeatDays: selectedDays,
      };
  
      // Inserting Habit data to the DB 
      const response = await axios.post(`http://${localIP}:8080/create-habit`, habitData);

      if(response.data.status === 'ok'){
        navigation.navigate( 'Habits' );
      }

    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async () => {
    if (!title || !priority || selectedDays.length === 0) {
      setError('Please fill all required fields.');
      return;
    }
  
    try {
      const habitData = {
        habitId: habitId,
        userId: userData._id,
        title: title,
        category: category,
        priority: priority !== 'none' ? parseInt(priority) : 0,
        repeatDays: selectedDays,
      };
  
      // Inserting Habit data to the DB 
      const response = await axios.post(`http://${localIP}:8080/update-habit`, habitData);

      if(response.data.status === 'ok'){
        navigation.navigate( 'Habits' );
      }

    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletehabit = async() => {
    try {
      const response = await axios.post(`http://${localIP}:8080/delete-habit`, { habitData: route.params?.habitData });

      if(response.data.status === 'ok'){
        navigation.navigate( 'Habits' );
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
        <View style={{ position: 'relative' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Bold', fontSize: 28}}>{ isEditable? 'Update Habit' : 'Create Habit'}</Text>
              { isRemovable[0] ? 

                <Pressable onPress={ handleDeletehabit }>
                  <Icon name='trash' size={ 20 } color={ '#73549e' } style={{ paddingBottom: 5}}/>
                </Pressable>
                : undefined 
              }

            </View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              autoCapitalize="none"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            {category === 'Create' ? (
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    autoCapitalize="none"
                    onChangeText={(text) => setCustomCategory(text)}
                />
            ) : (
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[styles.habitText, { color: '#5e5a65' }]}>Category : </Text>
                    <Text style={[styles.habitText, { color: '#73549e' }]}>{category}</Text>
                </View>
                )
            }

            <View style={styles.fieldContainer}>
                <Text style={[styles.habitText, { color: '#5e5a65' }]}>Repeat</Text>

                <WeeklyHabitSelector onSelectDays={ handleSelectDays } storedSelectedDays = { selectedDays }/>

            </View>

            {/* <TextInput
            style={styles.input}
            placeholder="Priority"
            autoCapitalize="none"
            value={goal}
            onChangeText={(text) => setGoal(text)}
            /> */}

            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                
                <Text style={[styles.habitText, { color: '#5e5a65' }]}>Priority</Text>
                
                <SelectList 
                    setSelected={(value) => { setPriority(value) }}
                    data={
                        [
                            { key: '0', value: 'none' },
                            { key: '1', value: 1 },
                            { key: '2', value: 2 },
                            { key: '3', value: 3 },
                        ]
                    }
                    search={false}
                    defaultOption={initialPriority === null ? { key: '0', value: 'none' } : { key: '0', value: initialPriority }}
                    fontFamily='SemiBold'
                    save='value'
                    boxStyles={{
                        position:'absolute',
                        left: -65,
                        top: -23, 
                        borderWidth: 0, 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        width: 90
                    }}
                    inputStyles={{ fontSize: 15 }}
                    dropdownStyles={{ 
                        position:'absolute',
                        left: -65,
                        top: 30, 
                        borderColor: 'transparent', 
                        backgroundColor: '#e8defa', 
                        borderRadius: 5, 
                        width: 85, 
                        alignItems: 'center'
                    }}

                    dropdownTextStyles={{ fontSize: 15, textAlign:'center' }}
                />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

        </View>

        { 
          isEditable[0] ?       
          <Pressable
            style={[styles.buttonStyle, { backgroundColor: '#836cdd', borderColor: '#836cdd' }]}
            onPress={handleUpdate}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Update</Text>
          </Pressable>
          :
          <Pressable
            style={[styles.buttonStyle, { backgroundColor: '#836cdd', borderColor: '#836cdd' }]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
          </Pressable>
        }

    </View>
  );
};

export default CreateHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 60,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    backgroundColor: '#e8defa',
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#73549e',
    borderRadius: 10,
  },
  habitText: {
    fontFamily: 'SemiBold',
    fontSize: 15,
    color: '#5e5a65',
  },
  fieldContainer: {
    padding: 20,
    backgroundColor: '#e8defa',
    marginBottom: 15,
    borderRadius: 15,
    gap: 10
  },
  buttonStyle: {
    padding: 11,
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'SemiBold',
    alignSelf: 'center'
  }

});
