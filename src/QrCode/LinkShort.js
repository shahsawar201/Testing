// Make a Long URL Short and Share from React Native App
// https://aboutreact.com/long-url-short-and-share/

// import React in our code
import axios from 'axios';
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  TextInput,
} from 'react-native';
import QrCode from './QrCode';

const App = () => {
  const [inputValue, setInputText] = useState('');
  const getDataUsingGet = async () => {
    //GET request to convert our long URL to short one
    // fetch(
    //   'https://www.muftitariqmasood.com/',
    //   {
    //     method: 'GET',
    //   },
    // )
    //   .then((response) => response.text())
    //   //Response to text
    //   .then((responseJson) => {
    //     //Printing the Response String
    //     console.log(responseJson);
    //     //responseJson is our short URL
    //     //Sharing the short URL with our message
    //     Share.share({
    //       message:
    //         'Hey, I found very important interview questions of React Native. You can also read it by clicking on the link ' +
    //         responseJson,
    //     })
    //       .then((result) => console.log(result))
    //       .catch((errorMsg) => console.log(errorMsg));
    //   })
    //   //If response is not in text then in error
    //   .catch((error) => {
    //     //Error
    //     alert('Error -> ' + JSON.stringify(error));
    //     console.error(error);
    //   });
    // var request = new XMLHttpRequest();
    // request.onreadystatechange = e => {
    //   if (request.readyState !== 4) {
    //     return;
    //   }

    //   if (request.status === 200) {
    //     alert(request.responseURL);
    //     console.log(request);
    //   } else {
    //     console.warn('error');
    //   }
    // };
    // request.open(
    //   'GET',
    //   'https://dev.to/eetukudo_/build-automatic-url-shortener-with-react-and-emly-2ob5',
    // );
    // request.send ();
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`,
      );
      setValue(response.data.result.full_short_link);
    } catch (e) {
      console.log(e);
    }
  };
  const [value, setValue] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.titleText}>
          Example of URL Shorter using www.tinyurl.com
        </Text>
        <Text style={styles.textStyle}>Long URL</Text>
        <Text style={styles.textStyleSmall}>
          URL:
          https://aboutreact.com/questions-and-answers-for-interview-preparation
        </Text>
        <Text style={styles.textStyle}>After Shortening the URL</Text>
        <Text style={styles.textStyleSmall}>https://tinyurl.com/y2u6p7al</Text> */}
        <TextInput
          placeholder="Enter you value"
          value={inputValue}
          style={{
            backgroundColor: '#00000010',
            paddingVertical: 10,
            borderRadius: 6,
            paddingHorizontal: 8,
          }}
          onChangeText={e => setInputText(e)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={getDataUsingGet}>
          <Text style={styles.buttonTextStyle}>Short URL</Text>
        </TouchableOpacity>
        <Text
          style={{alignSelf: 'center', fontWeight: '600', marginTop: 14}}
          selectable={true} >
          {value}
        </Text>
      </View>
      {/* <QrCode/> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    padding: 5,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});
