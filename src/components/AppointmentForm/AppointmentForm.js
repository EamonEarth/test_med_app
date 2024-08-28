import React, { useState } from 'react';
import "../DoctorCard/DoctorCard.css";
import "./AppointmentForm.css"

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, updateNotification }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      phoneNumber,
      appointmentDate,
      appointmentTime,
      doctorName,
      doctorSpeciality,
    };

    sessionStorage.setItem(doctorName, JSON.stringify(appointmentData));
    sessionStorage.setItem('doctorName', doctorName); // Store the doctor name in session storage

    if (onSubmit) {
      onSubmit(appointmentData);
    }

    // Trigger notification update
    // if (updateNotification) {
    //   updateNotification();
    // }

    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div>
        <h4>{doctorName}</h4>
        <h5>{doctorSpeciality}</h5>
      </div>
      <div className="form-group">
        <label htmlFor="name">Patient's Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
