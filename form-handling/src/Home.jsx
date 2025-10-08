import React, { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import UserForm from './UserForm';
import UserData from './UserData';

export default function Home() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [userData, setUserData] = useState(userInfo ?? []);

    return (
        <>
            <ToastContainer />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row text-center p-4'>
                        <h1>Enquiry Form</h1>
                    </div>

                    <UserForm userData={userData} setUserData={setUserData}/>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='container'>
                    <div className='row text-center p-4'>
                        <h1>User Data</h1>
                    </div>

                    <UserData userData={userData} />
                </div>
            </div>
        </>
    )
}
