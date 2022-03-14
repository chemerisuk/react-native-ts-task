import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ExerciseWord from './ExerciseWord';

const ExerciseAnswerOptions: React.FC<{
  data: Array<string>;
  disabled: boolean;
  onChange: (word: string) => void;
}> = ({data, disabled, onChange}) => {
  const [answer, setAnswer] = useState('');
  const isSelected = (word: string) => word === answer;

  return (
    <View
      style={[
        styles.exerciseOptionContainer,
        disabled && styles.exerciseOptionContainer__disabled,
      ]}>
      {data.map((word, index) => (
        <ExerciseWord
          key={index}
          title={word}
          disabled={isSelected(word)}
          onClick={() => {
            if (!disabled) {
              setAnswer(word);
              onChange(word);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseOptionContainer: {
    margin: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  exerciseOptionContainer__disabled: {
    opacity: 0.5,
  },
});

export default ExerciseAnswerOptions;
