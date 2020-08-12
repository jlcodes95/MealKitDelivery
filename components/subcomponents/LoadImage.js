import firebase from '../../Firebase'

const storage = firebase.storage()

export const LoadImage = async (photo) => {
  return await storage.ref(photo).getDownloadURL()
}
