import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import {ExerciseTask} from '../interface/ExerciseTask';
import ExerciseAnswerOptions from './ExerciseAnswerOptions';
import ExerciseWord from './ExerciseWord';

const ExerciseQuestion: React.FC<{
  title: string;
  data: ExerciseTask;
  onCompleted: (success: boolean) => void;
}> = ({title, data, onCompleted}) => {
  const placeholderSymbol = '_';
  const placeholder = placeholderSymbol.repeat(
    data.de_answers.reduce(
      (memo: number, word: string) => Math.max(memo, word.length),
      0,
    ),
  );

  const [answer, setAnswer] = useState(placeholder);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null,
  );
  const isCorrectWord = (word: string) =>
    word === answer && answeredCorrectly === true;
  const isIncorrectWord = (word: string) =>
    word === answer && answeredCorrectly === false;

  const exerciseAnswerData = data.de_questionPhrase.slice(0);
  exerciseAnswerData[data.de_questionWordIndex] = answer;

  return (
    <View style={styles.panel}>
      <View>
        <Text style={styles.exerciseTitle}>{title}</Text>
        <Text style={styles.exercisePhrase}>
          {data.en_questionPhrase.map((word, index, array) => (
            <Text key={index}>
              <Text
                style={
                  index === data.en_questionWordIndex &&
                  styles.exerciseWordMarked
                }>
                {word}
              </Text>
              {index === array.length - 1 ? '.' : ' '}
            </Text>
          ))}
        </Text>

        <View style={styles.exerciseAnswer}>
          {exerciseAnswerData.map((word: string, index: number) => (
            <View key={index}>
              {word === answer && answer !== placeholder ? (
                <ExerciseWord title={word} checked={answeredCorrectly} />
              ) : (
                <View
                  style={{
                    overflow: 'hidden',
                    marginVertical: 26,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={[
                      {
                        borderStyle:
                          word[0] === placeholderSymbol ? 'solid' : 'dotted',
                        borderColor:
                          word[0] === placeholderSymbol ? '#fff' : '#96b4cc',
                        borderWidth: 2,
                        margin: -3,
                        marginBottom: 0,
                      },
                      isCorrectWord(word) && {backgroundColor: '#04e1e7'},
                      isIncorrectWord(word) && {backgroundColor: '#ff7e87'},
                    ]}>
                    <Text
                      style={[
                        styles.exerciseAnswerWordText,
                        word[0] === placeholderSymbol && {color: 'transparent'},
                      ]}>
                      {word}
                      {index === exerciseAnswerData.length - 1 && '.'}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        <ExerciseAnswerOptions
          data={data.de_answers}
          disabled={answeredCorrectly != null}
          onChange={word => {
            setAnswer(word);
          }}
        />
      </View>

      <View
        style={[
          styles.exerciseFooter,
          answeredCorrectly === true && {
            backgroundColor: '#04e1e7',
          },
          answeredCorrectly === false && {
            backgroundColor: '#ff7e87',
          },
        ]}>
        <Text style={styles.exerciseFooterMessage}>
          {answeredCorrectly === true && 'Great Job!'}
          {answeredCorrectly === false &&
            'Answer: ' + data.de_questionPhrase[data.de_questionWordIndex]}
        </Text>
        <Pressable
          disabled={answer === placeholder}
          style={[
            styles.exerciseFooterButton,
            answer !== placeholder && styles.exerciseFooterButton__enabled,
            answeredCorrectly !== null && styles.exerciseFooterButton__answered,
          ]}
          onPress={() => {
            if (answeredCorrectly == null) {
              setAnsweredCorrectly(
                answer === data.de_questionPhrase[data.de_questionWordIndex],
              );
            } else {
              onCompleted(answeredCorrectly);
            }
          }}>
          <Text
            style={[
              styles.exerciseFooterText,
              answeredCorrectly === true && {
                color: '#04e1e7',
              },
              answeredCorrectly === false && {
                color: '#ff7e87',
              },
            ]}>
            {answer === placeholder || answeredCorrectly != null
              ? 'Continue'
              : 'Check Answer'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    height: '90%',
    backgroundColor: '#3c6d81',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  exerciseTitle: {
    color: '#fff',
    textAlign: 'center',
    margin: 10,
  },
  exercisePhrase: {
    color: '#fff',
    textAlign: 'center',
    margin: 10,
    fontSize: 25,
  },
  exerciseWordMarked: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  exerciseAnswer: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 20,
    flexDirection: 'row',
  },
  exerciseAnswerWordText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  exerciseAnswerHint: {
    backgroundColor: '#fff',
    color: '#3c6d81',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseAnswerHintText: {
    textAlign: 'center',
  },
  exerciseFooter: {
    padding: 20,
    paddingBottom: 36,
    paddingTop: 16,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  exerciseFooterMessage: {
    color: '#fff',
    margin: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseFooterButton: {
    backgroundColor: '#6492a7',
    padding: 20,
    borderRadius: 36,
  },
  exerciseFooterButton__enabled: {
    backgroundColor: '#0ae2e9',
  },
  exerciseFooterButton__answered: {
    backgroundColor: '#fff',
  },
  exerciseFooterText: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default ExerciseQuestion;
