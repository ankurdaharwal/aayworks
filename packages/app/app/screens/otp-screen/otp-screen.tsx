import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Screen } from "../../components"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native"
import auth from "@react-native-firebase/auth"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import * as Animatable from "react-native-animatable"
import { palette } from "../../theme/palette"
import SplashScreen from "react-native-splash-screen"
export const Tick = require("./Tick.png")
const ROOT: ViewStyle = {
  backgroundColor: color.primary,
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
}
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  OtpTextField: {
    borderColor: "gray",
    borderWidth: 1,
    margin: 15,
    fontSize: 18,
    letterSpacing: 3,
    height: height / 13,
    width: width - width / 5,
    backgroundColor: color.palette.lightGrey,
    borderRadius: 15,
  },
  modalView: {
    position: "absolute",
    width: width * 1.5,
    height: height,
    paddingTop: 50,
    borderRadius: height,
    backgroundColor: color.palette.blue,
    top: height / 1.5,
    right: -width / 3.9,
    alignItems: "center",
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  circle: {
    width: height / 3,
    height: height / 3,
    //marginTop: height / 8,
    // marginLeft: width / 5,
    borderRadius: height / 3,
    //backgroundColor: color.palette.blue,
    alignSelf: "center",
    elevation: 5,
  },
  tick: {
    alignSelf: "center",
  },
})

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
}
const circleColor = {
  0: {
    backgroundColor: palette.blue,
    opacity: 1,
  },
  1: {
    backgroundColor: palette.green,
    opacity: 1,
  },
}

export const OtpScreen = observer(function OtpScreen() {
  SplashScreen.hide()
  const [confirmOTP, setConfirmOTP] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const [value, setValue] = React.useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
    setConfirm(confirmation)
    setModalVisible(true)
  }
  async function confirmCode(code: any) {
    try {
      await confirm.confirm(code)
      setConfirmOTP(true)
    } catch (error) {
      console.log("Invalid code")
    }
  }
  function navigationToUserType() {
    navigation.navigate("usertype")
  }
  if (confirmOTP === true) {
    return (
      <Screen style={ROOT} preset="scroll">
        <Animatable.View
          animation={circleColor}
          style={styles.circle}
          duration={2000}
          onAnimationEnd={navigationToUserType}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Animatable.Image
              source={Tick}
              style={styles.tick}
              animation={fadeIn}
              duration={6000}
            ></Animatable.Image>
          </View>
        </Animatable.View>
        <Animatable.Text
          animation={fadeIn}
          duration={4000}
          style={{
            alignSelf: "center",
            marginTop: 20,
            fontSize: 20,
            color: "white",
          }}
        >
          Verified !
        </Animatable.Text>
      </Screen>
    )
  } else {
    return (
      <Screen style={ROOT} preset="scroll">
        <View style={styles.container}>
          <TextInput
            placeholder={"Enter mobile number"}
            textAlignVertical={"center"}
            style={styles.OtpTextField}
            onChangeText={(text) => setValue(text)}
            editable={!modalVisible}
            keyboardType={"number-pad"}
            maxLength={10}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: width / 10, paddingTop: height / 8 }}
            activeOpacity={0.8}
            onPress={() => {
              signInWithPhoneNumber("+91 " + value)
            }}
          >
            <Text style={{ color: color.palette.white, fontSize: 18 }}>Send OTP</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <OTPInputView
              style={{ width: "40%", height: height / 12 }}
              pinCount={6}
              //code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              //onCodeChanged = {code => { this.setState({code})}}
              //autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                confirmCode(code)
              }}
            />
          </View>
        </Modal>
      </Screen>
    )
  }
})
