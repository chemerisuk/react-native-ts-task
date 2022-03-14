/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import ExerciseQuestion from './src/components/ExerciseQuestion';
import {ExerciseTask} from './src/interface/ExerciseTask';

import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

initializeApp({
  apiKey: 'AIzaSyCwy7wIZznGy5CE8iGxvIIltU6CO3tjQDg',
  projectId: 'reactnativets-c065d',
});

const App = () => {
  const [exerciseTasksData] = useState<Array<ExerciseTask>>([]);
  const [exerciseData, setExerciseData] = useState<ExerciseTask>();

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'Exercises'));
        querySnapshot.forEach(doc => {
          exerciseTasksData.push({id: doc.id, ...doc.data()} as ExerciseTask);
        });
        setExerciseData(exerciseTasksData.shift());
      } catch (err) {
        Alert.alert((err as Error).toString());
      }
    };
    fetchFirestoreData();
  }, [exerciseTasksData]);

  return (
    <SafeAreaView style={{backgroundColor: '#74dafd'}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{height: '10%'}} />
      {exerciseData ? (
        <ExerciseQuestion
          title="Fill in the missing word"
          data={exerciseData}
          key={exerciseData.id}
          onCompleted={() => {
            if (exerciseTasksData.length > 0) {
              setExerciseData(exerciseTasksData.shift());
            } else {
              Alert.alert('You are done!');
            }
          }}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color="#3c6d81"
          style={{height: '90%'}}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
