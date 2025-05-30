import React from 'react';
import { Button, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { parseCSVAndCalculate } from '../utils/parser';

type CSVUploaderProps = {
  onParsed: (result: any) => void;
};



export default function CSVUploader({ onParsed }: CSVUploaderProps) {

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.plainText] });
      const fileContent = await fetch(res.uri).then(r => r.text());
      const result = parseCSVAndCalculate(fileContent);
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
