/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import auth from '../auth'

const AppContent = ({User}) => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => {
                        
					
					return (
					auth.isAuthenticated() || User.role === 'admin' || User.role === 'sub-admin'
					?(
						<route.component {...props} User={User} />
					  )                  
					:(
					  <Redirect to={{ pathname: "/login" }} />
					)
					
				  )}}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)



 // (
				  
					
	// <>
	  // <route.component {...props} />
	// </>
  // )
