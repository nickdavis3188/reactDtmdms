/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

import baseUrl from '../../config/config'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './memberINfo.css'

const MemberInfo2 = ({ match, User }) => {
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
    ImageUrl: '',
    Business: '',
    Expertise: '',
    DateJoinedTKA: '',
    journeyAttend: [],
    id: '',
    currentJourney: '',
    nextJourney: '',
  })
  const [journeyAtt, setJourneyAtt] = useState([])
  const [JourneyAttLeng, setJourneyAttLeng] = useState(0)

  useEffect(() => {
    let mydata = JSON.stringify({ id: `${match.params.id}` })
    fetch(`${baseUrl}/api/v1/member/getSingleMemById`, {
      method: 'POST',
      body: mydata,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.status === 'success') {
            setDetails({
              Firstname: data.data[0].Firstname ? data.data[0].Firstname : '',
              Surname: data.data[0].Surname ? data.data[0].Surname : '',
              Address: data.data[0].Address ? data.data[0].Address : '',
              PhoneNo: data.data[0].PhoneNo ? data.data[0].PhoneNo : '',
              Email: data.data[0].Email ? data.data[0].Email : '',
              RegNumber: data.data[0].RegNumber ? data.data[0].RegNumber : '',
              Sex: data.data[0].Sex ? data.data[0].Sex : '',
              Dob: data.data[0].Dob ? data.data[0].Dob : '',
              MaritalStatus: data.data[0].MaritalStatus ? data.data[0].MaritalStatus : '',
              WeddingAnniversary: data.data[0].WeddingAnniversary
                ? data.data[0].WeddingAnniversary
                : '',
              Occupation: data.data[0].Occupation ? data.data[0].Occupation : '',
              Business: data.data[0].Business ? data.data[0].Business : '',
              Expertise: data.data[0].Expertise ? data.data[0].Expertise : '',
              DateJoinedTKA: data.data[0].DateJoinedTKA ? data.data[0].DateJoinedTKA : '',
              ImageUrl: data.data[0].ImageUrl ? data.data[0].ImageUrl : '',
              journeyAttend:
                data.data[0].journeyAttend.lenght >= 1 ? data.data[0].journeyAttend : [],
              id: data.data[0]._id ? data.data[0]._id : '',
              currentJourney: data.data[0].currentJourney ? data.data[0].currentJourney : '',
              nextJourney: data.data[0].nextJourney ? data.data[0].nextJourney : '',
            })
            if (data.data[0].journeyAttend.length >= 1) {
              setJourneyAttLeng(data.data[0].journeyAttend.length)
              setJourneyAtt(data.data[0].journeyAttend)
            } else {
              setJourneyAtt([])
            }
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
      })
      .catch((err) => {
        if (err) {
          console.log(err)
          alert(err)
        }
      })
  }, [])

  const monthInWords = (num) => {
    let month = [
      'Jan',
      'Feb',
      'Mar',
      'Apl',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ]
    let result22 = ''
    if (num === 1) {
      result22 = month[0]
    } else if (num === 2) {
      result22 = month[1]
    } else if (num === 3) {
      result22 = month[2]
    } else if (num === 4) {
      result22 = month[3]
    } else if (num === 5) {
      result22 = month[4]
    } else if (num === 6) {
      result22 = month[5]
    } else if (num === 7) {
      result22 = month[6]
    } else if (num === 8) {
      result22 = month[7]
    } else if (num === 9) {
      result22 = month[8]
    } else if (num === 10) {
      result22 = month[9]
    } else if (num === 11) {
      result22 = month[10]
    } else if (num === 12) {
      result22 = month[11]
    } else {
      result22 = 'MonthError'
    }
    return result22
  }

  return (
    <CCard>
      <CCardHeader>Member Info</CCardHeader>
      <CCardBody>
        {User.role === 'admin' ? (
          <DisplayForAdmin Info={details} />
        ) : (
          <SubAdminDisplay Info2={details} />
        )}
      </CCardBody>
      <ToastContainer />
    </CCard>
  )
}

const DisplayForAdmin = ({ Info }) => {
  const history = useHistory()
  const monthInWords = (num) => {
    let month = [
      'Jan',
      'Feb',
      'Mar',
      'Apl',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ]
    let result22 = ''
    if (num === 1) {
      result22 = month[0]
    } else if (num === 2) {
      result22 = month[1]
    } else if (num === 3) {
      result22 = month[2]
    } else if (num === 4) {
      result22 = month[3]
    } else if (num === 5) {
      result22 = month[4]
    } else if (num === 6) {
      result22 = month[5]
    } else if (num === 7) {
      result22 = month[6]
    } else if (num === 8) {
      result22 = month[7]
    } else if (num === 9) {
      result22 = month[8]
    } else if (num === 10) {
      result22 = month[9]
    } else if (num === 11) {
      result22 = month[10]
    } else if (num === 12) {
      result22 = month[11]
    } else {
      result22 = 'MonthError'
    }
    return result22
  }

  let badge =
    Info.Sex === 'Male' || Info.Sex === 'male' || Info.Sex === 'MALE'
      ? 'badge badge-primary'
      : 'badge badge-info'

  return (
    <div className="row gutters-sm">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img src={Info.ImageUrl} alt="Admin" className="rounded-circle" width="150" />
              <div className="mt-3">
                <h4>
                  {Info.Surname} {Info.Firstname}
                </h4>
                <p className={badge}>{Info.Sex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">RegNumber</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.RegNumber}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.Email}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Addresse</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.Address}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">PhoneNo</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.PhoneNo}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">MaritalStatus</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.MaritalStatus}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">DOB</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {Info.Dob
                  ? `${new Date(Info.Dob).getDate()} - ${monthInWords(
                      new Date(Info.Dob).getMonth() + 1,
                    )}`
                  : ''}
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">WeddingAnniversary</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {Info.WeddingAnniversary
                  ? new Date(Info.WeddingAnniversary).toLocaleDateString()
                  : ''}
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Occupation</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.Occupation}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Business</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info.Business}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">DateJoinedTKA</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {Info.DateJoinedTKA ? new Date(Info.DateJoinedTKA).toLocaleDateString() : ''}
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-primary "
                  target="__blank"
                  onClick={() => history.push(`/Members/${Info.id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ////////////////////////////////////////////////
  )
}

const SubAdminDisplay = ({ Info2 }) => {
  let badge2 =
    Info2.Sex === 'Male' || Info2.Sex === 'male' || Info2.Sex === 'MALE'
      ? 'badge badge-primary'
      : 'badge badge-info'
  return (
    <div className="row gutters-sm">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img src={Info2.ImageUrl} alt="Admin" className="rounded-circle" width="150" />
              <div className="mt-3">
                <h4>
                  {Info2.Surname} {Info2.Firstname}
                </h4>
                <p className={badge2}>{Info2.Sex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">RegNumber</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info2.RegNumber}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info2.Email}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Addresse</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info2.Address}</div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">PhoneNo</h6>
              </div>
              <div className="col-sm-9 text-secondary">{Info2.PhoneNo}</div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfo2
