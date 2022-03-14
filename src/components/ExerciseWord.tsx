import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

const ExerciseWord: React.FC<{
  title: string;
  disabled?: boolean;
  checked?: boolean;
  onClick?: (word: string) => void;
}> = ({title, disabled, checked, onClick = () => {}}) => {
  return (
    <View style={styles.exerciseOptionWrapper}>
      <Pressable
        style={[
          styles.exerciseOption,
          disabled && styles.exerciseOption__disabled,
          checked === true && styles.exerciseOption__positive,
          checked === false && styles.exerciseOption__negative,
        ]}
        onPress={() => {
          onClick(title);
        }}>
        <Text
          style={[
            styles.exerciseOptionText,
            disabled && styles.exerciseOptionText__disabled,
            checked === true && styles.exerciseOptionText__positive,
            checked === false && styles.exerciseOptionText__negative,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseOptionWrapper: {
    margin: 8,
  },
  exerciseOption: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  exerciseOption__disabled: {
    backgroundColor: '#6292a6',
  },
  exerciseOption__positive: {
    backgroundColor: '#04e1e7',
  },
  exerciseOption__negative: {
    backgroundColor: '#ff7e87',
  },
  exerciseOptionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2a5267',
  },
  exerciseOptionText__disabled: {
    color: 'transparent',
  },
  exerciseOptionText__positive: {
    color: '#fff',
  },
  exerciseOptionText__negative: {
    color: '#fff',
  },
});

export default ExerciseWord;
