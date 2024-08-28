import React, { useEffect, useState } from 'react'
import BookingConsultation from '../BookingConsultation/BookingConsultation'
import "./AppointmentsPage.css"

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState()

  useEffect(() => {
    const doctorName = sessionStorage.getItem("doctorName");
    const appointmentInfo = sessionStorage.getItem(doctorName);
    
    // Check if appointmentInfo exists and is not null
    if (appointmentInfo) {
      try {
        console.log(appointmentInfo)
        // Parse the JSON string back into an array
        const parsedAppointments = JSON.parse(appointmentInfo);
        setAppointments(parsedAppointments);
      } catch (error) {
        console.error("Error parsing appointments from sessionStorage:", error);
      }
    }
  },[] );
  
  useEffect(()=>{
    console.log("appoints from state", appointments)
  }, [appointments])
  
  const handleCancel = () => {
    const doctorName = sessionStorage.getItem("doctorName");
    sessionStorage.removeItem(doctorName)
    sessionStorage.removeItem("doctorName")
    
    setAppointments();
  };
  return (
    <div className="appointments-page-container">
      
      {appointments  && (
                <div className="appointments-display">
                  <h3>Your Appointments</h3>
                  <div className="details-frame">
                      <p>Doctor's Name: {appointments.doctorName}</p>
                      <p>Phone Number: {appointments.phoneNumber}</p>
                      <p>Date: {appointments.appointmentDate}</p>
                      <p>Time: {appointments.appointmentTime}</p>
                      <button onClick={() => handleCancel(appointments.id)}>Cancel Appointment</button>
                  </div>
                </div>

      )}


      <div className="move-books">
        <BookingConsultation />
      </div>
    </div>
  )
}

export default AppointmentsPage