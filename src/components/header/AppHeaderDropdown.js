/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'
import { FaAddressCard, FaAddressBook } from 'react-icons/fa'
import Auth from '../../auth'
import baseUrl from '../../config/config'

const AppHeaderDropdown = ({ User }) => {
  const [resValue, setResValue] = useState({
    status: '',
    resBody: '',
  })

  const history = useHistory()

  const logMeOut = async () => {
    let token = JSON.parse(localStorage.getItem('Token'))

    const logoutRes = await fetch(`${baseUrl}/api/v1/auth/signout`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const logoutResData = await logoutRes.json()
    if (logoutResData) {
      if (logoutResData.status === 'success') {
        Auth.logOut()
        localStorage.removeItem('Token')
        history.push('/login')
      }
    }
  }

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('Token'))
    async function load() {
      const retval = await fetch(`${baseUrl}/api/v1/auth/checklog`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      const data = await retval.json()
      console.log('data22', data)
      if (data.status === 'success') {
        Auth.login()
        setResValue({ status: 'success', resBody: data.data ? data.data : '' })
      } else {
        if (data.status === 'fail') {
          Auth.logOut()
          //  window.location.reload()
        } else {
          if (data.status === 'error') {
            Auth.logOut()
            //  window.location.reload()
          }
        }
      }
    }
    load()
  }, [])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>   
        <CAvatar src={resValue.resBody.photoUrl} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        {User.role === 'admin' ? (
          <>
            <CDropdownItem onClick={() => history.push('/inviteAdmin')}>
              <FaAddressCard className="me-2" />
              InviteAdmin
            </CDropdownItem>
            <CDropdownItem onClick={() => history.push('/manage')}>
              <FaAddressBook className="me-2" />
              ManageUser
            </CDropdownItem>
          </>
        ) : (
          ''
        )}
        <CDropdownItem onClick={() => history.push('/Journeysettings')}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem>
          <CIcon icon={cilLockLocked} className="me-2" />
          <h6 onClick={() => logMeOut()}>LogOut</h6>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
// &nbsp;
export default AppHeaderDropdown
