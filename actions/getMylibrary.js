import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

export function getMylibrary(id) {
    return async dispatch => {
           try {
                  let myLibrary =[];
                  let library = await firebase.firestore().collection('users').doc(id).collection('myLibrary').get()
                  console.log("library",library.size)
                  if(library.size>0){
                                await library.forEach((item) =>{
                                        myLibrary.push(item.data())
                                      })
                  }
                  console.log("myLibrary",myLibrary)
                                dispatch({
                                            type: "MYLIBRARY",
                                            payload: myLibrary
                                        })
                  return myLibrary

                }
                catch (err) {
                    console.log("Error", err)
                    return err
                }
    }

}