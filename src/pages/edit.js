import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { checkLogin } from '../action/auth'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { database } from '../services/firebase'
import Header from '../components/Header'

// class EditProfile extends React.Component {
//     state = {};

//     componentDidMount() {
//         getAuthUser
//     }

//     render() {
//         return <div>EditProfile</div>
//     }
// }

// const styles = theme => ({
//     root: {
//         width: "auto",
//         display: "block",
//         margonLeft:
//     }
// }

// )

const Edit = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    country: '',
    handphone: '',
    accountNumber: '',
    score: '',
    photoUrl: ''
  })
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState('Update Profile')
  const [image, setImage] = useState('')
  const [isUploadPhoto, setIsUploadPhoto] = useState(false)

  const handleChange = (event) => {
    const inputs = { [event.target.name]: event.target.value }
    setData({ ...data, ...inputs })
  }

  const handleSubmit = () => {
    const uid = localStorage.getItem('uid')
    setEditing('processing ...')
    console.log(data)
    const timeout = 5000
    setTimeout(async () => {
      const update = await updateDoc(doc(database, 'users', uid), data)
        .then(alert('Update success.'))
      setEditing('Done')
      window.location = '/profile'
    }, timeout)
  }

  const updatePhoto = async (e) => {
    const uploadData = new FormData()
    uploadData.append('file', image)
    uploadData.append('upload_preset', 'photoProfile')
    uploadData.append('cloud_name', 'dqbjpvdhk')

    fetch('https://api.cloudinary.com/v1_1/dqbjpvdhk/image/upload', {
      method: 'post',
      body: uploadData
    }).then((res) => res.json()).then((uploadData) => {
      console.log(uploadData)
      let updatedValue = {}
      updatedValue = { photoUrl: uploadData.url }
      setData(data => ({
        ...data,
        ...updatedValue
      }))
      setIsUploadPhoto(true)
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    checkLogin()
    const uid = localStorage.getItem('uid')
    getDoc(doc(database, 'users', uid))
      .then(docSnap => {
        if (docSnap.exists()) {
          // console.log(docSnap.data())
          setData({
            ...data, ...docSnap.data()
          })
          setLoading(false)
        } else {
          console.log('No such document!')
        }
      })
  }, [])

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
        <>
        <Header />
        <div className="container rounded bg-white mt-5">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" src={data.photoUrl} width={90} alt="profile"/>
                <span className="font-weight-bold">{data.username}</span>
                <span className="text-black-50">{data.email}</span><span>SCORE = {data.score}</span>
                <input type='file' accept='.jpg,.png' placeholder='Upload your profile picture' onChange={(e) => setImage(e.target.files[0])}/>
                {isUploadPhoto
                  ? <p style={{ color: 'green', fontWeight: 'bold' }}>Uploaded</p>
                  : <button onClick={(e) => updatePhoto(e)}>Upload</button>
                }
              </div>
            </div>
            <div className="col-md-8">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                  <a href={'/home'}>
                      <button className="btn .btn-back{background-color:#682773}">
                      <span className="relative text-black text-sm md:text-md group-hover:text-white">
                          Back to home
                      </span>
                      </button>
                  </a>
                    {/* <a href="/home" className="text-black">Back to home</a> */}
                  </div>
                  {/* <h6 className="text-right">Edit Profile</h6> */}
                </div>
                <div className="row mt-2">
                  <div className="col-md-6"><input type="text" className="form-control" placeholder="First name" defaultValue={data.name} name="firstName" onChange={event => handleChange(event)}/></div>
                  <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.lastName} placeholder="Last Name" name="lastName" onChange={event => handleChange(event)}/></div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6"><input type="text" className="form-control" placeholder="Username" defaultValue={data.username} name="username" onChange={event => handleChange(event)}/></div>
                  <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.email} placeholder="Email" name="email" onChange={event => handleChange(event)}/></div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6"><input type="text" className="form-control" placeholder="Address" defaultValue={data.address} name="address" onChange={event => handleChange(event)}/></div>
                  <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.country} placeholder="Country" name="country" onChange={event => handleChange(event)}/></div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6"><input type="text" className="form-control" placeholder="Handphone" defaultValue={data.handphone} name="handphone" onChange={event => handleChange(event)}/></div>
                  <div className="col-md-6"><input type="text" className="form-control" defaultValue={data.accountNumber} placeholder="Account Number" name="accountNumber" onChange={event => handleChange(event)}/></div>
                </div>
                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button" onClick={handleSubmit}>{editing}</button></div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default Edit
