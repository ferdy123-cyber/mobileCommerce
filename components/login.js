import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import firebase, {database, storage} from './config/firebaseConfig';
import {getProfil, getCart} from './reducer/action';

const Login = ({navigation, getLogin, getUid, getProfil, getCart}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const getUserData = async () => {
    try {
      const islogin = await AsyncStorage.getItem('isLogin');
      const uid = await AsyncStorage.getItem('userId');
      getLogin(islogin);
      getUid(uid);
      getProfil(uid);
      getCart(uid);
    } catch (error) {
      console.log(error);
    }
  };
  const submit = data => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        AsyncStorage.setItem('isLogin', 'true')
          .then(cb => {
            // console.log(cb);
          })
          .catch(err => console.log(err));
        AsyncStorage.setItem('userId', user.uid)
          .then(cb => {
            // console.log(cb);
            getUserData();
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode, errorMessage);

        setLoading(false);
      });
  };
  const toRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={style.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          letterSpacing: 2,
          color: '#24ad7d',
          marginBottom: 30,
        }}>
        LOGIN
      </Text>
      <View style={style.registerBox}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          type="text"
          style={style.input}
          placeholder="Email..."
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          type="password"
          secureTextEntry={true}
          style={style.input}
          placeholder="Password..."
        />
        {loading === false && (
          <TouchableOpacity
            onPress={() =>
              submit({
                email: email,
                password: password,
              })
            }
            activeOpacity={false}>
            <View style={style.submit}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '700',
                  letterSpacing: 1,
                  opacity: 0.9,
                }}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {loading === true && (
          <View style={style.submit}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 1,
                opacity: 0.9,
              }}>
              Loading...
            </Text>
          </View>
        )}
        <View
          style={{
            height: 80,
            width: '95%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            Belum punya akun?
          </Text>
          <TouchableOpacity onPress={() => toRegister()}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#24ad7d'}}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBox: {
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 60,
    width: '93%',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#24ad7d',
    padding: 10,
    marginRight: 8,
    elevation: 5,
    borderColor: '#24ad7d',
    borderWidth: 1,
    marginBottom: 15,
  },
  submit: {
    backgroundColor: '#24ad7d',
    height: 60,
    width: 300,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    elevation: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
});

const stateReducer = state => {
  return {};
};

const dispatchReducer = dispatch => ({
  getLogin: data =>
    dispatch({
      type: 'isLogin',
      value: data,
    }),
  getUid: data =>
    dispatch({
      type: 'userId',
      value: data,
    }),
  getProfil: id => dispatch(getProfil(id)),
  getCart: id => dispatch(getCart(id)),
});

export default connect(stateReducer, dispatchReducer)(Login);
