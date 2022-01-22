/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CFormLabel,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const MemberMinistryRegistration = () => {
  return (
    <>
      <h3>Member registration</h3>
      <CCard>
        <CCardHeader>
          Membership
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
            <CFormGroup row>
              <CCol md="1">
                <CFormLabel htmlFor="hf-MinistryID1">MinistryID1</CFormLabel>
              </CCol>
              <CCol md="5">
                <CInput
                  id="hf-MinistryID1"
                  name="hf-MinistryID1"
                  placeholder="Enter MinistryID1..."
                />
                <CFormText className="help-block">Please enter your MinistryID1</CFormText>
              </CCol>

              <CCol md="1">
                <CFormLabel htmlFor="hf-MinistryID2">MinistryID2</CFormLabel>
              </CCol>
              <CCol md="5">
                <CInput
                  id="hf-MinistryID2"
                  name="hf-MinistryID2"
                  placeholder="Enter MinistryID2..."
                />
                <CFormText className="help-block">Please enter your MinistryID2</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="1">
                <CFormLabel htmlFor="hf-Address">MinistryID3</CFormLabel>
              </CCol>
              <CCol md="5">
                <CInput
                  id="hf-MinistryID3"
                  name="hf-MinistryID3"
                  placeholder="Enter MinistryID3..."
                />
                <CFormText className="help-block">Please enter your MinistryID3</CFormText>
              </CCol>

              <CCol md="1">
                <CFormLabel htmlFor="hf-MinistryID4">MinistryID4</CFormLabel>
              </CCol>
              <CCol md="5">
                <CInput
                  id="hf-MinistryID4"
                  name="hf-MinistryID4"
                  placeholder="Enter MinistryID4..."
                />
                <CFormText className="help-block">Please enter your MinistryID4</CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary">
            <CIcon name="cil-scrubber" /> Submit
          </CButton>{' '}
          <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban" /> Reset
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default MemberMinistryRegistration
