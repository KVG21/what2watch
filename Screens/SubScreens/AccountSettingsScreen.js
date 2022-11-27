import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/homescreen'
import UnderlineTextbox from '../../materialComponents/UnderlineTextbox'
import {getAuth, updatePassword, sendPasswordResetEmail, deleteUser} from '../../firebase'

export default function AccountSettingsScreen() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const auth = getAuth()
  const uid = uid;
  let creationTime = auth.currentUser.metadata.creationTime
  const user = auth.currentUser

  const updatePassword = () => {
    sendPasswordResetEmail(getAuth(), email)
    .then(() => {
      alert("Password reset email sent")
    }).catch(error => alert(error.message))
  }
  //delete user toimii vain osalla tällä hetkellä
  const deleteUser = () => {
      deleteUser(user).then(() => {
        navigation.replace("Signup")
      }).catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}
    behavior="padding">
      <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>{auth.currentUser?.email}</Text>
          {/*<Text style={styles.buttonText}>{auth.currentUser?.uid}</Text>*/}
          <Text style={styles.buttonText}>Creation time: {creationTime}</Text>
        </TouchableOpacity>

        <UnderlineTextbox
        setEmail = { setEmail }
        email = { email }
        style={styles.underlineTextbox}/>
        <TouchableOpacity
          onPress={updatePassword}
          style={styles.button}>
          <Text style={styles.buttonText}>Reset via email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={deleteUser}
          style={styles.button}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
</View>

  )
}
