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

export default class Login extends Component{
  state = {
    email: '',
    password: ''
  }
  Login = async () => {
    const { email, password } = this.state;
    const params = { email, password };
    try {
      this.setState({ isLoading: true });
      console.log({ params });
      const result = await ENDPOINT.login(params);
      console.log({ result });
      if (result.expires_in === 3600) {
        Actions.home();
      } else {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('network error', ToastAndroid.SHORT);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  Register = () => {
      Actions.register();
    };  
render(){
return(
  <View
    behavior="padding"
    style={styles.Wrapper}>
    
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
        <View style={{height: 50, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> Login </Text>
        </View>
        </TouchableOpacity>

    <TouchableOpacity onPress={() => this.Register()}>
        <Text style={{color:'white', marginTop: 25}}> Register </Text>
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