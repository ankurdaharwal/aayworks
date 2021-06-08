import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle, StyleSheet, View, Modal, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const { width, height } = Dimensions.get("window")
const styles = StyleSheet.create({
  circleTextView: {
    fontSize: 30,
    marginTop: 90,
  },
  blueCircleView: {
    width: height / 3,
    height: height / 3,
    marginTop: height / 8,
    marginLeft: width / 5,
    borderRadius: height / 3,
    backgroundColor: color.palette.blue,
    alignItems: "center",
    elevation: 5,
  },
  greenCircleView: {
    width: height / 3,
    height: height / 3,
    marginTop: height / 12,
    marginLeft: width / 5,
    borderRadius: height / 3,
    backgroundColor: color.palette.green,
    alignItems: "center",
    elevation: 5,
  },
})

export const UserTypeScreen = observer(function UserTypeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  //const navigation = useNavigation()
  const goToWorkerRegistration = () => {
    // navigation.navigate("workerSignup")
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Modal animationType="slide" transparent={true}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            goToWorkerRegistration()
          }}
        >
          <View style={styles.blueCircleView}>
            <Text style={styles.circleTextView} tx="userTypeScreen.FindJobs" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            goToWorkerRegistration()
          }}
        >
          <View style={styles.greenCircleView}>
            <Text style={styles.circleTextView} tx="userTypeScreen.HireTalent"></Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  )
})
