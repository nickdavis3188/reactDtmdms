/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCardFooter,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

// import CIcon from '@coreui/icons-react'
// import axios from 'axios';
import baseUrl from '../../../config/config'
import { Redirect, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaMale} from "react-icons/fa"
const Register = () => {
  let formdata = new FormData()
  const [inputUserName, setUserName] = useState(null)
  const [inputEmail, setEmails] = useState(null)
  const [inputPassword, setPassword] = useState(null)
  const [inputPasswordConfirm, setPasswordConfirm] = useState(null)
  const [file, setFile] = useState(null)

  const [resValues, setResValues] = useState({
    status: '',
    body: '',
  })

  formdata.append('fullName', inputUserName)
  formdata.append('email', inputEmail)
  formdata.append('password', inputPassword)
  formdata.append('passwordConfirm', inputPasswordConfirm)
  formdata.append('adminImg', file)

  const submitForm = (e) => {
    e.preventDefault()
    fetch(`${baseUrl}/api/v1/auth/signup`, {
      method: 'POST',
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.status === 'success') {
            setResValues({ status: data.status, body: 'Registration successfull' })
            return toast('Registration successful')
          } else {
            if (data.message) {
              return toast(data.message)
            } else {
              if (data.data.message) {
                return toast(data.data.message)
              }
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
  const resCheack =
    resValues.status === 'success' ? (
      <Switch>
        <Redirect from="/signup" to="/login" />
      </Switch>
    ) : (
      ''
    )
  //{/* */}
  return (
 
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroupUsername2"
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <input
                        type="email"
                        className="form-control"
                        id="inlineFormInputGroupUsername1"
                        placeholder="Email"
                        onChange={(e) => setEmails(e.target.value)}
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                        type="password"
                        className="form-control"
                        id="inlineFormInputGroupUsername3"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                   <input
                        type="password"
                        className="form-control"
                        id="inlineFormInputGroupUsername4"
                        placeholder="Confirm Password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                  </CInputGroup>
				  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <FaMale /> 
                    </CInputGroupText>
                   <input
                        type="file"
                        className="form-control"
                        id="inlineFormInputGroupUsername4"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                  </CInputGroup>
                  <div className="d-grid">
                     <button type="submit" className="btn btn-secondary btn-lg btn-block">
                    Submit
                  </button>
                  {resCheack}
                  </div>
                </CForm>
				 <ToastContainer />
              </CCardBody>
			  <CCardFooter className="p-4">
                <p>
                  If you have an account <a href="/login">SingIn</a>
                </p>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}


export default Register
