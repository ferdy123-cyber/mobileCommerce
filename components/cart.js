import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {deleteCart, addTransaction} from './reducer/action';

const Cart = ({profil, cart, addTransaction, navigation}) => {
  const submit = async data => {
    await addTransaction(data);
    navigation.navigate('Payment');
  };
  const total = cart.map(e => e.price).reduce((a, b) => a + b, 0);
  return (
    <>
      {cart.length === 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '90%',
          }}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            Keranjang kosong
          </Text>
        </View>
      )}
      {cart.length !== 0 && (
        <ScrollView style={style.container}>
          {cart.map(e => {
            return (
              <View key={e.id} style={style.listCart}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      opacity: 1,
                      width: 100,
                      height: 100,
                      marginTop: 5,
                      resizeMode: 'contain',
                    }}
                    source={{uri: e.image}}
                  />
                  <View style={{padding: 5, width: 290, paddingLeft: 10}}>
                    <Text style={{fontWeight: '500'}}>
                      {e.name} x {e.jml}
                    </Text>
                    <Text
                      style={{fontWeight: '700', fontSize: 16, marginTop: 10}}>
                      Rp
                      {e.price
                        .toString()
                        .split('')
                        .reverse()
                        .join('')
                        .match(/\d{1,3}/g)
                        .join('.')
                        .split('')
                        .reverse()
                        .join('')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    paddingRight: 15,
                    paddingBottom: 5,
                    marginTop: -5,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      deleteCart({
                        userId: profil.id,
                        cartId: e.id,
                        productId: e.productId,
                        jml: e.jml,
                        qty: e.qty,
                      })
                    }
                    style={{
                      width: 70,
                      height: 33,
                      backgroundColor: '#ff7676',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontWeight: '600', color: 'white', opacity: 0.9}}>
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      {cart.length !== 0 && (
        <View
          style={{
            height: 80,
            elevation: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: '400'}}>Total : </Text>
            <Text style={{fontSize: 18, fontWeight: '500', marginTop: 5}}>
              Rp
              {total
                .toString()
                .split('')
                .reverse()
                .join('')
                .match(/\d{1,3}/g)
                .join('.')
                .split('')
                .reverse()
                .join('')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              submit({
                cart: cart,
                uid: profil.id,
              })
            }
            style={{
              width: 110,
              height: 50,
              backgroundColor: '#24ad7d',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Bayar</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  listCart: {
    minHeight: 150,
    marginBottom: 8,
    padding: 5,
    elevation: 0.3,
    backgroundColor: 'white',
  },
});

const stateReducer = state => {
  return {
    profil: state.profil,
    cart: state.cart,
  };
};

const dispatchReducer = dispatch => ({
  addTransaction: data => dispatch(addTransaction(data)),
});

export default connect(stateReducer, dispatchReducer)(Cart);
