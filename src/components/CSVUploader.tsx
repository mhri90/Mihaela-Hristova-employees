import React from 'react';
import { Button, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { parseCSVAndCalculate } from '../utils/parser';

type CSVUploaderProps = {
  onParsed: (result: any) => void;
};



export default function CSVUploader({ onParsed }: CSVUploaderProps) {

  const mockCSV = `
1,1001,2020-01-01,2020-03-01
2,1001,2020-02-01,2020-04-01
3,1002,01/03/2020,01/06/2020
4,1002,2020/04/01,null
5,1001,15.02.2020,15.03.2020
`;
  const handlePickFile = async () => {
    try {
      // const res = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.plainText] });
      // const fileContent = await fetch(res.uri).then(r => r.text());
      const result = parseCSVAndCalculate(mockCSV);
      console.log('Parsed CSV Result:', result);
      onParsed(result);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  return <View><Button title="Pick CSV File" onPress={handlePickFile} /></View>;
}
