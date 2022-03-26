/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader,CInputGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import axios from 'axios';
import baseUrl from '../../../config/config'
import * as XLSX from 'xlsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaFileUpload } from 'react-icons/fa'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const BulkUpload = () => {
  const [fileValues, setFileValue] = useState({ filee: '' })
  const ref = useRef()
  const [selectJourney, setSelectJourney] = useState(0)
  const [datas, setDatas] = useState([])
  const [newMembers,setNewMember]  = useState([])
  const [prev,setPrev] = useState(0)
  const [notRegisterd2,setNotRegisterd] = useState([])
  const formData = new FormData()

  const preview = (file) => {
	  
		const promies = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
	  

      fileReader.onload = (e) => {
        const myFile = e.target.result

        const wb = XLSX.read(myFile, { type: 'buffer' })
        const ws = wb.Sheets[wb.SheetNames[0]]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promies
      .then((d) => {
        console.log(d)
        setDatas(d)
      })
      .catch((e) => console.log(e))
  }

  formData.append('file', fileValues.filee)

  const sendFile = async (e) => {
    e.preventDefault()
	if (selectJourney == 0) {
      return toast('Journey not selected')
	}else{
		if (fileValues.filee === '') {
		  return toast('File Not Selected...')
		}else{
			console.log('selectJourney',selectJourney)
			let sendData = JSON.stringify({data:datas,JourneyPriority:selectJourney})

			let token = JSON.parse(localStorage.getItem('Token'))

			const reponesUP = await fetch(`${baseUrl}/api/v1/member/bulkAttendance`, {
			  method: 'POST',
			  body: sendData,
			  headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			  },
			})
			const resData = await reponesUP.json()
			if (resData) {
			  if (resData.status === 'success') {
				
				 if(resData.newMember != undefined){
					 setNewMember(resData.newMember.length >= 1?resData.newMember:'')
				 }else if(resData.notRegisterd != undefined){
					 setNotRegisterd(resData.notRegisterd.length >= 1?resData.notRegisterd:'')
				 }else{
					 console.log('undefined')
				 }
		
				return toast('Upload successful')
			  } else {
				return toast(resData.message ? resData.message : '')
			  }
			}
		}
		
	}
    
  }
  

  //convert excel date serial int to Date
  const ExcelDateToJSDate = (serial) => {
    var utc_days = Math.floor(serial - 25569)
    var utc_value = utc_days * 86400
    var date_info = new Date(utc_value * 1000)

    var fractional_day = serial - Math.floor(serial) + 0.0000001

    var total_seconds = Math.floor(86400 * fractional_day)

    var seconds = total_seconds % 60

    total_seconds -= seconds

    var hours = Math.floor(total_seconds / (60 * 60))
    var minutes = Math.floor(total_seconds / 60) % 60

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds,
    )
  }
	
  return (
    <>
		
      <CCard>
        <CCardHeader>
          <h5>Make your Attendance bulk upload here</h5>
        </CCardHeader>
        <CCardBody>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>
              <span>
                <strong>Note:</strong> Only an Excel file is accepted
              </span>
            </strong>
          </div>
          <br />
		
		  {
			newMembers.length >= 1
			
			?
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
				 <CCard>
					<CCardHeader>
					<p>Feedback: Note the RegNumber did not attend the previous journey</p>
					</CCardHeader>
					<CCardBody>
					 <div style={{ overflowX: 'auto' }} className="table-responsive-xl">
						<table className="table table-hover">
						  <thead>
							<tr>
							  <th scope="col">RegNumber</th>
							  <th scope="col">Firstname</th>
							  <th scope="col">Surname</th>
							  <th scope="col">Email</th>
							
							</tr>
						  </thead>
						  <tbody>
							{newMembers.map((e, i) => {
							  return (
								<tr key={i}>
								  <td>{e.RegNumber}</td>
								  <td>{e.Firstname}</td>
								  <td>{e.Surname}</td>
								  <td>{e.Email}</td>
								  
								</tr>
							  )
							})}
						  </tbody>
						</table>
					  </div>
				  </CCardBody>
				 </CCard>
			 </div>
			:
			""
		}
		  
		   {
			notRegisterd2.length >= 1
			
			?
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
				 <CCard>
					<CCardHeader>
					<p>Feedback: Note the RegNumber of The following members, there are not registerd in the app </p>
					</CCardHeader>
					<CCardBody>
					 <div style={{ overflowX: 'auto' }} className="table-responsive-xl">
						<table className="table table-hover">
						  <thead>
							<tr>
							  <th scope="col">RegNumber</th>
							  <th scope="col">Firstname</th>
							  <th scope="col">Surname</th>
							  <th scope="col">Email</th>
							
							</tr>
						  </thead>
						  <tbody>
							{notRegisterd2.map((e, i) => {
							  return (
								<tr key={i}>
								  <td>{e.RegNumber}</td>
								  <td>{e.Firstname}</td>
								  <td>{e.Surname}</td>
								  <td>{e.Email}</td>
								  
								</tr>
							  )
							})}
						  </tbody>
						</table>
					  </div>
				  </CCardBody>
				 </CCard>
			 </div>
			:
			""
		}
		  
		  <br/>
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
          <CInputGroup row>
            <div className="form-group">
              <input
                type="file"
				className="form-control" 
                id="customFile"
                onChange={(e) => {
                  const file = e.target.files[0]
                  setFileValue({ filee: file })
                  preview(file)
                }}
                ref={ref}
              />
            </div>
          </CInputGroup>
		  </div>
          <br />
          {/* //setFileValue({file:e.target.files[0]}) */}
          <div style={{ overflowX: 'auto' }} className="table-responsive-xl">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">RegNumber</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Email</th>
                
                </tr>
              </thead>
              <tbody>
                {datas.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{e.RegNumber}</td>
                      <td>{e.Firstname}</td>
                      <td>{e.Surname}</td>
                      <td>{e.Email}</td>
                      
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CCardBody>
        <CCardFooter>
          <button className="btn btn-primary px-4" onClick={(e) => sendFile(e)}>
            <FaFileUpload />
            Upload
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault()
              ref.current.value = ''
            }}
          >
            <CIcon name="cil-ban" /> Reset
          </button>
          <ToastContainer />
        </CCardFooter>
      </CCard>
	  
    </>
  )
}

export default BulkUpload
