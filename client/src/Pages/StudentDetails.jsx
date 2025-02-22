import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function StudentDetails() {
    const query = useParams()
    const id = query.id;
    const [student, setStudent] = useState(null)
    const fetchStudent = async () => {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        setStudent(response.data)
    }
    const sendEmail = async ()=>{
        const response = await axios.post(`http://localhost:5000/api/students/send-email/${id}`,{
            "subject": "Welcome to our platform",
            "message": "Dear student, we are excited to have you on our platform."
          }
          ,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        if(response.status === 200){
            alert('Email sent successfully')
        }
    }
    useEffect(()=>{
        fetchStudent()
    },[])

    if(null) return <div className='text-white'>Loading...</div>

  return (
    <div className='text-white'>
        <h1>{student?.name}</h1>
        <h2>{student?.email}</h2>
        <button onClick={()=>sendEmail()} className='bg-blue-600 text-white'>Send Email</button>
    </div>
  )
}
