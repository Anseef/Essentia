import React from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';

const CategorySelectPopup = ({ isVisible, onClose, onSelectCategory }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontFamily: 'Bold',fontSize: 18}}>Select a Category</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#836cdd',
    borderRadius: 5,

  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'SemiBold',
    fontSize: 16
  },
});

export default CategorySelectPopup;
