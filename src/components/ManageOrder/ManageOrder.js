import React, { useEffect, useState } from 'react';

const ManageOrder = () => {
    const[services, setServices]= useState([])

    useEffect( ()=>{
        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    } ,[])

    const handleDelete= id=>{
        const url = `http://localhost:5000/services/${id}`
        fetch(url,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <div>
            <h2>Here Services are manages.....</h2>
            {
                services.map(service=><div key={service._id}>
                    <h2>{service.name}</h2>
                    <button onClick={ ()=>handleDelete(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageOrder;