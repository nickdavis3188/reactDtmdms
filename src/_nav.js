/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
///////////////////////////////////////////////////////////////
import {FaFileUpload,FaFileSignature,FaBook} from "react-icons/fa"
import {IoSpeedometerSharp,IoSettings } from "react-icons/io5";
import {ImUsers} from "react-icons/im";
import {GiPlayerTime} from "react-icons/gi";
const _nav = [
	 {
		component: CNavItem,
		name: 'Dashboard',
		to: '/dashboard',
		icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
		badge: {
		  color: 'info',
		  text: 'NEW',
		}
	 },
	 {
		component: CNavTitle,
		name: 'Members'
	 },
	 {
		component: CNavItem,
		name: 'Members',
		to: '/members',
		icon:<ImUsers className="nav-icon"/>
	 },
	  {
		component: CNavTitle,
		name: 'Upload'
	  },
	  {
		component: CNavGroup,
		name: 'Bulk Uploads',
		to: '/bulk',
		icon: <FaFileUpload className="nav-icon"/>,
		items: [
		  {
			component: CNavItem,
			name: 'Member BU',
			to: '/bulkUpload',
		  },
		  {
			component: CNavItem,
			name: 'Attend BU',
			to: '/attenbulkUpload'
		  }
		
		]
	  },
	  {
		component: CNavTitle,
		name: 'Update'
	  },
	 {
		component: CNavItem,
		name: 'Bulk Update',
		to: '/bulkUpdate',
		icon: <FaFileSignature className="nav-icon"/>
	 },
	 {
		component: CNavTitle,
		name: 'Report',
	 },
	{
		component: CNavItem,
		name: 'Report',
		to: '/report',
		icon: <FaBook className="nav-icon"/>
	 },
	 {
		component: CNavTitle,
		name: 'Settings',
	 },
	  {
		component: CNavItem,
		name: 'Settings',
		to: '/Journeysettings',
		icon: <IoSettings className="nav-icon"/>
	  },
]


 
export default _nav
