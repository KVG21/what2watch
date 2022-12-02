import { View, Text, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react'
import styles from '../../styles/descScreens'
import Icon from "react-native-vector-icons/Ionicons";
import WebView from "react-native-webview"
import { FAVOURITES, addDoc, collection, firestore, getAuth } from '../../firebase';


export default function MovieDescriptionScreen({route}) {

    const {item} = route.params;
    const [isAnonymous, setIsAnoymoys ] = useState(true);

    useEffect(() => {
      const auth = getAuth()
        if(auth.currentUser === null) {
          setIsAnoymoys(false)
        }
    })
    
    const handleFavoriteAdd= async(item) => {
      const uid = getAuth()
        const docRef = await addDoc(collection (firestore,FAVOURITES),{
              uid: uid.currentUser.uid,
              Photo: item.Photo,
              Description : item.Description,
              Director: item.Director,
              Genre : item.Genre,
              PgR : item.PgR,
              Rating : item.Rating,
              Stars : item.Stars,
              Time : item.Time,
              Title : item.Title,

        }).catch(error => console.log(error))
    }

  return (
    <>
    {item.map((item, key) => {
        return (
            <View style = { styles.container} key = {key}>
                <Text style = {styles.title}>{item.Title}</Text>

                <View style = { styles.timeCont}>
                  <Icon name='time' style = {styles.timeIcon}></Icon>
                  <Text style = {styles.time}>{item.Time}</Text>
                </View>

                <WebView 
                allowsFullscreenVideo={true}
                scrollEnabled={false}
                bounces={false}
                source={{uri: item.Trailer}}
                style={styles.webview}/>

                <View style = {styles.iconRow}>
                  <Icon name='eye' style = {styles.icon}></Icon>
                  <Text style = {styles.descText}>{item.PgR}</Text>

                  <Icon name='star' style={styles.icon}></Icon>
                  <Text style = {styles.descText}>{item.Rating}</Text>

                  <Icon name='albums' style = {styles.icon}></Icon>
                  <Text style = {styles.descText}>{item.Genre}</Text>

                {isAnonymous ? (<>
                  <TouchableOpacity
                      onPress={() => handleFavoriteAdd(item)}>
                    
                    <Text style = {styles.descText}><Icon name='heart' style = {styles.icon}></Icon></Text>
                  </TouchableOpacity>
                </>) : (<></>)}   
                </View>

                <Text style = {styles.descDir}>Director : {item.Director}</Text>
                <Text style = {styles.descStars}>Stars : {item.Stars}</Text>

                <View style = { styles.descBox}>
                <Text style = {styles.textDesc}>Desc : {item.Description}</Text>
                </View>
            </View>
        )
    })}
    </>
  )
}