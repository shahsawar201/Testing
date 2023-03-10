
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RNImageToPdf from 'react-native-image-to-pdf';
import ImageCropPicker from 'react-native-image-crop-picker';
import PdfOpen from './src/PdfOpen';

const ImageToProject = () => {
  const [document, setDocument] = useState('');
  const [imageData, setImageData] = useState([]);
  const TakeImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      // multiple: true,
    })
      .then(image => {
        setImageData(image);
        // setDocument('')
      })
      .catch(error => console.log(error));
  };
  const TakeImageMultiple = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      multiple: true,
    })
      .then(image => {
        setImageData(image);
        // setDocument('')
      })
      .catch(error => console.log(error));
  };
  const [loopImagesData, setLoopImages] = useState('');
  // const LoopImages = () => {
  //   for (let x = 0; x <= imageData.length - 1; x++) {
  //     console.log(x);
  //   }
  // };
  // console.log(loopImagesData);
  const myAsyncPDFFunction = async () => {
    setDocument('');
    // const imageContent = () => {
    //   for (let x = 0; x < imageContent.length; x++) {
    //     return x
    //   }
    // };
    try {
      const options = {
        // imagePaths: [imageData.path],
        imagePaths: [
          imageData[0].path,
          imageData[1].path,
          imageData[2].path,
          imageData[3].path,
          imageData[4].path,
        ],
        name: 'pdf',
        maxSize: {
          width: 700,
          height: 1100,
        },
        quality: 1, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      setDocument(pdf.filePath);
      setImageData([]);
      console.log(pdf.filePath);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        // onPress={async () => {

        //   // await share({
        //   //   title: 'Sharing image file from awesome share app',
        //   //   message: 'Please take a look at this image',
        //   //   url: 'image',
        //   // });
        // }}
        onPress={myAsyncPDFFunction}
        title="make pdf"
      />
      {/* <Button onPress={() => {}} title="Share make" /> */}
      <Button onPress={TakeImage} title="pick the image from gallery" />
      <Button onPress={TakeImageMultiple} title="Multiple images" />

      <PdfOpen uriUrl={document} />
    </View>
  );
};

export default ImageToProject;

const styles = StyleSheet.create({});