import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = ({getLogin, getUid, profil}) => {
  const getUserData = async () => {
    try {
      const islogin = await AsyncStorage.getItem('isLogin');
      const uid = await AsyncStorage.getItem('userId');
      getLogin(islogin);
      getUid(uid);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.setItem('userId', '');
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{justifyContent: 'center', height: '100%', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 10}}>
        {profil.username}
      </Text>
      <Text style={{fontSize: 18, fontWeight: '500'}}>{profil.email}</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            marginTop: 10,
            color: 'red',
            opacity: 0.8,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const stateReducer = state => {
  return {
    userId: state.userId,
    isLogin: state.isLogin,
    profil: state.profil,
  };
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
});

export default connect(stateReducer, dispatchReducer)(Account);
