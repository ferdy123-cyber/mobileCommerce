import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Payment = ({navigation}) => {
  const toTransaction = () => {
    navigation.navigate('Home');
  };
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Text style={{fontSize: 22, fontWeight: '600', marginBottom: 15}}>
        Pembelian berhasil
      </Text>
      <Text style={{textAlign: 'center', padding: 5, fontSize: 16}}>
        Untuk melihat riwayat transaksi, anda bisa masuk ke halaman transaksi,
        selanjutnya anda tinggal menunggu barang sampai ke rumah anda
      </Text>
      <TouchableOpacity
        onPress={() => toTransaction()}
        style={{
          backgroundColor: '#24ad7d',
          width: 90,
          height: 50,
          marginTop: 15,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>Beranda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
