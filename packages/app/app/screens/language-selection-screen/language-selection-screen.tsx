import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Screen } from "../../components"
import { color } from "../../theme"
import SplashScreen from "react-native-splash-screen"

const { width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    padding: 20,
    margin: 10,
    width: width / 4,
    height: width / 4,
    borderRadius: width / 10,
  },
  image: {
    fontSize: 32,
  },
  submitButton: {
    alignSelf: "flex-end",
    paddingRight: width / 12,
  },
  languageSelectionView: {
    justifyContent: "center",
    alignItems: "center",
  },
})
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    image: require("./bengaliLanguage.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    image: require("./englishLanguage.png"),
  },

  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53ab28ba",
    image: require("./hindiLanguage.png"),
  },
  {
    id: "3ac68afc-c05-48d3-a4f8-fbd91aa9f6",
    image: require("./malayalamLanguage.png"),
  },
  {
    id: "3ac68afc-c65-48d3-a4f8-fbd91aa9f6",
    image: require("./marathiLanguage.png"),
  },
  {
    id: "3ac68afc-605-48d3-a4f8-fbd91aa9f6",
    image: require("./odiyaLanguage.png"),
  },
]

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image source={item} />
  </TouchableOpacity>
)

export const LanguageSelectionScreen = ({ navigation }) =>  {
  const [selectedId, setSelectedId] = useState(DATA[0].id)
  SplashScreen.hide()
   
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? color.palette.green : color.palette.lightGrey

    return (
      <Item
        item={item.image}
        onPress={() => {
          setSelectedId(item.id)
        }}
        style={{ backgroundColor }}
      />
    )
  }
  return (
    <Screen style={ROOT}>
      <View style={styles.languageSelectionView}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns={3}
        />
      </View>
      <View style={styles.submitButton}>
        <TouchableOpacity onPress={() => navigation.navigate('otp')}>
          <Image source={require("./nextButton.png")} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
};
