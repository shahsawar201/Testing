import {
  ActivityIndicator,
  Button,
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import {captureRef} from 'react-native-view-shot';
import RNImageToPdf from 'react-native-image-to-pdf';
import PdfOpen from '../PdfOpen';

const PdfScanner = () => {
  const [imageData, setImageData] = useState('');
  const [textData, setTextData] = useState('');
  const [pdfPath, setPdfPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [shareData, setShareData] = useState('');
  const [boldData, setBoldData] = useState('');
  const [italicData, setItalicData] = useState('');
  const [smallSize, setSmallSize] = useState('');
  const [yellowColor, setYellowColor] = useState('');
  const [blackColor, setblackColor] = useState('');
  const [fontStyleData, setFontStyleData] = useState('');
  const viewRef = useRef();
  const TakeImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 500,
    })
      .then(image => setImageData(image))
      .catch(error => console.log(error));
  };
  //   console.log(imageData);
  const ScanText = async () => {
    setLoading(true);
    try {
      const response = await TextRecognition.recognize(imageData.path);
      // setTextData(response);
      if (response) {
        setLoading(false);
        const result = response.join();
        const resultReplace = result.replaceAll(',', '\n');
        const replaceReplace = result.replaceAll('PM J', '');
        setTextData(resultReplace);
        // console.log(result.length());
        // const splitReplace=resultReplace.split()
        // console.log(splitReplace, 'this is split');
      }
      // console.log(response.join());
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const MakePdf = async () => {
    setLoading1(true);
    try {
      const response = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });
      console.log(response, 'screenshot path');
      setShareData(response);
      if (response) {
        setLoading1(false);
        const options = {
          imagePaths: [response],
          name: 'pdf',
          maxSize: {
            width: Dimensions.get('screen').width + 20,
            height: Dimensions.get('screen').height + 50,
          },
        };
        const result = await RNImageToPdf.createPDFbyImages(options);
        setPdfPath(result.filePath);
        console.log(result, 'pdf path');
      } else {
        console.error('there is no image');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const CustomButton = ({style, onPress, text, styleText}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          borderRadius: 7,
          width: 70,
          backgroundColor: '#00000040',
          marginTop: 12,
        },
      ]}>
      <Text style={[styleText, {alignSelf: 'center', color: 'white'}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      style={{flex: 1, marginTop: 60, marginBottom: 20, paddingHorizontal: 18}}>
      <Button title="Pick image" onPress={TakeImage} />
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, height: 300}}
          size={'small'}
          color="black"
        />
      ) : (
        <>
          <Button title="Scan Text" onPress={ScanText} />
          <TextInput
            ref={viewRef}
            style={{
              paddingHorizontal: 9,
              backgroundColor: '#ff700040',
              borderRadius: 12,
              fontStyle: fontStyleData ? fontStyleData : 'normal',
              color: yellowColor
                ? yellowColor
                : blackColor
                ? blackColor
                : 'black',
              fontSize: smallSize ? smallSize : 14,
              fontWeight: boldData ? boldData : 'normal',
              paddingVertical: 5,
            }}
            placeholder="Enter your detail"
            value={textData}
            onChangeText={e => setTextData(e)}
            multiline={true}
          />
        </>
      )}

      {textData && (
        <View>
          <CustomButton
            styleText={{fontWeight: '500'}}
            text={'Default'}
            onPress={() => {
              setblackColor(''),
                setBoldData(''),
                setFontStyleData(''),
                setYellowColor(''),
                setItalicData(''),
                setSmallSize('');
            }}
            style={{alignSelf: 'flex-end'}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomButton
              styleText={{fontWeight: '700'}}
              text={'Bold'}
              onPress={() => setBoldData('600')}
              style={{}}
            />
            <CustomButton
              styleText={{fontStyle: 'italic', fontWeight: '700'}}
              text={'Italic'}
              onPress={() => setFontStyleData('italic')}
              style={{}}
            />
            <CustomButton
              styleText={{fontSize: 12, fontWeight: '700'}}
              text={'small size'}
              onPress={() => setSmallSize(12)}
              style={{}}
            />
            <CustomButton
              styleText={{color: 'yellow'}}
              text={'yellow'}
              onPress={() => setYellowColor('yellow')}
              style={{}}
            />
            <CustomButton
              styleText={{color: 'blue'}}
              text={'blue'}
              onPress={() => {
                setYellowColor(''), setblackColor('blue');
              }}
              style={{}}
            />
          </View>
          <Button title="Make in Pdf" onPress={MakePdf} />
        </View>
      )}
      {loading1 ? (
        <ActivityIndicator size={'small'} color="red" />
      ) : (
        <PdfOpen uriUrl={pdfPath} />
      )}
      {/* {pdfPath ? (
        <Button
          title="Share the file"
          onPress={async () => {
            try {
              await Share.open({url: shareData});
            } catch (error) {
              console.error(error);
            }
          }}
        />
      ) : null} */}
    </ScrollView>
  );
};

export default PdfScanner;

const styles = StyleSheet.create({});
