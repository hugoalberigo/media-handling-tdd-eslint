import { getAuth, signOut } from 'firebase/auth'

export const checkLogin = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const uid = localStorage.getItem('uid')
    // console.log(uid)
    if (uid === '') {
      console.log('blm login')
      window.location = '/login'
    } else {
      console.log('sdh login')
    }
  }
}

export const checkLogout = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const uid = localStorage.getItem('uid')
    // console.log(uid)
    if (uid === '') {
      console.log('sdh logout')
    } else {
      console.log('blm logout')
      window.location = '/home'
    }
  }
}

export const logOut = () => {
  const auth = getAuth()
  signOut(auth).then(() => {
    localStorage.setItem('uid', '')
    // Sign-out successful.
  }).catch((error) => {
    return console.log(error)
    // An error happened.
  })
}
