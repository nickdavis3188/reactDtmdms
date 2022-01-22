/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  CWidgetStatsF,
  CCol,
  CRow,
  CInputGroup
} from '@coreui/react';
// import axios from 'axios';
import baseUrl from '../../config/config';

import {FaFemale,FaMale} from "react-icons/fa"
import {ImUsers} from "react-icons/im";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaSearch} from "react-icons/fa"
// import '../../style.css'

const Dashboard = () => {
 
  return (
    <>
      <WidgetSimple/>   
      <br />  
      <Chat/>
      <ToastContainer/>
    </>
  )
}

const WidgetSimple = ()=>{
  
  const [widgetValues,setWidgetValue]  = useState({
    Total:'',
    Male:'',
    Female:''
  })
  
const loadData = async ()=>{
  let res =  await fetch(`${baseUrl}/api/v1/dashborad/static`,{
        method: 'GET',
    })
   const data = await res.json()
   // console.log(data.data) 
  if(data){
      if(data.status === 'success'){
        setWidgetValue({Total:data.data.total?data.data.total:'',Male:data.data.male?data.data.male:'',Female:data.data.female?data.data.female:''})
        // return toast('Dashborad set')
      }else{
          if(data.status === 'fail'){
            return toast(data.message?data.message:'')
          }else{
              if(data.status === 'error'){
                return toast(data.message?data.message:'')
              }
          }

      } 
  
  }
}
    // })
    // .catch((err)=>{
    //     if(err){
    //     console.log(err) 
    //     alert(err)
    //     }
    // })


  useEffect(()=>{
   async function loadMyData(){
      await loadData()
   }

   loadMyData()


  },[])

  return(
    <>
    <CRow>
    <CCol xs="12" sm="6" lg="4">
	 <CWidgetStatsF
        className="mb-3"
        color="primary"
        icon={<ImUsers width={24} />}
        title="Members"
        value={`${widgetValues.Total}`}/>
    </CCol>
    <CCol xs="12" sm="6" lg="4">
		<CWidgetStatsF
        className="mb-3"
        color="warning"
        icon={<FaMale />}
        title="Male"
        value={`${widgetValues.Male}`}/>
	
    </CCol>
    <CCol xs="12" sm="6" lg="4">
		<CWidgetStatsF
        className="mb-3"
        color="info"
        icon={<FaFemale />}
        title="Female"
        value={`${widgetValues.Female}`}/>
	
    </CCol>
    </CRow>
    
    </>
  )
}






