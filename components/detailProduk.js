import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import NumericInput from 'react-native-numeric-input';
import {addToCart} from './reducer/action';

const DetailProduk = ({
  detailData,
  profil,
  navigation,
  addToCart,
  loadingCart,
  productId,
}) => {
  const [jumlah, setJumlah] = useState(1);
  const submit = async data => {
    if (jumlah < 1) {
      alert('Minimal pemesanan barang adalah satu buah');
    } else if (jumlah > detailData.qty) {
      alert('Stock tidak tersedia');
    } else {
      await addToCart(data);
      navigation.navigate('Keranjang');
    }
  };
  return (
    <>
      <ScrollView style={style.container}>
        <TouchableOpacity onPress={() => alert('ok')} style={style.header}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={{uri: detailData.image}}
          />
        </TouchableOpacity>
        <View style={{padding: 10}}>
          <Text style={style.price}>
            Rp
            {detailData.price
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
          <Text style={style.title}>{detailData.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.descriptionTitle}>Stock : {detailData.qty}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500'}}>Jumlah : </Text>

              <NumericInput
                value={jumlah}
                type="plus-minus"
                onChange={e => setJumlah(e)}
                rounded
              />
            </View>
          </View>
          <Text style={style.descriptionTitle}>Deskripsi</Text>
          <Text style={style.description}>{detailData.description}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          height: 85,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          elevation: 10,
        }}>
        {loadingCart === false && (
          <TouchableOpacity
            onPress={() =>
              submit({
                name: detailData.name,
                price: detailData.price * jumlah,
                jml: jumlah,
                image: detailData.image,
                uid: profil.id,
                productId: productId,
                qty: detailData.qty,
              })
            }
            style={style.cartButton}>
            <Text style={{color: 'white', fontSize: 20}}>Tambah keranjang</Text>
          </TouchableOpacity>
        )}
        {loadingCart === true && (
          <View style={style.cartButton}>
            <Text style={{color: 'white', fontSize: 20}}>Loading...</Text>
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 360,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '600',
    overflow: 'scroll',
  },
  description: {
    fontSize: 15,
  },
  cartButton: {
    height: 60,
    backgroundColor: '#24ad7d',
    width: 320,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stateReducer = state => {
  return {
    detailData: state.detailData,
    profil: state.profil,
    loadingCart: state.loadingCart,
    productId: state.productId,
  };
};

const dispatchReducer = dispatch => ({
  addToCart: data => dispatch(addToCart(data)),
});

export default connect(stateReducer, dispatchReducer)(DetailProduk);
