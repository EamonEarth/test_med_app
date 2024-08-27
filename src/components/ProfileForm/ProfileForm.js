// Following code has been commented with appropriate comments for your reference. 
// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// Define a Function component called ProfileForm
const ProfileForm = ({setShowEditProfile}) => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();
  
  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(!editMode);
  };

useEffect(()=> {
    console.log("user details from Profile Form", userDetails)
}, [userDetails])
  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleCloseDropdown = () => {
    setShowEditProfile(false)

    // setTimeout(()=>{
    //   setShowDropdown(false)
    // }, 100)
  }

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      {editMode ? (
      <div className="profile-details">
        <form onSubmit={handleSubmit}>
          <label>
            <h3 style={{color: "#dedede"}}>Email:</h3>
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              onChange={handleInputChange}
              
            />
          </label>
          <label>
            <h3 style={{color: "#dedede"}}>Name:</h3>
            <input
              type="name"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <h3 style={{color: "#dedede"}}>Phone:</h3>
            <input
              type="phone"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          {/* Create similar logic for displaying and editing name and phone from userDetails */}
          <button type="submit">Save</button>
          <button type="button" onClick={handleEdit}>Cancel</button>
        </form>
        </div>
      ) : (
        <div className="profile-details">
          <div style={{position: "absolute", top: "2px", right: "2px", zIndex: "100", pointerEvents: "all"}}><X size="24" onClick={handleCloseDropdown}/></div>
          <h1>Welcome, {userDetails.name}</h1>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone}</p>
          <button 
          
          onClick={handleEdit}
          >Edit</button>
        </div>
      )}
    </div>
  );
};

// Export the ProfileForm component as the default export
export default ProfileForm;
