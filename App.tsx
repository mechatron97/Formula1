import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import racesResponse from './assets/data/races.json';

const races = racesResponse.data.races.response;

import RaceListItem from './src/Constants/components/RaceListItem';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
       data={races}
       renderItem={({item}) => (
         <RaceListItem item={item} round={0} />
       )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',

  },
  
});
