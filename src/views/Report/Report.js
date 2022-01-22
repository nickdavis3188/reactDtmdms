/* eslint-disable prettier/prettier */
import React, { useState} from 'react'
// import {
//   // CButton,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CFormGroup,
//   CAlert,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import axios from 'axios';
import baseUrl from '../../config/config'

// import * as XLSX from 'xlsx'
// import * as FileSaver from 'file-saver'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  FaSearch } from 'react-icons/fa'

import MaterialTable from 'material-table'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const Report = () => {
  // const [fileValues,setFileValue]  = useState({filee:""})
//   const ref = useRef()
//   const [datas, setDatas] = useState([])

  const [selectJourney, setSelectJourney] = useState(0)
  const [myDate, setMyDate] = useState('')
  const [reportData2, setReportData] = useState([])

  // , hidden: true
  const titles = [
    { title: 'RegNumber', field: 'RegNumber' },
    { title: 'Firstname', field: 'Firstname' },
    { title: 'Surname', field: 'Surname' },
    { title: 'Email', field: 'Email' },
    { title: 'PhoneNo', field: 'PhoneNo' },
    { title: 'JourneyName', field: 'JourneyName' },
    { title: 'JourneyStatus', field: 'Status' },
    { title: 'AttendDate', field: 'AttendDate' },
    { title: 'Initiator', field: 'Initiator' },
    { title: 'InitiatorRole', field: 'InitiatorRole' },
  ]

  const formatDate2 = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const getMyReport = async (n) => {
    if (myDate === '' && selectJourney == 0) {
      return toast('Journey and Date not selected')
    } else if (selectJourney !== 0 && myDate === '') {
      return toast('Date not selected')
    } else if (myDate !== '' && selectJourney === 0) {
      return toast('Journey not selected')
    } else {
      if (typeof selectJourney == 'number') {
        let dateAttend = JSON.stringify({ code: selectJourney, date: myDate })
        let res = await fetch(`${baseUrl}/api/v1/report/reportData`, {
          method: 'POST',
          body: dateAttend,
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        if (data) {
          if (data.status === 'success') {
            let aarr = []
            data.data.map((ee, i) =>
              aarr.push({
                RegNumber: ee.MemberId.RegNumber,
                Firstname: ee.MemberId.Firstname,
                Surname: ee.MemberId.Surname,
                Email: ee.MemberId.Email,
                PhoneNo: ee.MemberId.PhoneNo,
                JourneyName: ee.JourneyId.JourneyName,
                Status: ee.Status,
                AttendDate: formatDate2(ee.JourneyDate),
                Initiator: ee.AdminId.fullName,
                InitiatorRole: ee.AdminId.role,
              }),
            )
            // console.log('aarr',aarr)
            setReportData(aarr.length >= 1 ? aarr : [])
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
      } else {
        return toast('Not a number')
      }
    }
  }

  return (
    <>
      <div>
        <div className="input-group">
          <div className="form-outline">
            <DropdownButton
              className="text-center"
              id="dropdown-item-button"
              title="Journey"
              variant="secondary"
            >
              <Dropdown.ItemText>TAKE ACTION</Dropdown.ItemText>
              <Dropdown.Item as="button" onClick={() => setSelectJourney(1)}>
                Journey 101
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setSelectJourney(2)}>
                Journey 201
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setSelectJourney(3)}>
                Journey 202
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setSelectJourney(4)}>
                Journey 301
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => setSelectJourney(5)}>
                Journey 401
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <br />
          <div className="form-outline">
            <input
              id="search-focus"
              type="date"
              className="form-control"
              onChange={(e) => setMyDate(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={(e) => getMyReport()}>
            <FaSearch />
          </button>
        </div>
      </div>
      <br />
      <MaterialTable
        title="DTMDMS Report"
        columns={titles}
        data={reportData2}
        options={{
          sorting: true,
          exportButton: true,
        }}
      />
      <ToastContainer />
    </>
  )
}
export default Report
