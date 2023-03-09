// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [data,setData]=useState('')
//   useEffect(() => {
//     GetData();
//   }, []);

//   const GetData = async () => {
//     try {
//       const response = await firestore().collection('example').doc('7DR0eAcHPnxQUGfRIY71').get()
//       // setData(response._data.appField);
//       setData(response._data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <View style={{flex: 1, justifyContent: 'center'}}>
//       <Text>{data.Name}</Text>
//       <Text>{data.password}</Text>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

// import React, {useRef, useState} from 'react';
// import {StyleSheet, Text, View, Button, Image, Linking} from 'react-native';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import Share from 'react-native-share';
// import {captureRef} from 'react-native-view-shot';
// import RNFetchBlob from 'rn-fetch-blob';
// import RNImageToPdf from 'react-native-image-to-pdf';
// import openPdf from 'react-native-open-pdf';
// const url = 'https://awesome.contents.com/';
// const title = 'Awesome Contents';
// const message = 'Please check this out.';

// const options = {
//   title,
//   url,
//   message,
// };
// export default function App() {
//   const share = async (customOptions = options) => {
//     try {
//       await Share.open(customOptions);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const viewRef = useRef();
//   const fs = RNFetchBlob.fs;
//   const Dummy = async () => {
//     try {
//       const uri = await captureRef(viewRef, {
//         format: 'pdf',
//         quality: 0.7,
//       });
//       console.log(uri, 'uri');
//       await Share.open({url: uri});
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const ImageChange = () => {
//     let imagePath = null;
//     RNFetchBlob.config({
//       fileCache: true,
//     })
//       .fetch(
//         'GET',
//         'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcodewithmosh.com%2Fp%2Fthe-ultimate-react-native-course&psig=AOvVaw2BZwpeJVp8GgloaVR8lLDA&ust=1678254125784000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLj0o_iNyf0CFQAAAAAdAAAAABAE',
//       )
//       .then(resp => {
//         // the image path you can use it directly with Image component
//         imagePath = resp.path();
//         console.log(imagePath, 'before readfile');
//         return resp.readFile('base64');
//       })
//       .then(async base64Data => {
//         // here's base64 encoded image
//         await share({
//           title: 'Sharing pdf file from awesome share app',
//           message: 'Please take a file at this file',
//           url: base64Data,
//         });
//         console.log(base64Data, 'after then respp--- ');

//         // remove the file from storage
//         // return fs.unlink(imagePath);
//       });
//   };
//   const [imageData, setImageData] = useState('');
//   const TakeImage = () => {
//     ImageCropPicker.openPicker({
//       width: 400,
//       height: 400,
//     })
//       .then(image => {
//         setImageData(image), console.log(image);
//       })
//       .catch(error => console.log(error));
//   };
//   const [document, setDocument] = useState('');
//   const myAsyncPDFFunction = async () => {
//     try {
//       const options = {
//         imagePaths: ['./assets/IMG_0215.jpg', './assets/zubair.jpg'],
//         name: 'pdf',
//         maxSize: {
//           // optional maximum image dimension - larger images will be resized
//           width: 300,
//           height: 400,
//         },
//         quality: 0.7, // optional compression paramter
//       };
//       const pdf = await RNImageToPdf.createPDFbyImages(options);
//       setDocument(pdf.filePath);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const OpenDoc = async () => {
//     <PdfOpen/>
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Image
//         ref={viewRef}
//         source={
//           imageData ? {uri: imageData.path} : require('./assets/zubair.jpg')
//         }
//         style={{...styles.containerImg, ...styles.stretchImg}}
//       />
//       <View style={{marginVertical: 5}}>
//         <Button
//           // onPress={async () => {
//           //   await share();
//           // }}
//           onPress={TakeImage}
//           title="first pIck image"
//         />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Button
//           // onPress={async () => {

//           //   // await share({
//           //   //   title: 'Sharing image file from awesome share app',
//           //   //   message: 'Please take a look at this image',
//           //   //   url: 'image',
//           //   // });
//           // }}
//           onPress={myAsyncPDFFunction}
//           title="Share Image"
//         />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Button
//           // onPress={async () => {
//           //   await share({
//           //     title: 'Sharing pdf file from awesome share app',
//           //     message: 'Please take a look at this file',
//           //     url: file.pdf,
//           //   });
//           // }}
//           onPress={OpenDoc}
//           title="Share pdf"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   containerImg: {
//     paddingTop: 50,
//     marginVertical: 20,
//   },
//   stretchImg: {
//     width: 200,
//     height: 200,
//     resizeMode: 'stretch',
//   },
// });

import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RNImageToPdf from 'react-native-image-to-pdf';
import ImageCropPicker from 'react-native-image-crop-picker';
import PdfOpen from './src/PdfOpen';

const App = () => {
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
        imagePaths: [imageData.path],
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

      <PdfOpen uriUrl={document} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
