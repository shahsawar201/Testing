import {LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PdfScanner from './src/OfficeProject/PdfScanner';
import FirebaseProject from './src/Firebase/FirebaseProject';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return <FirebaseProject />;

  <PdfScanner />;
};

export default App;

const styles = StyleSheet.create({});
