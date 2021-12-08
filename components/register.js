import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import firebase, {database, storage} from './config/firebaseConfig';

const Register = ({navigation}) => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = data => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        console.log(user.email);
        return database.ref(`user/${user.uid}`).set(
          {
            username: data.username,
            email: user.email,
            avatar: '',
            id: user.uid,
          },
          error => {
            if (error) {
              console.log(error);
              setLoading(false);
              // The write failed...
            } else {
              console.log('ok');
              setLoading(false);
              navigation.navigate('Login');
              // Data saved successfully!
            }
          },
        );
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode, errorMessage);
        setLoading(false);
      });
  };
  const toLogin = () => {
    navigation.navigate('Login');
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
        REGISTER
      </Text>
      <View style={style.registerBox}>
        <TextInput
          value={username}
          onChangeText={setusername}
          type="text"
          style={style.input}
          placeholder="Username..."
        />
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
                username: username,
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
            Sudah punya akun?
          </Text>
          <TouchableOpacity onPress={() => toLogin()}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#24ad7d'}}>
              LOGIN
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
  },
});

const stateReducer = state => {
  return {};
};

const dispatchReducer = dispatch => ({});

export default connect(stateReducer, dispatchReducer)(Register);
