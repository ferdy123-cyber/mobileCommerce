import {Image, Text, View} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const Transaction = ({transaction}) => {
  return (
    <ScrollView>
      {transaction.map(e => {
        const total = e.items
          .map(price => price.price)
          .reduce((a, b) => a + b, 0);
        return (
          <View
            key={e.id}
            style={{
              backgroundColor: 'white',
              marginTop: 10,
              elevation: 5,
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 15,
                marginLeft: 5,
              }}>
              {e.time}
            </Text>
            {e.items.map(val => {
              return (
                <View
                  key={val.id}
                  style={{
                    marginBottom: 8,
                    flexDirection: 'row',
                    padding: 3,
                  }}>
                  <Image
                    style={{
                      opacity: 1,
                      width: 120,
                      height: 120,
                      resizeMode: 'contain',
                    }}
                    source={{uri: val.image}}
                  />
                  <View style={{paddingLeft: 5}}>
                    <Text
                      style={{
                        width: 250,
                        fontWeight: '500',
                        marginBottom: 5,
                        fontSize: 15,
                      }}>
                      {val.name}
                    </Text>
                    <Text style={{fontWeight: '500'}}>Jumlah : {val.jml}</Text>
                    <Text style={{fontWeight: '500'}}>
                      Total harga : Rp
                      {val.price
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
              );
            })}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 17, fontWeight: '700', color: '#24ad7d'}}>
                RP{' '}
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
              <Text style={{fontSize: 17, fontWeight: '700', color: '#24ad7d'}}>
                LUNAS
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const stateReducer = state => {
  return {
    transaction: state.transaction,
  };
};

const dispatchReducer = dispatch => ({});

export default connect(stateReducer, dispatchReducer)(Transaction);
