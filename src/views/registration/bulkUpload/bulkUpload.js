/* eslint-disable prettier/prettier */
import React,{useState, useRef} from "react"
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CInputGroup,
  
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
// import axios from 'axios';
import baseUrl from '../../../config/config'
import * as XLSX from  'xlsx'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaFileUpload} from "react-icons/fa"
const BulkUpload = ()=>{
    const [fileValues,setFileValue]  = useState({filee:""})
    const ref = useRef()
    const [datas,setDatas]  = useState([])
    // const [failData,setfailData]  = useState([])
    const formData = new FormData()

   

   const preview = (file)=>{
       const promies = new Promise((resolve,reject)=>{
           const fileReader = new FileReader();
           fileReader.readAsArrayBuffer(file);

           fileReader.onload = (e)=>{
               const myFile = e.target.result;

               const wb = XLSX.read(myFile,{type:'buffer'});
               const ws = wb.Sheets[wb.SheetNames[0]];

               const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
                    
                
           }

           fileReader.onerror = (error)=>{
               reject(error)
           }
       })

       promies.then((d)=>{
           console.log(d)
           setDatas(d)
       }).catch((e)=>console.log(e))
   }


   formData.append('file',fileValues.filee)
    
   const sendFile = async (e)=>{
       e.preventDefault()
	   if(fileValues.filee === ""){
		   return toast('File Not Selected...')
	   }
		let sendData = JSON.stringify(datas)
		console.log(datas)

        let token = JSON.parse(localStorage.getItem('Token'));

        const reponesUP =  await fetch(`${baseUrl}/api/v1/member/bulkUpload`,{
            method: 'POST',
            body:sendData,
            headers:{
                "Content-Type":"application/json",
                'authorization':`Bearer ${token}`
            }
        
        })
		const resData = await reponesUP.json()
		if(resData){
			if(resData.status === 'success'){
			  return toast('Upload successful')
			}else{		                 
				return toast(resData.message?resData.message:'')
			}
		}
   }		
        // .then((res)=>res.json())
        // .then((data)=>{ 
            // console.log(data)
            // if(data){
                // if(data.status === 'success'){
                  // return toast('Upload successful')
                // }else{
                    // if(data.status === 'fail'){
                        // setfailData(data.data.length >= 1?data.data:[])                     
                      // return toast(data.message?data.message:'')
                    // }else{
                        // if(data.status === 'error'){
                          // return toast(data.message?data.message:'')
                        // }
                    // }

                // }
            // }
        // })
        // .catch((err)=>{
            // if(err){
            // console.log(err) 
            // alert(err)
            // }
        // })
      

   

   //convert excel date serial int to Date
    const ExcelDateToJSDate = (serial)=>{
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }

    return(
        <>
        <CCard>
        <CCardHeader>
            <h5>Make your bulk upload here</h5>
        </CCardHeader>
        <CCardBody>
                   
			 <div className="alert alert-warning" role="alert">
				 Only an Excel file is accepted
			</div>                              
            <br/>
			<div className="form-group">
				<input type="file" className="form-control" id="customFile"  onChange={(e)=>{
					const file = e.target.files[0];
					setFileValue({filee:file})
					preview(file)
				}} ref={ref}/>
				
			</div>
           
            <br/>
            {/* //setFileValue({file:e.target.files[0]}) */}
            <div style={{overflowX:'auto'}} className="table-responsive-xl">    
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">RegNumber</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Address</th>
                        <th scope="col">PhoneNo</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Email</th>
                        <th scope="col">Dob</th>
                        <th scope="col">MaritalStatus</th>
                        <th scope="col">WeddingAnniversary</th>
                        <th scope="col">Occupation</th>
					    <th scope="col">Business</th>
                        <th scope="col">Expertise</th>
                        <th scope="col">DateJoinedTKA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((e,i)=>{
                            return(
                            <tr key={i}>
                                <td>{e.RegNumber}</td>
                                <td>{e.Firstname}</td>
                                <td>{e.Surname}</td>
                                <td>{e.Address}</td>
                                <td>{e.PhoneNo}</td>
                                <td>{e.Sex}</td>
                                <td>{e.Email}</td>
                                <td>{e.Dob?new Date(ExcelDateToJSDate(e.Dob)).toLocaleDateString():''}</td>
                                <td>{e.MaritalStatus}</td>
                                <td>{e.WeddingAnniversary?new Date(ExcelDateToJSDate(e.WeddingAnniversary)).toLocaleDateString():''}</td>
                                <td>{e.Occupation}</td>
								<td>{e.Business}</td>
                                <td>{e.Expertise}</td>
                                <td>{e.DateJoinedTKA?new Date(ExcelDateToJSDate(e.DateJoinedTKA)).toLocaleDateString():''}</td>
                            </tr>)
                        })}
                        
                    </tbody>
                    </table>
            </div>
        </CCardBody>
        <CCardFooter>
        <button className="btn btn-primary px-4"  onClick={(e)=>sendFile(e)} ><FaFileUpload/>Upload</button>
          <button  className="btn btn-danger" onClick={(e)=>{
                e.preventDefault()
                ref.current.value = ""
              }} ><CIcon name="cil-ban" /> Reset</button>
          <ToastContainer/>
        </CCardFooter>
      </CCard>
      </>
    )
}
export default BulkUpload