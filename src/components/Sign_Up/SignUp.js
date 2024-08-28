import React, { useState } from 'react';
import './sign_up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [showerr, setShowerr] = useState(''); 
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setPhoneError('');

        if (!name) {
            setNameError('Name cannot be empty');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email cannot be empty');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password cannot be empty');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }

        if (!phone) {
            setPhoneError('Phone number cannot be empty');
            isValid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            setPhoneError('Phone number must be 10 digits');
            isValid = false;
        }

        return isValid;
    };

    const register = async (e) => {
        e.preventDefault(); 

        if (!validateForm()) return;

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            navigate("/");
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h2>Sign-up</h2>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="form-control" 
                                placeholder="Enter your name" 
                                aria-describedby="helpId" 
                            />
                            {nameError && <small style={{color: "red"}}>{nameError}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter your email" 
                                aria-describedby="helpId" 
                            />
                            {emailError && <small style={{color: "red"}}>{emailError}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                className="form-control" 
                                placeholder="Enter your phone number" 
                                aria-describedby="helpId" 
                            />
                            {phoneError && <small style={{color: "red"}}>{phoneError}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter your password" 
                                aria-describedby="helpId" 
                            />
                            {passwordError && <small style={{color: "red"}}>{passwordError}</small>}
                        </div>
                        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;
