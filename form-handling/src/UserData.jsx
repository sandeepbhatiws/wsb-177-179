import React from 'react'

export default function UserData({ userData }) {
    return (
        <>
            <div className='row mb-5'>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Country Name</th>
                            <th scope="col">State Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.length > 0
                                ?
                                userData.map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{v.name}</td>
                                            <td>{v.email}</td>
                                            <td>{v.mobile_number}</td>
                                            <td>{v.country_name}</td>
                                            <td>{v.state_name}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={6}>No Record Found !!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
