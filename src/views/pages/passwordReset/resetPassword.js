/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  // CButton,
  CCard,
  CCardBody,
  // CCardGroup,
  CCol,
  CContainer,
  CForm,
  // CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  // CToaster,
  // CToast
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import baseUrl from '../../../config/config'
// import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import auth from '../../../auth'

const Login = ({ match }) => {
  const [pass, setPass] = useState(null)
  const [passConf, setPassConf] = useState(null)
  const history = useHistory()

  let myData = JSON.stringify({
    password: pass,
    passwordConfirm: passConf,
  })

  const changePassword = async (e) => {
    e.preventDefault()
    const resetDa = await fetch(`${baseUrl}/api/v1/auth/resetPassword/${match.params.id}`, {
      method: 'POST',
      body: myData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resetDa.json()
    if (data.status === 'success') {
      toast('Password Reset Successful')
	  setTimeout(()=> history.push('/login'),3000)
     
    } else {
      if (data.status === 'fail') {
        return toast(data.message ? data.message : '')
      }
    }
  
  }

  // <Toster body={resValue.resBody}/>
  return (
 
	<div className="d-flex justify-content-center align-items-center" style={{width:"100vw",height:"100vh",alignItem:"center"}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard>
              <CCardBody>
                <CForm>
                  <h1>Reset Password</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>

                    <input
                      type="password"
                      className="form-control"
                      id="inlineFormInputGroupUsername1"
                      placeholder="Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>

                    <input
                      type="password"
                      className="form-control"
                      id="inlineFormInputGroupUsername3"
                      placeholder="PasswordConfirm"
                      onChange={(e) => setPassConf(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <button className="btn btn-primary px-4" onClick={(e) => changePassword(e)}>
                        Submit
                      </button>
                    </CCol>
                  </CRow>
				  
                </CForm>
				 <ToastContainer />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
       
      </CContainer>
    </div>

  )
}

export default Login
