import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

export function getUserdata(id) {
    return dispatch => {
           firebase.firestore().collection('users').doc(id).get()
           .then((res) =>{
              dispatch({
                    type: "USERDATA",
                    payload: res.data()
                })
           })
           .catch((err) =>{
            return err
           })
    }

}