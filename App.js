import {LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PdfScanner from './src/OfficeProject/PdfScanner';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return <PdfScanner />;
};

export default App;

const styles = StyleSheet.create({});
