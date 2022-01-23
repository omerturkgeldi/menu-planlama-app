import React from 'react'
// import "./weeklyCalendar.css";
// import "../weeklyCalendar.css"
import { useState } from "react";


function HaftalikMenu() {

    const [selectedDate, setSelecetedDate] = useState(new Date().getTime());
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);

    console.log(selectedDate);
    console.log(new Date(selectedDate).getDay());
    console.log(new Date(selectedDate));



    return (
        <div className='container mt-5'>
            <h1>Week View Calendar with react</h1>
            <br />
            <h2>Example</h2>
            <br />
        </div>
    )
}

export default HaftalikMenu
