import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CSVUploader from './src/components/CSVUploader';


type TeamResult = {
  empID1: string;
  empID2: string;
  projectID: string;
  days: number;
};

function App(): React.JSX.Element {

  const [teamResults, setTeamResults] = useState<TeamResult[]>([]);

    const handleClearData = async () => {
      setTeamResults([]);
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Team Longest Period Finder</Text>
      <CSVUploader onParsed={setTeamResults} />
      {teamResults.length > 0 && (
        <View>
        <FlatList
          data={teamResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.result}>
              <Text>Employee 1: {item.empID1}</Text>
              <Text>Employee 2: {item.empID2}</Text>
              <Text>Project: {item.projectID}</Text>
              <Text>Days Worked Together: {item.days}</Text>
            </View>
          )}
        />
        <Button title="Clear Data" onPress={handleClearData} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  result: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
});

export default App;
