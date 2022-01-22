/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import baseUrl from '../config/config'
const DefaultLayout = () => {
  const [user,setUser] = useState('')


  useEffect(()=>{
    async function loadfun(){
      let token = JSON.parse(localStorage.getItem('Token'));
      const reval = await fetch(`${baseUrl}/api/v1/auth/checklog`,{
          method: 'GET',
            headers:{
              'authorization':`Bearer ${token}`
            }
          } 
        )
        const data = await reval.json()
        if(data.status === 'success'){
          setUser(data.data?data.data:'')
        }else{
          if(data.status === 'fail'){
            console.log(data.data?data.data:'')
          }
        }
    }
    
    loadfun()
 
  },[])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader User={user}/>
        <div className="body flex-grow-1 px-3">
          <AppContent User={user}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
