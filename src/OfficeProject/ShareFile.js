import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Button, Image, Linking} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
// import RNFetchBlob from 'rn-fetch-blob';
import RNImageToPdf from 'react-native-image-to-pdf';
// import openPdf from 'react-native-open-pdf';
const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';

const options = {
  title,
  url,
  message,
};
const ShareFile = () => {
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const viewRef = useRef();
  // const fs = RNFetchBlob.fs;
  const Dummy = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      console.log(uri, 'uri');
      await Share.open({url: uri});
    } catch (error) {
      console.log(error);
    }
  };
  // const ImageChange = () => {
  //   let imagePath = null;
  //   RNFetchBlob.config({
  //     fileCache: true,
  //   })
  //     .fetch(
  //       'GET',
  //       'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcodewithmosh.com%2Fp%2Fthe-ultimate-react-native-course&psig=AOvVaw2BZwpeJVp8GgloaVR8lLDA&ust=1678254125784000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj0o_iNyf0CFQAAAAAdAAAAABAE',
  //     )
  //     .then(resp => {
  //       // the image path you can use it directly with Image component
  //       imagePath = resp.path();
  //       console.log(imagePath, 'before readfile');
  //       return resp.readFile('base64');
  //     })
  //     .then(async base64Data => {
  //       // here's base64 encoded image
  //       await share({
  //         title: 'Sharing pdf file from awesome share app',
  //         message: 'Please take a file at this file',
  //         url: base64Data,
  //       });
  //       console.log(base64Data, 'after then respp--- ');

  //       // remove the file from storage
  //       // return fs.unlink(imagePath);
  //     });
  // };
  const [imageData, setImageData] = useState('');
  const TakeImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
    })
      .then(image => {
        setImageData(image), console.log(image);
      })
      .catch(error => console.log(error));
  };
  const [document, setDocument] = useState('');
  const myAsyncPDFFunction = async () => {
    try {
      const options = {
        imagePaths: ['./assets/IMG_0215.jpg', './assets/zubair.jpg'],
        name: 'pdf',
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 300,
          height: 400,
        },
        quality: 0.7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      setDocument(pdf.filePath);
    } catch (e) {
      console.log(e);
    }
  };
  const OpenDoc = async () => {
    <PdfOpen />;
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Image
        ref={viewRef}
        source={
          imageData ? {uri: imageData.path} : require('./assets/noNeed.png')
        }
        style={{...styles.containerImg, ...styles.stretchImg}}
      />
      <View style={{marginVertical: 5}}>
        <Button
          // onPress={async () => {
          //   await share();
          // }}
          onPress={TakeImage}
          title="first pIck image"
        />
      </View>
      <View style={{marginVertical: 5}}>
        <Button
          // onPress={async () => {

          //   // await share({
          //   //   title: 'Sharing image file from awesome share app',
          //   //   message: 'Please take a look at this image',
          //   //   url: 'image',
          //   // });
          // }}
          onPress={myAsyncPDFFunction}
          // title="Share Image"÷
          title="make pdf"
        />
      </View>
      <View style={{marginVertical: 5}}>
        <Button
          // onPress={async () => {
          //   await share({
          //     title: 'Sharing pdf file from awesome share app',
          //     message: 'Please take a look at this file',
          //     url: file.pdf,
          //   });
          // }}
          onPress={OpenDoc}
          title="Share pdf"
        />
      </View>
    </View>
  );
};

export default ShareFile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImg: {
    paddingTop: 50,
    marginVertical: 20,
  },
  stretchImg: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});
