import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import LogoWhite from './assets/logo-black.png'
import LogoDark from './assets/logo-white.png'

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isDark, setIsDark] = useState(false)
  const toggleSwitch = () => setIsDark(previousState => !previousState);

  const getBibleVerse = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://labs.bible.org/api/?passage=random&type=json&formatting=plain');
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const NextBtn = () => {
    return (
      <TouchableOpacity style={!isDark ? styles.nextBtnLight : styles.nextBtnDark} onPress={getBibleVerse}>
        <Text style={!isDark ? styles.nextBtnLightTxt : styles.nextBtnDarkTxt}>Next</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    getBibleVerse()
  }, [])

  return (
    <SafeAreaView style={isDark ? styles.containerDark : styles.containerLight}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          <View style={styles.toggleBtn}>
            <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDark}
            />
            <Text style={isDark ? {color:'#fff'} : {color:'#000'}}>{isDark ? 'Dark Mode': 'Light Mode'}</Text>
          </View>
          <View style={styles.content}>
            <Image style={styles.logo} source={isDark ? LogoDark : LogoWhite} resizeMode='contain' />

            <Text style={!isDark ? styles.titleLight : styles.titleDark}>
              {data[0]?.bookname} {data[0]?.chapter}:{data[0]?.verse}
            </Text>

            <Text style={!isDark ? styles.bodyLight : styles.bodyDark}>{data[0]?.text}</Text>
            
            <NextBtn />
          </View>
        </>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  titleLight: {
    color: '#000',
    fontSize: 25,
    paddingBottom: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  titleDark: {
    color: '#fff',
    fontSize: 25,
    paddingBottom: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 2
  },
  bodyLight: {
    color: '#000',
    fontSize: 25,
    fontWeight: '300',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 20
  },
  bodyDark: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '300',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 20
  },
  toggleBtn: {
    position: 'absolute',
    marginTop: 30,
    top: 0,
    right: 0,
    marginEnd: 20
  },
  logo: {
    width: 100,
  },
  nextBtnLight : {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1
  },
  nextBtnDark : {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  nextBtnLightTxt: {
    color: '#000'
  },
  nextBtnDarkTxt: {
    color: '#fff'
  }
});
