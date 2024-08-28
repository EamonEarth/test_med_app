import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const updateNotification = () => {
    const storedDoctorName = sessionStorage.getItem('doctorName'); // Use sessionStorage to get the key
    const storedAppointmentData = storedDoctorName ? JSON.parse(sessionStorage.getItem(storedDoctorName)) : null;

    if (storedAppointmentData) {
      setDoctorData({ name: storedAppointmentData.doctorName, speciality: storedAppointmentData.doctorSpeciality });
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    updateNotification(); // Call this when component mounts
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    updateNotification(); 
  }, []);

  
  

  return (
    <div>
      {children}
      {showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-content">
            <h3>Appointment Notification</h3>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Date:</strong> {appointmentData?.appointmentDate}</p>
            <p><strong>Time:</strong> {appointmentData?.appointmentTime}</p>
            <button onClick={handleCloseNotification} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
