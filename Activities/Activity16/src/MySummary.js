// Author: Logan Roe
// ISU NetID: lroe@iastate.edu
// Oct 30, 2024

import React, { useState } from "react";

function Summary({dataF, setDataF, viewer, setViewer}){
    const updateHooks = () =>{
        setViewer(0);
        setDataF({});
    };

    return (
        <div>
            <h1>Payment summary:</h1>
            <h3>{dataF.fullName}</h3>
            <p>{dataF.email}</p>
            <p>{dataF.creditCard}</p>
            <p>{dataF.address}, {dataF.address2}</p>
            <p>{dataF.city}, {dataF.state} {dataF.zip} </p>
            <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
        </div>
    );
};
    
export default Summary;