import React from 'react'
import "./ReportsLayout.css"
import pdfReport from "/Users/eamon/DEV/test_med_app/src/components/ReportsLayout/public/Report.pdf"

const ReportsLayout = ({setShowReports}) => {

    const reports = [{
        "#": 1,
        "Doctor Name": "Dr. Capstone",
        "Speciality": "Unnecessary Components",

    }, {
        "#": 2,
        "Doctor Name": "Dr. Blackstone",
        "Speciality": "Tedious CSS",

    }
]
  return (
    <div className="reports-container">

        <div className="reports-header">
            <p>#</p>
            <p>Doctor Name</p>
            <p>Speciality</p>
            <p>View Report</p>
            <p>Download Report</p>

        </div>

        {reports.map((report, index)=>(
            <div keye={report['Doctor Name']} className="report-row"> 
            <p>{report['#']}</p>
            <p>{report['Doctor Name']}</p>
            <p>{report['Speciality']}</p>
            <p>
            <a target="_blank" href={pdfReport}>
            <button className="report-btns" >View Report </button>
            </a>
            </p>
            <p>
            <a href={pdfReport} download>
            <button className="report-btns" >Download </button>
            </a>
            </p>
                
            </div>
        ))}
        <div></div>
        <button className="close-btn btn3" onClick={()=>setShowReports(false)}>Close </button>
    </div>
  )
}

export default ReportsLayout