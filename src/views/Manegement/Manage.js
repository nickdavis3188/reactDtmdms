/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import baseUrl from '../../config/config'
import { CCard, CCardHeader, CCardBody, CCardFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const Manage = ({ User }) => {
  const history = useHistory()
  const [result1, setResult] = useState([])
  const [archiveState, setArchiveState] = useState('')
  // let num = props.journey.length

  useEffect(() => {
    async function loadfun() {
      let userId = JSON.stringify({ id: User._id })
      const reval = await fetch(`${baseUrl}/api/v1/auth/allAdmin`, {
        method: 'POST',
        body: userId,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await reval.json()
      if (data.status === 'success') {
        setResult(data.data.length >= 1 ? data.data : [])
      } else {
        if (data.status === 'not found') {
          toast(data.message ? data.message : '')
        }
      }
    }

    loadfun()
  }, [])
  const deleteAdmin = async (a, i) => {
    let userId = JSON.stringify({ id: a })
   const delreq = await fetch(`${baseUrl}/api/v1/auth/deleteAdmin`, {
      method: 'POST',
      body: userId,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await delreq.json()
    if (data) {
      if (data.status === 'success') {
        //  let newData = result1.splice(i,1)
        let filterData = result1.filter((e) => e._id !== a)
        setResult(filterData)
        return toast('Delete successfully')
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

  const setArchiveStatus = async (id) => {
    let mydata = JSON.stringify({ id: `${id}` })
    const redval = await fetch(`${baseUrl}/api/v1/auth/getSingleAdminById`, {
      method: 'POST',
      body: mydata,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data'
      },
    })
    const data = await redval.json()
    if (data.status === 'success') {
      if (data.data.length >= 1) {
        console.log(data.data[0])
        setArchiveState(data.data[0].isArchive ? data.data[0].isArchive : '')
      }
    } else {
      if (data.status === 'fail') {
        return toast(data.message ? data.message : '')
      } else {
        if (data.status === 'error') {
          toast(data.message ? data.message : '')
        }
      }
    }
  }

  const archiveAdmin = async (id) => {
    console.log('achivid', id)
    let userId17 = JSON.stringify({ id: `${id}` })
    const reval = await fetch(`${baseUrl}/api/v1/auth/archive`, {
      method: 'POST',
      body: userId17,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await reval.json()
    if (data.status === 'success') {
      console.log('aa', data.status)
      setArchiveState('archive')
    } else {
      if (data.status === 'fail') {
        toast(data.message ? data.message : '')
      }
    }
  }

  const unArchiveAdmin = async (id) => {
    console.log('unachivid', id)
    let userId2 = JSON.stringify({ id: `${id}` })
    const unAch = await fetch(`${baseUrl}/api/v1/auth/unArchive`, {
      method: 'POST',
      body: userId2,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await unAch.json()
    if (data.status === 'success') {
      console.log('un', data.status)
      setArchiveState('unarchive')
    } else {
      if (data.status === 'fail') {
        toast(data.message ? data.message : '')
      }
    }
  }

  return (
    <CCard>
      <CCardHeader>USER MANGEMENT</CCardHeader>
      <CCardBody>
        <table className="table table-hover table-outline ">
          <thead className="thead-light">
            <tr>
              <th className="text-center">
                <CIcon name="cil-people" />
              </th>
              <th className="text-center">User</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {result1.map((e, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">
                    <div className="c-avatar">
                      <img src={e.photoUrl} className="rounded-circle" width="80" alt="admin" />
                      <span className="c-avatar-status bg-success"></span>
                    </div>
                  </td>

                  <td>
                    {/* <div>{`${e.Surname} ${e.Firstname}`}</div> */}
                    <div className="small text-muted  text-center">
                      <span>New</span> |Registerd on{' '}
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : ''}
                    </div>
                  </td>

                  <td>
                    <strong className="text-center">{e.fullName}</strong>
                  </td>

                  <td>
                    <strong className="text-center">{e.email}</strong>
                  </td>

                  <td>
                    <strong
                      className={
                        e.role === 'admin'
                          ? 'badge badge-primary text-center'
                          : 'badge badge-info text-center'
                      }
                    >
                      {e.role}
                    </strong>
                  </td>
                  <td>
                    <DropdownButton
                      className="text-center"
                      id="dropdown-item-button"
                      title="Action"
                      variant="secondary"
                      onClick={() => setArchiveStatus(e._id)}
                    >
                      <Dropdown.ItemText>TAKE ACTION</Dropdown.ItemText>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          archiveState === 'unarchive' ? archiveAdmin(e._id) : unArchiveAdmin(e._id)
                        }}
                      >
                        {archiveState === 'unarchive' ? 'SUSPEND' : 'ACTIVE'}
                      </Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => deleteAdmin(e._id, i)}>
                        DELETE
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CCardBody>
      <CCardFooter>
        <ToastContainer />
      </CCardFooter>
    </CCard>
  )
}

export default Manage
