import {Button, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {getdata, getDataById, getTransaction} from './reducer/action';
import {connect} from 'react-redux';

const Home = ({
  navigation,
  data,
  getdata,
  getDataById,
  cart,
  getTransaction,
  profil,
}) => {
  useEffect(() => {
    getdata();
  }, []);

  const [cari, setCari] = useState('');

  const toDetail = id => {
    getDataById(id);
    navigation.navigate('Detail');
    setCari('');
  };

  const toCart = () => {
    navigation.navigate('Keranjang');
  };

  const toTransaction = () => {
    getTransaction(profil.id);
    navigation.navigate('Riwayat pembelian');
  };

  const toAccount = () => {
    navigation.navigate('Account');
  };

  const cartValue = cart.map(e => e.jml).reduce((a, b) => a + b, 0);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          height: 140,
          backgroundColor: '#24ad7d',
          paddingTop: 20,
          position: 'absolute',
          top: 0,
          zIndex: 2,
          width: '100%',
        }}>
        <TextInput
          type="text"
          style={{
            backgroundColor: 'white',
            height: 50,
            width: '53%',
            borderRadius: 5,
            fontSize: 16,
            padding: 10,
            marginRight: 8,
          }}
          value={cari}
          onChangeText={setCari}
          placeholder="Cari barang..."
        />
        <TouchableOpacity
          onPress={() => toCart()}
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 50,
            width: 50,
            borderRadius: 5,
            alignItems: 'center',
            marginRight: 8,
            position: 'relative',
          }}>
          {cart.length !== 0 && (
            <View
              style={{
                width: 17,
                height: 17,
                backgroundColor: 'red',
                position: 'absolute',
                right: 5,
                top: 7,
                borderRadius: 8.5,
                opacity: 1,
                elevation: 5,
                zIndex: 99,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 11, fontWeight: '700', color: 'white'}}>
                {cartValue}
              </Text>
            </View>
          )}
          <Image
            style={{width: '50%', height: '50%', opacity: 0.6}}
            source={require('../assets/image/shopping-cart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toTransaction()}
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 50,
            width: 50,
            borderRadius: 5,
            alignItems: 'center',
            marginRight: 8,
          }}>
          <Image
            style={{width: '50%', height: '50%', opacity: 0.6}}
            source={require('../assets/image/bell-ring.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toAccount()}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: 'white',
              height: 50,
              width: 50,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Image
              style={{width: '50%', height: '50%', opacity: 0.6}}
              source={require('../assets/image/user.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: 80,
          position: 'absolute',
          top: 100,
          width: '100%',
          zIndex: 2,
        }}>
        <TouchableOpacity
          style={style.categoryBox}
          onPress={() => setCari('handphone')}>
          <Image
            style={{
              opacity: 1,
              width: 75,
              height: 75,
              resizeMode: 'contain',
            }}
            source={require('../assets/image/handphone.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.categoryBox}
          onPress={() => setCari('laptop')}>
          <Image
            style={{
              opacity: 1,
              width: 75,
              height: 75,
              resizeMode: 'contain',
            }}
            source={require('../assets/image/laptop.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.categoryBox}
          onPress={() => setCari('monitor')}>
          <Image
            style={{
              opacity: 1,
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
            source={require('../assets/image/desktop-computer.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.categoryBox}
          onPress={() => setCari('komputer')}>
          <Image
            style={{
              opacity: 1,
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
            source={require('../assets/image/computer.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 20,
          paddingTop: 180,
        }}>
        <FlatGrid
          itemDimension={130}
          data={data.filter(e => {
            if (cari === '') {
              return e;
            } else {
              return (
                e.name.toLowerCase().includes(cari.toLowerCase()) ||
                e.type.toLowerCase().includes(cari.toLowerCase())
              );
            }
          })}
          renderItem={({item}) => (
            <>
              <View style={style.listProduct}>
                <Image
                  style={{
                    opacity: 1,
                    width: '100%',
                    height: 170,
                    resizeMode: 'contain',
                  }}
                  source={{uri: item.image}}
                />
                <View
                  style={{paddingLeft: 10, paddingRight: 10, paddingTop: 0}}>
                  <Text
                    style={{
                      textAlign: 'left',
                      paddingTop: 5,
                      height: 56,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{paddingLeft: 10, paddingRight: 10, paddingTop: 0}}>
                  <Text
                    style={{
                      marginTop: 10,
                      textAlign: 'left',
                      paddingTop: 5,
                      paddingBottom: 10,
                      maxHeight: 56,
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    Rp
                    {item.price
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
              <View style={style.buttonListProduct}>
                <Button
                  onPress={() => toDetail(item.id)}
                  title="Detail"
                  color="#24ad7d"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  categoryBox: {
    borderRadius: 8,
    backgroundColor: '#bdbdbd',
    width: 80,
    height: 80,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listProduct: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
  },
  buttonListProduct: {
    marginTop: 3,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    elevation: 5,
    overflow: 'hidden',
  },
});

const stateReducer = state => {
  return {
    data: state.data,
    profil: state.profil,
    userId: state.userId,
    cart: state.cart,
  };
};

const dispatchReducer = dispatch => ({
  getdata: () => dispatch(getdata()),
  getDataById: id => dispatch(getDataById(id)),
  getTransaction: id => dispatch(getTransaction(id)),
});

export default connect(stateReducer, dispatchReducer)(Home);
