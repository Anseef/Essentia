import { View, StyleSheet, Pressable,Text } from 'react-native'
import React, { useState } from 'react'
import CategoryBlock from '../../components/HabitComponents/CategoryBlock'
import { useNavigation } from '@react-navigation/native';
import CategorySelectPopup from '../../components/HabitComponents/CategorySelectPopup';

const Category = () => {

    const navigation = useNavigation();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);


    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const navigateToCreateHabit = () => {
        if (selectedCategory) {
        navigation.navigate('Create Habit', { selectedCategory });
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    
    return (
        <View style={ styles.container }> 
            <View style={ styles.categoryContainer }>

                <CategoryBlock 
                    categoryName={'Study'}  
                    colorIndex={ 1 }         
                    isSelected={selectedCategory === 'Study'}
                    onPress={() => handleCategorySelect('Study')}
                />
                <CategoryBlock 
                    categoryName={'Art'}  
                    colorIndex={ 2 }         
                    isSelected={selectedCategory === 'Art'}
                    onPress={() => handleCategorySelect('Art')}
                />
                <CategoryBlock 
                    categoryName={'Sports'}  
                    colorIndex={ 3 }         
                    isSelected={selectedCategory === 'Sports'}
                    onPress={() => handleCategorySelect('Sports')}
                />
                <CategoryBlock 
                    categoryName={'Meditation'}  
                    colorIndex={ 4 }         
                    isSelected={selectedCategory === 'Meditation'}
                    onPress={() => handleCategorySelect('Meditation')}
                />
                <CategoryBlock 
                    categoryName={'Quit Smoking'}  
                    colorIndex={ 5 }         
                    isSelected={selectedCategory === 'Quit Smoking'}
                    onPress={() => handleCategorySelect('Quit Smoking')}
                />
                <CategoryBlock 
                    categoryName={'Social'}  
                    colorIndex={ 1 }         
                    isSelected={selectedCategory === 'Social'}
                    onPress={() => handleCategorySelect('Social')}
                />
                <CategoryBlock 
                    categoryName={'Diet'}  
                    colorIndex={ 2 }         
                    isSelected={selectedCategory === 'Diet'}
                    onPress={() => handleCategorySelect('Diet')}
                />
                <CategoryBlock 
                    categoryName={'Health'}  
                    colorIndex={ 3 }         
                    isSelected={selectedCategory === 'Health'}
                    onPress={() => handleCategorySelect('Health')}
                />
                <CategoryBlock 
                    categoryName={'Read'}  
                    colorIndex={ 4 }         
                    isSelected={selectedCategory === 'Read'}
                    onPress={() => handleCategorySelect('Read')}
                />
                <CategoryBlock 
                    categoryName={'Create'}  
                    colorIndex={ 5 }         
                    isSelected={selectedCategory === 'Create'}
                    onPress={() => handleCategorySelect('Create')}
                />

            </View>
            <View style = {{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>

                <Pressable style = {[styles.buttonStyle, { borderColor: '#836cdd' }]} onPress={ () => navigation.goBack() }>
                    <Text style={[styles.buttonText, {color: '#836cdd'}]}>Cancel</Text>
                </Pressable>
                    
                <Pressable
                    style={[styles.buttonStyle, { backgroundColor: '#836cdd', borderColor: '#836cdd' }]}
                    onPress={() => { selectedCategory === '' ? openPopup() : navigateToCreateHabit() }}
                >
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Next</Text>
                </Pressable>

                <CategorySelectPopup
                    isVisible={isPopupVisible}
                    onClose={closePopup}
                    onSelectCategory={handleCategorySelect}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingTop: 20
    },
    buttonStyle: {
        padding: 11,
        borderRadius: 10,
        borderWidth: 2,
        width: 178,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Bold',
        fontSize: 16
    }
})

export default Category