import React, { Component } from 'react';
import {Text,
  View,
  Image,
  ImageBackground,
  alert,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {ENDPOINT, STORAGE_KEY} from '../Services/index';
import axios from 'axios';
import storage from '../Services/storage';

export default class Register extends Component{
  state = {
    name: '',
    email: '',
    password: ''
  }
  Login = async () => {
    const { name, email, password } = this.state;
    const params = { name, email, password };
    try {
      this.setState({ isLoading: true });
      console.log({ params });
      const result = await ENDPOINT.register(params);
      console.log({ result });
      if (result.expires_in === 3600) {
        ToastAndroid.show('Your Account has Registered', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('network error', ToastAndroid.SHORT);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  LogedIn = () => {
      Actions.login();
    };  

render(){
return(
  <View
    behavior="padding"
    style={styles.Wrapper}>
    <TextInput
      placeholder='name'
      underlineColorAndroid='white'
      placeholderTextColor='white'
      editable
      onChangeText={name => this.setState({ name })}            
      style={styles.inputField}/>

    <TextInput
      placeholder='email'
      underlineColorAndroid='white'
      placeholderTextColor='white'
      keyboardType='email-address'
      editable
      onChangeText={email => this.setState({ email })}            
      style={styles.inputField}/>
    
    <TextInput
      placeholder='password'
      underlineColorAndroid='white'
      placeholderTextColor='white'
      secureTextEntry={true}
      editable
      onChangeText={password => this.setState({ password })}
      style={styles.inputField}/>

    <TouchableOpacity onPress={() => this.Login()}>
        <View style={{height: 50, backgroundColor:
        'purple',justifyContent: 'center',
        alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> 
          Register </Text>
        </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.LogedIn()}>
        <Text style={{color:'white', marginTop: 25}}> Kembali </Text>
    </TouchableOpacity>
  </View>
)
}
}
const styles = StyleSheet.create({
inputField: {
  width: 280,
  color: 'white',
  borderColor: 'white',
  marginTop: 5
},
Wrapper : {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1F3A93'
},
text :{
  color: 'blue',
  fontSize: 23
}
});