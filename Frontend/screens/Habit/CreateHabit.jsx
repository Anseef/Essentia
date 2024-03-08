import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import WeeklyHabitSelector from '../../components/HabitComponents/WeeklyHabitSelector';
import { SelectList } from 'react-native-dropdown-select-list'

const CreateHabit = ({ route }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(route.params?.selectedCategory || 'Not Specified');
  const [customCategory, setCustomCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelectDays = (days) => {
    setSelectedDays(days);
  };
  
  const handleSave = () => {
    console.log('Title:', title);
    category === 'Create' ? console.log('Category:', customCategory) : console.log(category);
    console.log('Priority:', priority);
    console.log(selectedDays)
  };

  return (
    <View style={styles.container}>
        <View style={{ position: 'relative' }}>
            <Text style={{ fontFamily: 'Bold', fontSize: 28,marginBottom: 10}}>Create Habit</Text>
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

                <WeeklyHabitSelector onSelectDays={ handleSelectDays }/>

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
                            { key: '1', value: 1 },
                            { key: '2', value: 2 },
                            { key: '3', value: 3 },
                        ]
                    }
                    search={false}
                    defaultOption={{
                        key: '1',
                        value: 1
                    }}
                    fontFamily='SemiBold'
                    save='value'
                    boxStyles={{
                        position:'absolute',
                        left: -55,
                        top: -23, 
                        borderWidth: 0, 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        width: 80
                    }}
                    inputStyles={{ fontSize: 15 }}
                    dropdownStyles={{ 
                        position:'absolute',
                        left: -40,
                        top: 30, 
                        borderColor: 'transparent', 
                        backgroundColor: '#e8defa', 
                        borderRadius: 5, 
                        width: 60, 
                        alignContent: 'center' 
                    }}

                    dropdownTextStyles={{ fontSize: 15 }}
                />
            </View>
            
        </View>

        <Pressable
            style={[styles.buttonStyle, { backgroundColor: '#836cdd', borderColor: '#836cdd' }]}
            onPress={handleSave}
        >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
        </Pressable>
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
});
