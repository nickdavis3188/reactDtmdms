/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CInputGroup,
  CFormLabel,
  CFormText,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import baseUrl from '../../../config/config'

//
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import auth from '../../../auth'

const Login = () => {
  const [email, setemail] = useState('')

  let myData = JSON.stringify({
    email: email,
    host: `${window.location.host}/resetPassword`,
  })

  const sendEmail = (e) => {
    e.preventDefault()
    fetch(`${baseUrl}/api/v1/auth/forgotPassword`, {
      method: 'POST',
      body: myData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          toast(data.message ? data.message : '')
        } else {
          if (data) {
            if (data.status === 'fail') {
              return toast(data.message ? data.message : '')
            }
          }
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err)
          alert(err)
        }
      })
  }
// <div className="c-app c-default-layout flex-row align-items-center">
  return (
   <div className="d-flex justify-content-center align-items-center" style={{width:"100vw",height:"100vh",alignItem:"center"}}>
	
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard>
              <CCardBody>
                <CForm>
                  <h1>Forgot Password</h1>
                  <CInputGroup row>
                    <CCol md="1">
                      <CFormLabel htmlFor="hf-Email">Email</CFormLabel>
                    </CCol>
                    <CCol md="13">
                      <input
                        type="email"
                        value={email}
                        className="form-control"
                        id="hf-Email"
                        placeholder="Enter Email..."
                        onChange={(e) => setemail(e.target.value)}
                      />
                      <CFormText className="help-block">Please enter your Email</CFormText>
                    </CCol>
                  </CInputGroup>
                </CForm>
              </CCardBody>
            </CCard>
            <CCardFooter>
              <button type="button" className="btn btn-primary" onClick={(e) => sendEmail(e)}>
                <CIcon name="cil-scrubber" />
                submit
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => {
                  setemail('')
                }}
              >
                <CIcon name="cil-ban" /> Reset
              </button>
              <ToastContainer />
            </CCardFooter>
            <ToastContainer />
          </CCol>
        </CRow>
      </CContainer>
   
	</div>
  )
}

export default Login
