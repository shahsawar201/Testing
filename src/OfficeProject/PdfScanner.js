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
import React, {useEffect, useRef, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import {captureRef} from 'react-native-view-shot';
import RNImageToPdf from 'react-native-image-to-pdf';
import PdfOpen from '../PdfOpen';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Clipboard from '@react-native-clipboard/clipboard';

const PdfScanner = () => {
  const richText = React.useRef();
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
        // const replaceReplace = resultReplace.replaceAll('PM J', '');
        setTextData(resultReplace);
      }
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
  const CustomButton = ({style, onPress, IconName, styleText}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          borderRadius: 7,
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
      ]}>
      {IconName}
    </TouchableOpacity>
  );
  return (
    <ScrollView
      style={{flex: 1, marginTop: 60, marginBottom: 50, paddingHorizontal: 18}}>
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
          {/* <TextInput
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
              textDecorationLine: stripe
                ? stripe
                : underline
                ? underline
                : 'none',
            }}
            placeholder="Enter your detail"
            value={textData}
            onChangeText={e => setTextData(e)}
            multiline={true}
          /> */}
        </>
      )}

      {textData && (
        <View>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
            }}
          />

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#00000020',
              borderRadius: 9,
              marginTop: 12,
            }}>
            <CustomButton
              styleText={{fontWeight: '700'}}
              IconName={<Feather name="bold" size={23} color="black" />}
              onPress={() =>
                boldData == '600' ? setBoldData('') : setBoldData('600')
              }
              style={{
                backgroundColor:
                  boldData == '600' ? '#00000030' : 'transparent',
                margin: 4,
              }}
            />
            <CustomButton
              IconName={<Feather name="italic" size={23} color="black" />}
              onPress={() =>
                fontStyleData == 'italic'
                  ? setFontStyleData('normal')
                  : setFontStyleData('italic')
              }
              style={{
                backgroundColor:
                  fontStyleData == 'italic' ? '#00000030' : 'transparent',
              }}
            />
            <CustomButton
              IconName={<Feather name="underline" size={23} color="black" />}
              onPress={() => {
                underline == 'underline'
                  ? setUnderline('')
                  : setUnderline('underline'),
                  setStripe('');
              }}
              style={{
                backgroundColor:
                  underline == 'underline' ? '#00000030' : 'transparent',
              }}
            />
            <CustomButton
              IconName={
                <Octicons name="strikethrough" size={23} color="black" />
              }
              onPress={() => {
                stripe == 'line-through'
                  ? setStripe('none')
                  : setStripe('line-through'),
                  setUnderline('');
              }}
              style={{
                backgroundColor:
                  stripe == 'line-through' ? '#00000030' : 'transparent',
              }}
            />
            <CustomButton
              IconName={<Icon name="copy" size={23} color="black" />}
              onPress={async () => {
                await Clipboard.setString(textData);
              }}
            />
          </View> */}
        </View>
      )}
      {textData && (
        <View
          style={{
            marginVertical: 12,
            borderWidth: 1,
            borderColor: 'red',
            borderRadius: 14,
          }}>
          <View ref={viewRef}>
            <RichEditor
              ref={richText}
              style={{
                borderRadius: 12,
                paddingVertical: 5,
              }}
              initialContentHTML={`${textData}`}
              onChange={descriptionText => {
                console.log('descriptionText:', descriptionText);
              }}
            />
          </View>
        </View>
      )}
      {textData && <Button title="Make in Pdf" onPress={MakePdf} />}
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

      {/* <RichEditor
        ref={richText}
        placeholder="Enter your detail"
        style={{
          paddingHorizontal: 9,
          backgroundColor: '#ff700040',
          borderRadius: 12,
          fontStyle: fontStyleData ? fontStyleData : 'normal',
          color: yellowColor ? yellowColor : blackColor ? blackColor : 'black',
          fontSize: smallSize ? smallSize : 14,
          fontWeight: boldData ? boldData : 'normal',
          paddingVertical: 5,
        }}
        onChange={descriptionText => {
          console.log('descriptionText:', descriptionText);
        }}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
        ]}
        iconMap={{
          [actions.heading1]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H1</Text>
          ),
        }}
      /> */}

      {/* <Text style={{fontWeight: '800', fontSize: 22}}>
        THis is the required copy paste
      </Text>
      <Button
        title="See Copy Paste"
        onPress={async () => {
          const response = await Clipboard.getString();
          setCopyText(response);
        }}
      />
      {console.log(copyText)}
      <Text
        style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingHorizontal: 6,
          borderRadius: 10,
        }}>
        {copyText ? copyText : 'no copy data'}
      </Text> */}
    </ScrollView>
  );
};

export default PdfScanner;

const styles = StyleSheet.create({});
