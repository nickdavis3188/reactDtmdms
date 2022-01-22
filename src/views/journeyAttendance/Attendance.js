/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CProgress,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CAlert,
} from '@coreui/react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import CIcon from '@coreui/icons-react';
import { FaSearch } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
// import axios from 'axios';
import baseUrl from '../../config/config'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './att.css'

const Attendance = ({ match, User }) => {
  // const [active, setActive] = useState(0)
  const [details, setDetails] = useState({
    Firstname: '',
    Surname: '',
    Address: '',
    PhoneNo: '',
    Email: '',
    RegNumber: '',
    Sex: '',
    Dob: '',
    MaritalStatus: '',
    WeddingAnniversary: '',
    Occupation: '',
    Business: '',
    Expertise: '',
    DateJoinedTKA: '',
    journeyAttend: [],
    id: '',
    currentJourney: '',
    nextJourney: '',
    SincurrentJourney: '',
    SinnextJourney: '',
    memberStatus: '',
  })
  const [journeyAtt, setJourneyAtt] = useState([])
  const [JourneyAttLeng, setJourneyAttLeng] = useState(0)
  const [info33, setInfo33] = useState(0)

  useEffect(() => {
    async function loadData() {
      let mydata = JSON.stringify({ id: `${match.params.id}` })
      const fetchresponse = await fetch(`${baseUrl}/api/v1/member/getSingleMemById`, {
        method: 'POST',
        body: mydata,
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data'
        },
      })
      const fetcResData = await fetchresponse.json()
      if (fetcResData) {
        if (fetcResData.status === 'success') {
          setDetails({
            Firstname: fetcResData.data[0].Firstname ? fetcResData.data[0].Firstname : '',
            Surname: fetcResData.data[0].Surname ? fetcResData.data[0].Surname : '',
            Address: fetcResData.data[0].Address ? fetcResData.data[0].Address : '',
            PhoneNo: fetcResData.data[0].PhoneNo ? fetcResData.data[0].PhoneNo : '',
            Email: fetcResData.data[0].Email ? fetcResData.data[0].Email : '',
            RegNumber: fetcResData.data[0].RegNumber ? fetcResData.data[0].RegNumber : '',
            Sex: fetcResData.data[0].Sex ? fetcResData.data[0].Sex : '',
            Dob: fetcResData.data[0].Dob ? fetcResData.data[0].Dob : '',
            MaritalStatus: fetcResData.data[0].MaritalStatus
              ? fetcResData.data[0].MaritalStatus
              : '',
            WeddingAnniversary: fetcResData.data[0].WeddingAnniversary
              ? fetcResData.data[0].WeddingAnniversary
              : '',
            Occupation: fetcResData.data[0].Occupation ? fetcResData.data[0].Occupation : '',
            Business: fetcResData.data[0].Business ? fetcResData.data[0].Business : '',
            Expertise: fetcResData.data[0].Expertise ? fetcResData.data[0].Expertise : '',
            DateJoinedTKA: fetcResData.data[0].DateJoinedTKA
              ? fetcResData.data[0].DateJoinedTKA
              : '',
            ImageUrl: fetcResData.data[0].ImageUrl ? fetcResData.data[0].ImageUrl : '',
            journeyAttend:
              fetcResData.data[0].journeyAttend.lenght >= 1
                ? fetcResData.data[0].journeyAttend
                : [],
            id: fetcResData.data[0]._id ? fetcResData.data[0]._id : '',
            currentJourney: fetcResData.data[0].currentJourney
              ? fetcResData.data[0].currentJourney
              : '',
            nextJourney: fetcResData.data[0].nextJourney ? fetcResData.data[0].nextJourney : '',
            SincurrentJourney: fetcResData.data[0].SincurrentJourney
              ? fetcResData.data[0].SincurrentJourney
              : '',
            SinnextJourney: fetcResData.data[0].SinnextJourney
              ? fetcResData.data[0].SinnextJourney
              : '',
            memberStatus: fetcResData.data[0].memberStatus ? fetcResData.data[0].memberStatus : '',
          })
          if (fetcResData.data[0].journeyAttend.length >= 1) {
            let fillDat = fetcResData.data[0].journeyAttend.filter((a) => a.Status == 'New')
            // console.log('hhh',fillDat)
            setJourneyAttLeng(fillDat.length)
            setJourneyAtt(fetcResData.data[0].journeyAttend)
          } else {
            setJourneyAtt([])
          }
        } else {
          if (fetcResData.status === 'fail') {
            return toast(fetcResData.message ? fetcResData.message : '')
          } else {
            if (fetcResData.status === 'error') {
              return toast(fetcResData.message ? fetcResData.message : '')
            }
          }
        }
      }
    }
    loadData()
  }, [])

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
  return (
    <>
      <div className="container rounded bg-white mt-2 mb-2">
        <div className="row">
          <div className="col-md-6">
            <div className="p-3 py-5">
              <CCard>
                <CCardHeader>Attendance</CCardHeader>
                <CCardBody>
                  {details.memberStatus == 'Repeated' ? (
                    <JourneyAttendance2
                      id={details.id}
                      SincurrentJourney={details.SincurrentJourney}
                      SinnextJourney={details.SinnextJourney}
                      admin={User}
                    />
                  ) : (
                    <JourneyAttendance
                      id={details.id}
                      currentJourney={details.currentJourney}
                      nextJourney={details.nextJourney}
                      admin={User}
                    />
                  )}
                  <br />
                </CCardBody>
              </CCard>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 py-5">
              <CCard>
                <CCardHeader>Journey History</CCardHeader>
                <CCardBody>
                  <JourneyHistry journey3={journeyAtt} journeyLength={JourneyAttLeng} />
                </CCardBody>
              </CCard>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

const AttendanceChack = ({ match }) => {
  const selectJouurney = async (ex) => {
    let userId3 = JSON.stringify({ code: ex, id: `${match.params.id}` })
    const unAch = await fetch(`${baseUrl}/api/v1/member/attendSecond`, {
      method: 'POST',
      body: userId3,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await unAch.json()
    if (data.status === 'success') {
      toast(data.message ? data.message : '')
    } else {
      if (data.status === 'fail') {
        toast(data.message ? data.message : '')
      }
    }
  }

  return (
    <DropdownButton
      className="text-center"
      id="dropdown-item-button"
      title="Action"
      variant="secondary"
    >
      <Dropdown.ItemText>TAKE ACTION</Dropdown.ItemText>
      <Dropdown.Item as="button" onClick={() => selectJouurney(1)}>
        Journey 101
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => selectJouurney(2)}>
        Journey 201
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => selectJouurney(3)}>
        Journey 202
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => selectJouurney(4)}>
        Journey 301
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => selectJouurney(5)}>
        Journey 401
      </Dropdown.Item>
    </DropdownButton>
  )
}



