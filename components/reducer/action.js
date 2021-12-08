import firebase, {database, storage} from '../config/firebaseConfig';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import React from 'react';
import moment from 'moment';

export const setLogin = async value => {
  try {
    await AsyncStorage.setItem('isLogin', JSON.parse(value));
  } catch (error) {
    console.log(error);
  }
};

export const setUid = async value => {
  try {
    await AsyncStorage.setItem('userId', JSON.parse(value));
  } catch (error) {
    console.log(error);
  }
};

export const getdata = () => dispatch => {
  return database.ref(`/produk`).on('value', snapshot => {
    const data = [];
    if (snapshot.val() !== null) {
      Object.keys(snapshot.val()).map(e => {
        data.push({
          id: e,
          image: snapshot.val()[e].image,
          name: snapshot.val()[e].name,
          type: snapshot.val()[e].type,
          price: snapshot.val()[e].price,
          qty: snapshot.val()[e].qty,
          description: snapshot.val()[e].description,
          time: snapshot.val()[e].time,
        });
        return <div></div>;
      });
    }

    dispatch({
      type: 'get',
      value: data.reverse(),
    });
  });
};

export const getDataById = id => dispatch => {
  return database.ref(`/produk/${id}`).on('value', snapshot => {
    dispatch({
      type: 'getDetail',
      value: snapshot.val(),
    });
    dispatch({
      type: 'productId',
      value: id,
    });
  });
};

export const getProfil = id => dispatch => {
  return database.ref(`/user/${id}`).on('value', snapshot => {
    dispatch({
      type: 'getProfil',
      value: snapshot.val(),
    });
  });
};

export const addToCart = data => dispatch => {
  dispatch({
    type: 'setLoadingCart',
    value: true,
  });
  return database
    .ref(`/produk/${data.productId}/qty`)
    .set(data.qty - data.jml, error => {
      if (error) {
        console.log(error);
        dispatch({
          type: 'setLoadingCart',
          value: false,
        });
      } else {
        console.log('succes');
        return database.ref(`/cart/${data.uid}`).push(
          {
            image: data.image,
            jml: data.jml,
            price: data.price,
            uid: data.uid,
            name: data.name,
            productId: data.productId,
            qty: data.qty - data.jml,
          },
          error => {
            if (error) {
              console.log(error);
              // The write failed...

              dispatch({
                type: 'setLoadingCart',
                value: false,
              });
            } else {
              console.log('ok');
              dispatch({
                type: 'setLoadingCart',
                value: false,
              });
              // Data saved successfully!
            }
          },
        );
      }
    });
};

export const getCart = id => dispatch => {
  return database.ref(`/cart/${id}`).on('value', snapshot => {
    const cart = [];
    if (snapshot.val() !== null) {
      Object.keys(snapshot.val()).map(e => {
        cart.push({
          id: e,
          image: snapshot.val()[e].image,
          name: snapshot.val()[e].name,
          price: snapshot.val()[e].price,
          jml: snapshot.val()[e].jml,
          uid: snapshot.val()[e].uid,
          productId: snapshot.val()[e].productId,
          qty: snapshot.val()[e].qty,
        });
        return <div></div>;
      });
    }
    dispatch({
      type: 'getCart',
      value: cart.reverse(),
    });
  });
};

export const deleteCart = data => {
  return database
    .ref(`/produk/${data.productId}/qty`)
    .set(data.qty + data.jml, error => {
      if (error) {
        console.log(error);
      } else {
        console.log('succes');
        return database
          .ref(`/cart/${data.userId}/${data.cartId}`)
          .remove(error => {
            if (error) {
              console.log(error);
            } else {
              console.log('succes');
            }
          });
      }
    });
};

// export const minQty = data => {
//   return database
//     .ref(`/produk/${data.productId}/qty`)
//     .set(data.qty - data.jml, error => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('succes');
//       }
//     });
// };

export const addQty = data => {
  return database.ref(`/produk/${data.productId}/qty`).set('10', error => {
    if (error) {
      console.log(error);
    } else {
      console.log('succes');
    }
  });
};

export const deleteTransaction = id => {
  return database.ref(`/cart/${id}`).remove(error => {
    if (error) {
      console.log(error);
    } else {
      console.log('succes');
    }
  });
};

export const addTransaction = data => dispatch => {
  console.log(data);
  return database.ref(`/transaction/${data.uid}`).push(
    {
      product: data.cart,
      time: moment().format('LLL'),
    },
    error => {
      if (error) {
        console.log(error);
        // The write failed...

        dispatch({
          type: 'setLoadingCart',
          value: false,
        });
      } else {
        console.log('ok');
        deleteTransaction(data.uid);
        dispatch({
          type: 'setLoadingCart',
          value: false,
        });
        // Data saved successfully!
      }
    },
  );
};

export const getTransaction = id => dispatch => {
  console.log(id);
  return database.ref(`/transaction/${id}`).on('value', snapshot => {
    const transaction = [];
    if (snapshot.val() !== null) {
      Object.keys(snapshot.val()).map(e => {
        const product = [];
        if (snapshot.val()[e].product !== null) {
          Object.keys(
            snapshot.val()[e].product.map(val => {
              product.push(val);
            }),
          );
        }
        transaction.push({
          id: e,
          items: product,
          time: snapshot.val()[e].time,
        });
        return <div></div>;
      });
    }
    dispatch({
      type: 'getTransaction',
      value: transaction.reverse(),
    });
  });
};
