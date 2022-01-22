/* eslint-disable prettier/prettier */
// import React,{useState,useRef} from "react"
import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { FaFileUpload, FaSearch } from 'react-icons/fa'
import baseUrl from '../../config/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
var _ = require('underscore')

export default function BulkUpdate() {
  const { useState } = React

  const [state, setState] = useState([
    { title: 'RegNumber', field: 'RegNumber' },
    { title: 'Firstname', field: 'Firstname' },
    { title: 'Surname', field: 'Surname', initialEditValue: 'initial edit value' },
    { title: 'Email', field: 'Email', type: 'email' },
    { title: 'PhoneNo', field: 'PhoneNo', type: 'numeric' },
    { title: 'MaritalStatus', field: 'MaritalStatus' },
    { title: 'Address', field: 'Address' },
    { title: 'Occupation', field: 'Occupation' },
    { title: 'Business', field: 'Business' },
    { title: 'ID', field: '_id' },
  ])

  const [indexx, setIndex] = useState([])

  const [myData, setMyData] = useState()
  const [myDate, setMyDate] = useState('')

  const getMemsForUpdate = async () => {
    if (myDate === '') {
      return toast('Date Not Selected...')
    }

    console.log('Date', myDate)

    let userId2 = JSON.stringify({ date: `${myDate}` })
    const unAch = await fetch(`${baseUrl}/api/v1/member/bulkUpdateSearch`, {
      method: 'POST',
      body: userId2,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await unAch.json()
    if (data.status === 'success') {
      // console.log('un',data)
      let allData = data.data
      let uuu = _.pluck(allData, 'MemberId')
      let result = _.map(uuu, function (currentObject) {
        return _.pick(
          currentObject,
          'RegNumber',
          'Firstname',
          'Surname',
          'Email',
          'PhoneNo',
          'MaritalStatus',
          'Address',
          'Occupation',
          'Business',
          '_id',
        )
      })

      // console.log('Fildatas',result)
      setMyData(result)

      // setData(data.data.length >= 1?data.data:[])
    } else {
      if (data.status === 'fail') {
        toast(data.message ? data.message : '')
      }
    }
  }
  const submitData = async (e) => {
    e.preventDefault()
    let finalRes = []
    let uniqueChars = [...new Set(indexx)]

    let fillData = uniqueChars.map((a) => {
      return myData[a]
    })

    let result33 = _.map(fillData, function (currentObject2) {
      return _.pick(
        currentObject2,
        'RegNumber',
        'Firstname',
        'Surname',
        'Email',
        'PhoneNo',
        'MaritalStatus',
        'Address',
        'Occupation',
        'Business',
        '_id',
      )
    })
    for (let b = 0; b < result33.length; b++) {
      finalRes.push(result33[b])
    }
    // console.log(result33)
    let userId3 = JSON.stringify({ data: finalRes })
    const unAch = await fetch(`${baseUrl}/api/v1/member/bulkUpdate`, {
      method: 'POST',
      body: userId3,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data3 = await unAch.json()
    console.log(data3)
    if (data3.status === 'success') {
      toast(data3.message ? data3.message : '')
    } else {
      if (data3.status === 'fail') {
        toast(data3.message ? data3.message : '')
      }
    }
  }

  return (
    <>
      <br />
      <div className="input-group">
        <div className="form-outline">
          <input
            id="search-focus"
            type="date"
            className="form-control"
            onChange={(e) => setMyDate(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={(e) => getMemsForUpdate()}>
          <FaSearch />
        </button>
      </div>
      <br />
      <MaterialTable
        title="Bulk Edit"
        columns={state}
        data={myData}
        editable={{
          onBulkUpdate: (changes) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
                if (changes) {
                  const row = Object.values(changes)
                  const updateRow = [...myData]
                  const myIndexArray = [...indexx]
                  console.log('index', myIndexArray)
                  console.log('dat', updateRow)
                  let index
                  row.map((e) => {
                    index = e.oldData.tableData.id
                    myIndexArray.push(index)
                    updateRow[index] = e.newData
                  })
                  setMyData(updateRow)
                  setIndex(myIndexArray)
                }
              }, 1000)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
                if (oldData) {
                  const updateRow2 = [...myData]

                  updateRow2.splice(oldData.tableData.id, 1)

                  setMyData(updateRow2)

                  let indexAr = [...indexx]

                  if (indexAr.indexOf(oldData.tableData.id) != -1) {
                    indexAr.splice(indexAr.indexOf(oldData.tableData.id), 1)
                    setIndex(indexAr)
                  }
                }
              }, 1000)
            }),
        }}
      />
      <br />
      <button className="btn btn-primary px-4" onClick={(e) => submitData(e)}>
        <FaFileUpload />
        Update
      </button>
      <ToastContainer />
      <br />
      <br />
    </>
  )
}
// let newData = [];
// Object.keys(changes).map((editData) => {
// setState((prevState) => {
// const data = [...prevState.data];
// data[data.indexOf(changes[editData]['oldData'])] =
// changes[editData]['newData'];
// newData = [...newData, changes[editData]['newData']];
// return { ...prevState, data };
// });
// });