const JourneyHistry = (props) => {
  // let num = props.journey.length

  return (
    <div style={{ overflowX: 'auto' }} className="table-responsive-xl">
      <br />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Journey Name</th>
            <th scope="col">Journey Levle</th>
            <th scope="col">Date Attaind</th>
            <th scope="col">Journey Status</th>
          </tr>
        </thead>
        <tbody>
          {props.journey3.map((e, i) => {
            return (
              <tr key={i}>
                <th scope="row">{e.JourneyId.JourneyName ? e.JourneyId.JourneyName : ''}</th>
                <td>{e.JourneyId.JourneyPriority ? e.JourneyId.JourneyPriority : ''}</td>
                <td>{e.JourneyDate ? new Date(e.JourneyDate).toLocaleDateString() : ''}</td>
                <td>
                  {e.Status ? (
                    <p className="small mb-3">
                      <span
                        className={e.Status == 'New' ? 'badge badge-primary' : 'badge badge-info'}
                      >
                        {e.Status}
                      </span>
                    </p>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div className="clearfix">
        <div className="float-left">
          <strong>{20 * props.journeyLength}%</strong>
        </div>
        <div className="float-right">
          <small className="text-muted">Journey Progress</small>
        </div>
      </div>
      <CProgress className="progress-xs" color="success" value={20 * props.journeyLength} />

      <hr className="my-4" />
    </div>
  )
}

const JourneyAttendance = (props) => {
  const [modal, setModal] = useState(false)
  // const [visible, setVisible] = React.useState(0)
	const [visible, setVisible] = useState(true)
// const [visible, setVisible] = useState(false)



  const Attendance22 = async (e) => {
    let dateAttend = JSON.stringify({ id: props.id, addId: props.admin._id })
    let res = await fetch(`${baseUrl}/api/v1/member/attendance`, {
      method: 'POST',
      body: dateAttend,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (data) {
      if (data.status === 'success') {
        return toast('successfully Attend')
      } else {
        if (data.status === 'fail') {
          return toast(data.message ? data.message : '')
        } else {
          if (data.status === 'error') {
            return toast(data.message ? data.message : '')
          }
        }
      }
    }
  }

  const CheckDate = async (e) => {
    let res = await fetch(`${baseUrl}/api/v1/journeyDate/checkJourneyDate`, {
      method: 'GET',
    })

    const data = await res.json()

    if (data) {
      if (data.status === 'success') {
        setModal(!modal)
      } else {
        if (data.status === 'not found') {
		  setVisible(!visible)
        } else {
          if (data.status === 'fail') {
            return toast(data.message ? data.message : '')
          }
        }
      }
    }
  }

  const btnAtt =
    props.currentJourney.JourneyPriority === 6 ? (
      <button className=" btn btn-primary disabled" disabled>
        You are done with your journey
      </button>
    ) : (
      <button className="btn btn-primary" onClick={(e) => CheckDate(e)}>
        Attend
      </button>
    )

  return (
    <div>
		<CModal visible={modal} onClose={() =>setModal(false)}>
		  <CModalHeader onClose={() =>setModal(false)}>
			<CModalTitle>Journey Warning</CModalTitle>
		  </CModalHeader>
		  <CModalBody>Are you sure you have attended {props.currentJourney.JourneyName}?</CModalBody>
		  <CModalFooter>
			<CButton color="secondary" onClick={() => setModal(false)}>
			  Close
			</CButton>
			<button
            className="btn btn-primary"
            onClick={(e) => {
              setModal(false)
              return Attendance22(e)
            }}
          >
		   Proceed...
          </button>{' '}
		  </CModalFooter>
		</CModal>
	
    {
    visible?(
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
      Journey Date Not Set...
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClose={() => setVisible(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    ):
    ""
    }
    <div className="alert alert-warning" role="alert">
      A simple warning alert with an example link. Give it a click if you like.
    </div>
      <div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Current Journey</th>
                <th scope="col">Next Journey</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{props.currentJourney.JourneyName}</th>
                <td>{props.nextJourney.JourneyName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <CInputGroup row>
          <CCol md="6">{btnAtt}</CCol>
        </CInputGroup>
      </div>
    </div>
  )
}

const JourneyAttendance2 = (props) => {
  const [modal, setModal] = useState(false)
  const [visible, setVisible] = React.useState(false)
  const [myCode, setCode] = useState()
  const [myJCode, setJCode] = useState()
  const Attendance22 = async (e) => {
    let dateAttend = JSON.stringify({ id: props.id, addId: props.admin._id })
    let res = await fetch(`${baseUrl}/api/v1/member/journeyAttendSecond`, {
      method: 'POST',
      body: dateAttend,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (data) {
      if (data.status === 'success') {
        return toast('successfully Attend')
      } else {
        if (data.status === 'fail') {
          return toast(data.message ? data.message : '')
        } else {
          if (data.status === 'error') {
            return toast(data.message ? data.message : '')
          }
        }
      }
    }
  }

  const CheckDate = async (e) => {
    let res = await fetch(`${baseUrl}/api/v1/journeyDate/checkJourneyDate`, {
      method: 'GET',
    })

    const data = await res.json()

    if (data) {
      if (data.status === 'success') {
        setModal(!modal)
      } else {
        if (data.status === 'not found') {
          setVisible(10)
        } else {
          if (data.status === 'fail') {
            return toast(data.message ? data.message : '')
          }
        }
      }
    }
  }

  const selectJourney = async (n) => {
    n.preventDefault()
    if (typeof myJCode == 'number') {
      let dateAttend = JSON.stringify({ code: myJCode, id: `${props.id}` })
      let res = await fetch(`${baseUrl}/api/v1/member/setNJourney`, {
        method: 'POST',
        body: dateAttend,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (data) {
        if (data.status === 'success') {
          return toast(data.message ? data.message : '')
        } else {
          if (data.status === 'fail') {
            return toast(data.message ? data.message : '')
          } else {
            if (data.status === 'error') {
              return toast(data.message ? data.message : '')
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      let mydata = JSON.stringify({ id: `${props.id}` })
      const redval = await fetch(`${baseUrl}/api/v1/member/checkJourneyM`, {
        method: 'POST',
        body: mydata,
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data'
        },
      })
      const data = await redval.json()
      if (data.status === 'success') {
        setCode(data.code ? data.code : '')
      } else {
        if (data.status === 'fail') {
          return toast(data.message ? data.message : '')
        } else {
          if (data.status === 'error') {
            return toast(data.message ? data.message : '')
          }
        }
      }
    }

    loadData()
  }, [])

  const notice =
    myCode == 3 ? 'Last attendance 3 Months ago...' : 'Last attendance 6 Months ago or above...'
  return (
    <div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>
          <span>
            <strong>Note:{notice}</strong>{' '}
          </span>
        </strong>
      </div>
	
	  <CModal visible={modal} onClose={() =>setModal(false)}>
		  <CModalHeader onClose={() =>setModal(false)}>
			<CModalTitle>Journey Warning</CModalTitle>
		  </CModalHeader>
		  <CModalBody>Are you sure you have attended {props.SincurrentJourney.JourneyName}?</CModalBody>
		  <CModalFooter>
			<CButton color="secondary" onClick={() => setModal(false)}>
			  Close
			</CButton>
			<button
            className="btn btn-primary"
            onClick={(e) => {
              setModal(false)
              return Attendance22(e)
            }}
          >
		   Proceed...
          </button>{' '}
		  </CModalFooter>
		</CModal>

     
	  
      <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>Journey Date Not Set...</CAlert>
	  
      <div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Current Journey</th>
                <th scope="col">Next Journey</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{props.SincurrentJourney.JourneyName}</th>
                <td>{props.SinnextJourney.JourneyName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <CInputGroup row>
          <CCol md="6">
            {!props.SincurrentJourney ? (
              <div className="input-group">
                <div className="form-outline">
                  <DropdownButton
                    className="text-center"
                    id="dropdown-item-button"
                    title="Select Journey"
                    variant="secondary"
                  >
                    <Dropdown.ItemText>TAKE ACTION</Dropdown.ItemText>
                    <Dropdown.Item as="button" onClick={() => setJCode(1)}>
                      Journey 101
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setJCode(2)}>
                      Journey 201
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setJCode(3)}>
                      Journey 202
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setJCode(4)}>
                      Journey 301
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setJCode(5)}>
                      Journey 401
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <button type="button" className="btn btn-primary" onClick={(e) => selectJourney(e)}>
                  <RiSendPlaneLine />
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={(e) => CheckDate(e)}>
                Attend
              </button>
            )}
          </CCol>
        </CInputGroup>
      </div>
    </div>
  )
}

export default Attendance
