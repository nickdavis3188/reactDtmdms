import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
// import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = () => {
    return(

    <CRow>
        <CCol sm="6" lg="3">
            <CWidgetDropdown
                color="gradient-primary"
                header="9.823"
                text="Members"
                footerSlot={
                    <ChartLineSimple
                    className="mt-3"
                    style={{height: '70px'}}
                    backgroundColor="gradient-primary"
                    dataPoints={[78, 81, 80, 45, 94, 12, 90]}
                    options={{ elements: { line: { borderWidth: 2.5 }}}}
                    pointHoverBackgroundColor="primary"
                    label="Members"
                    labels="months"
                    />
                }
            >
                <CDropdown>
                    <CDropdownToggle color="transparent">
                    <CIcon name="cil-settings"/>
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
            <CWidgetDropdown
                color="gradient-warning"
                header="9.823"
                text="Male"
                footerSlot={
                    <ChartLineSimple
                    className="mt-3"
                    style={{height: '70px'}}
                    backgroundColor="rgba(255,255,255,.2)"
                    dataPoints={[78, 81, 80, 45, 94, 12, 90]}
                    options={{ elements: { line: { borderWidth: 2.5 }}}}
                    pointHoverBackgroundColor="warning"
                    label="Male"
                    labels="months"
                    />
                }
            >
                <CDropdown>
                    <CDropdownToggle color="transparent">
                    <CIcon name="cil-settings"/>
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
            <CWidgetDropdown
                color="gradient-info"
                header="9.823"
                text="Female"
                footerSlot={
                    <ChartLineSimple
                    className="mt-3"
                    style={{height: '70px'}}
                    backgroundColor="gradient-info"
                    dataPoints={[78, 81, 80, 45, 94, 12, 90]}
                    options={{ elements: { line: { borderWidth: 2.5 }}}}
                    pointHoverBackgroundColor="info"
                    label="Female"
                    labels="months"
                    />
                }
            >
                <CDropdown>
                    <CDropdownToggle color="transparent">
                    <CIcon name="cil-settings"/>
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CWidgetDropdown>
        </CCol>
    </CRow>
    )
}

export default WidgetsDropdown