import config from './config';
import firebase from 'firebase'

let db = null;

export default {
  init: () => {
    firebase.initializeApp(config);
    db = firebase.database();
    return true;
  },
  
  get: async (name = '/') => {
    const snapshot = await db.ref(name).once('value');
    const val = snapshot.val();
    return Object.keys(val).map( v => val[v]);
    //return snapshot.val();
  },

  insert: async (name, item = null) => {
    var key = db.ref(name).push().key;
    await db.ref(`${name}/${key}`).set(item);
  },

  update: async (name, key, item = null) => {
    await db.ref(`${name}/${key}`).set(item);
  },

  delete: async (name, key = '') => {
    await db.ref(`${name}/${key}`).remove();
  }
}