const Chat = (props) =>{
  // let token = localStorage.getItem('Token')
  const [yearValues,setYearValue]  = useState()

  const [maleArr,setMaleArr]  = useState([])
  const [femaleArr,setFemaleArr]  = useState([])
  
  
  const [journey101,setJourney101]= useState([])
  const [journey201,setJourney201]= useState([])
  const [journey202,setJourney202]= useState([])
  const [journey301,setJourney301] = useState([])
  const [journey401,setJourney401]= useState([])
  
 const attendanceSelectedYear = async ()=>{
	  let getYearp =JSON.stringify({ya:yearValues? yearValues: new Date().getFullYear()})
    const attRes = await fetch(`${baseUrl}/api/v1/dashborad/attendanceDashborad`,{
        method: 'POST',
        body:getYearp,
        headers:{
          "Content-Type":"application/json",
        }
    })
	const attresData = await attRes.json()
	 if(attresData){
		if(attresData.status === 'success'){  
			console.log('ATTD',attresData.data)
			setJourney101(attresData.data.levle1.length >= 1?attresData.data.levle1:[])    
			setJourney201(attresData.data.levle2.length >= 1?attresData.data.levle2:[])
			setJourney202(attresData.data.levle3.length >= 1?attresData.data.levle3:[])
			setJourney301(attresData.data.levle4.length >= 1?attresData.data.levle4:[])
			setJourney401(attresData.data.levle5.length >= 1?attresData.data.levle5:[])
		}else{
		  if(attresData.status === 'fail'){
			return toast(attresData.message?attresData.message:'')
		  }else{
			  if(attresData.status === 'error'){
				return toast(attresData.message?attresData.message:'')
			  }
		  }
	  }      
	}
 }
    
 
 
 const memberSelecterYear = async()=>{
	  let getYearp11 =JSON.stringify({ya:yearValues?yearValues:new Date().getFullYear()})

      const memSeleRes = await fetch(`${baseUrl}/api/v1/dashborad/dashboradStatistics`,{
          method: 'POST',
          body:getYearp11,
          headers:{
            "Content-Type":"application/json",
          }
      })
	  const mesSelResData = await memSeleRes.json()
	  if(mesSelResData){
		  if(mesSelResData.status === 'success'){
			setMaleArr(mesSelResData.data.male || mesSelResData.data.Male ?mesSelResData.data.male ||mesSelResData.data.Male:[])
			setFemaleArr(mesSelResData.data.female || mesSelResData.data.Female?mesSelResData.data.female || mesSelResData.data.Female:[])
			console.log('Dboard',mesSelResData.data)
			// setDashboardValues({Male:,Female:})
			// return toast('success')
		  }else{
			  if(mesSelResData.status === 'fail'){
				return toast(mesSelResData.message?mesSelResData.message:'')
			  }else{
				  if(mesSelResData.status === 'error'){
					return toast(mesSelResData.message?mesSelResData.message:'')
				  }
			  }

		  }        
	  }
 }  
  
 
  const trigerValue = (e)=>{
      e.preventDefault()
	  
      attendanceSelectedYear()
      memberSelecterYear()
  }


  useEffect(()=>{
      async function loadData1(){
	    let getYearp =JSON.stringify({ya:yearValues? yearValues: new Date().getFullYear()})
		const staticRes = await fetch(`${baseUrl}/api/v1/dashborad/dashboradStatistics`,{
			method: 'POST',
			body:getYearp,
			headers:{
			  "Content-Type":"application/json",
			}
		})
		const statResData = await staticRes.json()
		if(statResData){
            if(statResData.status === 'success'){  
              // console.log(data.data.male)
              // console.log(data.data.female)
             
                setMaleArr(statResData.data.male.length >= 1?statResData.data.male:[])
        
                setFemaleArr(statResData.data.female.length >= 1?statResData.data.female:[])

              // setDashboardValues({Male:data.data.Male?data.data.Male:[],Female:data.data.Female?data.data.Female:[]})    
            }else{
              if(statResData.status === 'fail'){
                return toast(statResData.message?statResData.message:'')
              }else{
                  if(statResData.status === 'error'){
                    return toast(statResData.message?statResData.message:'')
                  }
              }
          }      
        }
	  }
	  loadData1()
  	
  },[])
  
  
  //attendance useEffect
   useEffect(()=>{
      async function loadData2(){
			let getYearp =JSON.stringify({ya:yearValues? yearValues: new Date().getFullYear()})
			const attres = await fetch(`${baseUrl}/api/v1/dashborad/attendanceDashborad`,{
				method: 'POST',
				body:getYearp,
				headers:{
				  "Content-Type":"application/json",
				}
			})
			
			const attResData = await attres.json()
			
			 if(attResData){
				if(attResData.status === 'success'){  
					// console.log('ATTD',data.data)
					setJourney101(attResData.data.levle1.length >= 1?attResData.data.levle1:[])    
					setJourney201(attResData.data.levle2.length >= 1?attResData.data.levle2:[])
					setJourney202(attResData.data.levle3.length >= 1?attResData.data.levle3:[])
					setJourney301(attResData.data.levle4.length >= 1?attResData.data.levle4:[])
					setJourney401(attResData.data.levle5.length >= 1?attResData.data.levle5:[])
				}else{
				  if(attResData.status === 'fail'){
					return toast(attResData.message?attResData.message:'')
				  }else{
					  if(attResData.status === 'error'){
						return toast(attResData.message?attResData.message:'')
					  }
				  }
			  }      
			}
			
		}
		
		loadData2()
    
  },[])
  //End of attendance useEffect
  
  const monthDisplay = (values1,values2)=>{
    let month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let returnValues =[]
    if(values1.length >= values2.length){
      // let valueLength = values1.length;
      for(let i = 0; i < values1.length; i++){
        returnValues.push(month[i])
      }
  
    }else{
      for(let v = 0; v < values2.length; v++){
        returnValues.push(month[v])
      }
    }
    return returnValues
  }
  
  
  const chatOptions = ()=>{
    const options = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Registerd Member column chart'
      },
      xAxis: {
          categories:monthDisplay(maleArr.length >= 1?maleArr:[],femaleArr.length >= 1?femaleArr:[])
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number Of Members'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: ( // theme
                      Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color
                  ) || 'gray'
              }
          }
      },
      legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [
        {
          name: 'Male',
          data:maleArr.length >= 1?maleArr:[]
        },
        {
          name: 'Female',
          data:femaleArr.length >= 1?femaleArr:[]
        }, 
       
      ]
    }
    return options
  
  }
  

 
  	const chatOption1 = ()=>{
		const mainChat ={
		  chart: {
			type: 'column'
		  },
		  title: {
			text: 'Journey Attend Chart Report'
		  },
		  xAxis: {
			categories: monthDisplay(journey101.length >= 1?journey101:[],journey201.length >= 1?journey201:[])
		  },
		  yAxis: {
			min: 0,
			title: {
			  text: 'Number Of Members'
			},
			stackLabels: {
			  enabled: true,
			  style: {
				fontWeight: 'bold',
				color: ( // theme
				  Highcharts.defaultOptions.title.style &&
				  Highcharts.defaultOptions.title.style.color
				) || 'gray'
			  }
			}
		  },
		  legend: {
			align: 'right',
			x: -30,
			verticalAlign: 'top',
			y: 25,
			floating: true,
			backgroundColor:
			  Highcharts.defaultOptions.legend.backgroundColor || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		  },
		  tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		  },
		  plotOptions: {
			column: {
			  stacking: 'normal',
			  dataLabels: {
				enabled: true
			  }
			}
		  },
		  series: [{
			name: 'journey101',
			data: journey101.length >= 1?journey101:[]
		  }, {
			name: 'journey201',
			data: journey201.length >= 1?journey201:[]
		  }, {
			name: 'journey202',
			data: journey202.length >= 1?journey202:[]
		  }, {
			name: 'journey301',
			data: journey301.length >= 1?journey301:[]
		  }, {
			name: 'journey401',
			data: journey401.length >= 1?journey401:[]
		  }
		  ]
		}
		
		return mainChat;
	}

  // let currentYear = new Date().getFullYear() style={{width:'200px'}}
  return(
    <div>
       <div>
        <h5>Select Year</h5>
		 <CInputGroup row>
			<div className="input-group">
			  <div className="form-outline">
			  <input id="search-focus" type="number"  placeholder="YYYY" min="2017" max="2100" className="form-control" onChange={(e)=>setYearValue(e.target.valueAsNumber)} />
				
			  </div>
			  <button className="btn btn-primary " onClick={(e)=> trigerValue(e)}><FaSearch/>Search</button>
			</div>
		</CInputGroup>
        
        
      </div>
		<br/>
		<HighchartsReact
			highcharts={Highcharts}
			options={chatOptions()}
		/>
		<br/>
		<div>
		   <HighchartsReact
			highcharts={Highcharts}
			options={chatOption1()}
		  />
		</div>
    </div>
  )
  
} 

export default Dashboard
