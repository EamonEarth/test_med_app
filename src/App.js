// Import necessary modules from React library
import React, { useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom components
import LandingPage from './components/Landing_Page/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/Sign_Up/SignUp';
import Navbar from './components/Navbar/navbar';
import BookingConsultation from './components/BookingConsultation/BookingConsultation';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import DoctorCard from './components/DoctorCard/DoctorCard';
import AppointmentsPage from './components/AppointmentsPage/AppointmentsPage';

// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
      <Notification>

        {/* Display the Navbar component */}
        <Navbar/>
        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define individual Route components for different pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reviews" element={<ReviewForm />} />
          {/* <Route path="/instant-consultation" element={<InstantConsultation />} /> */}
          <Route path="/book-consultation" element={<BookingConsultation />} />
          <Route path="/search/doctors" element={<AppointmentsPage />} />
          {/* <Route path="/search/doctors" element={<AppointmentForm />} /> */}

        </Routes>
      </Notification>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
