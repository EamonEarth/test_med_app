import React, { useEffect, useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { Search } from 'lucide-react';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const DoctorSearch = ({onSearch}) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);

        setDoctorResultHidden(true);
        navigate(`/book-consultation?speciality=${speciality}`);
        window.location.reload();
    }

    useEffect(() => {
        if (searchDoctor === "") {
            setSpecialities(initSpeciality);
        } else {
            const filteredSpecialities = initSpeciality.filter((item) =>
                item.toLowerCase().includes(searchDoctor.toLowerCase())
            );
            setSpecialities(filteredSpecialities);
        }
    }, [searchDoctor]);
    return (
        <div className='finddoctor'>
            <center>
                <h1>Search for a doctor</h1>
                <div>               
                    <i style={{color:'#000000',fontSize:'20rem'}} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                        

                        <input type="text" className="search-doctor-input-box" placeholder="Search by speciality" 
                        onFocus={() => setDoctorResultHidden(false)} 
                        onBlur={() => setDoctorResultHidden(true)} 
                        value={searchDoctor} 
                        onChange={(e) => setSearchDoctor(e.target.value)} 
                        />
                        
                      <Search color="black" className="search-icon findiconimg"/>
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{height:"10px", width:"10px"}} width="12" /></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default DoctorSearch