import React from 'react';
import "./sign_up.css";

const SignUp = () => {
  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid"> 
        <div className="signup-text"> 
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}> 
          Already a member? 
          <span>
            <a href="/login" style={{ color: '#2190FF' }}> Login</a>
          </span>
        </div>
        <div className="signup-form"> 
          <form> 
            <div className="form-group"> 
              <label htmlFor="name">Name</label> 
              <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" />
            </div>

            <div className="form-group"> 
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" pattern="\d{10}" title="Please enter exactly 10 digits" /> 
            </div>

            <div className="form-group"> 
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" /> 
            </div>

            <div className="form-group"> 
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" minLength="6" />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> 
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button> 
            </div>
          </form> 
        </div>
      </div>
    </div>
  );
}

export default SignUp;
