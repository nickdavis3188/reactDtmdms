/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import {
  Redirect,
  Switch,
  // withRouter
} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import auth from '../../../auth'

const Login = () => {
  const [loginValue, setLoinValue] = useState({
    email: '',
    password: '',
  })
  const [resValue, setResValue] = useState({
    status: '',
    resBody: '',
  })

  useEffect(() => {
    async function loadfun() {
      let token = JSON.parse(localStorage.getItem('Token'))
      const reval = await fetch(`${baseUrl}/api/v1/auth/checklog`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      const data = await reval.json()
      if (data.status === 'success') {
        auth.login()
        setResValue({ status: 'success', resBody: 'Login successful' })
        return toast('User still active')
      } else {
        if (data.status === 'fail') {
          auth.logOut()
        } else {
          if (data.status === 'error') {
            auth.logOut()
          }
        }
      }
    }

    loadfun()
  }, [])

  let myData = JSON.stringify({
    email: loginValue.email,
    password: loginValue.password,
  })

  const loginApp = (e) => {
    e.preventDefault()

    fetch(`${baseUrl}/api/v1/auth//signin`, {
      method: 'POST',
      body: myData,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('errmessage1', data)
        if (data) {
          if (data.status === 'fail') {
            return toast(data.message ? data.message : '')
          }

          if (data.token) {
            let token = JSON.stringify(data.token)
            localStorage.setItem('Token', token)
            auth.login()
            setResValue({ status: 'success', resBody: 'Login successful' })
            return toast('Login successful')
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

  let actionFromRes =
    resValue.status === 'success' ? (
      <Switch>
        <Redirect from="/login" to="/dashboard" />
      </Switch>
    ) : (
      ''
    )

  // <Toster body={resValue.resBody}/>
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>

                      <input
                        type="email"
                        className="form-control"
                        id="inlineFormInputGroupUsername1"
                        placeholder="Email"
                        onChange={(e) => setLoinValue({ ...loginValue, email: e.target.value })}
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
                        placeholder="Password"
                        onChange={(e) => setLoinValue({ ...loginValue, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <button className="btn btn-primary px-4" onClick={(e) => loginApp(e)}>
                          Login
                        </button>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <a href="/forgotP">Forgot password?</a>
                        {/* <CButton color="link" className="px-0"></CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 ">
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Hello, welcome to Kings Assembly Members Management System, if you are new
                      here please kindly click the register button
                    </p>
                    <Link to="/signup">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                  {actionFromRes}
                  <ToastContainer />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
