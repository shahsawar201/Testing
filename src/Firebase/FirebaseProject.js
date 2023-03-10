import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const FirebaseProject = () => {
  const [data,setData]=useState('')
  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const response = await firestore().collection('example').doc('7DR0eAcHPnxQUGfRIY71').get()
      // setData(response._data.appField);
      setData(response._data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>{data.Name}</Text>
      <Text>{data.password}</Text>
    </View>
  );
};

export default FirebaseProject;

const styles = StyleSheet.create({});