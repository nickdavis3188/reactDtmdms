/* eslint-disable prettier/prettier */
import React,{useState} from 'react';

import {
  CCardHeader,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormLabel
} from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import axios from 'axios';
import baseUrl from '../../../config/config'

import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const InviteAdmin = () => {
  let formdata = new FormData()
    const [inputUserName,setUserName] = useState(null)
    const [inputEmail,setEmails] = useState(null)
    const [inputPassword,setPassword] = useState(null)
    const [inputPasswordConfirm,setPasswordConfirm] = useState(null)
    const [file,setFile] = useState(null)
    

   
  formdata.append('fullName',inputUserName)
  formdata.append('email',inputEmail)
  formdata.append('password',inputPassword)
  formdata.append('passwordConfirm',inputPasswordConfirm)
  formdata.append('adminImg',file)
  
    const submitForm = async (e)=>{
      e.preventDefault()
     const invitRes = await fetch(`${baseUrl}/api/v1/auth/inviteSignup`,{
        method: 'POST',
        body: formdata     
      })
	 const invitResData = await invitRes.json()
	  if(invitResData){
          if(invitResData.status === 'success'){
            return toast('Invite successful')
          }else{
            if(invitResData.message){
              return toast(invitResData.message)
            }else{
              if(invitResData.data.message){
                return toast(invitResData.data.message)
              }
            }
          }
       }
	}
  


  return (
    <div className="c-app c-default-layout flex-row align-items-center">  
      <CCard>
        <CCardHeader>
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
            <CForm className="row" onSubmit={(e)=>submitForm(e)}>
                  <h1>Sub-Admin Invitation</h1>
                  <CCol md={12}>
                    <CFormLabel htmlFor="hf-username">Username</CFormLabel>
                    <input
                    type="text"
                      className="form-control"
                      id="hf-username"
                        placeholder="Username"
                        onChange={(e)=> setUserName(e.target.value)}
                    />          
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <input
                    type="email"
                      className="form-control"
                      id="email"
                        placeholder="Email"
                        onChange={(e)=> setEmails(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="Password">Password</CFormLabel>
                    <input
                    type="password"
                      className="form-control"
                      id="Password"
                        placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="PasswordC">Confirm Password</CFormLabel>
                    <input
                    type="password"
                      className="form-control"
                      id="PasswordC"
                        placeholder="Confirm Password"
                        onChange={(e)=> setPasswordConfirm(e.target.value)}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="Pasport">Pasport</CFormLabel>
                    <input
                    type="file"
                      className="form-control"
                      id="Pasport"
                        onChange={(e)=>setFile(e.target.files[0])}
                    />
                  </CCol>
                  <button type="submit" className="btn btn-secondary btn-lg btn-block">Invite</button> 
                
              </CForm>
               
                <ToastContainer/>
        </CCardBody> 
      </CCard>
    </div>
  )
}

export default InviteAdmin 