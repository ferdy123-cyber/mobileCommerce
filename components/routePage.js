import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './home';
import DetailProduk from './detailProduk';
import Register from './register';
import Login from './login';
import Account from './acount';
import Cart from './cart';
import Transaction from './transaction';
import Payment from './paymentsuccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {getProfil, getCart, getTransaction} from './reducer/action';

const Stack = createStackNavigator();

const RoutePage = ({
  isLogin,
  userId,
  getLogin,
  getUid,
  getProfil,
  getCart,
  getTransaction,
}) => {
  const cekStorage = async () => {
    try {
      if ((await AsyncStorage.getItem('isLogin')) === null) {
        await AsyncStorage.setItem('isLogin', 'false');
      } else {
        console.log('ok');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = async () => {
    try {
      const islogin = await AsyncStorage.getItem('isLogin');
      const uid = await AsyncStorage.getItem('userId');
      getProfil(uid);
      getLogin(islogin);
      getUid(uid);
      getCart(uid);
      getTransaction(uid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cekStorage();
  }, []);
  useEffect(() => {
    getItem();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin === 'false' ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Detail"
              component={DetailProduk}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Keranjang" component={Cart} />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Riwayat pembelian" component={Transaction} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const stateReducer = state => {
  return {
    userId: state.userId,
    isLogin: state.isLogin,
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
  getProfil: id => dispatch(getProfil(id)),
  getCart: id => dispatch(getCart(id)),
  getTransaction: id => dispatch(getTransaction(id)),
});

export default connect(stateReducer, dispatchReducer)(RoutePage);
