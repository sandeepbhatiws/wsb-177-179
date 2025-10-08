import React, { useState } from 'react'
import stateDatas from './states';

export default function UserForm({userData, setUserData}) {

    const [stateData, setStateData] = useState([]);

    const formHandler = (event) => {
        event.preventDefault();

        console.log(userData);

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            mobile_number: event.target.mobile_number.value,
            country_name: event.target.country.value,
            state_name: event.target.state.value
        }

        console.log(data);
        var finalData = [data, ...userData];
        setUserData(finalData);
        localStorage.setItem('userInfo', JSON.stringify(finalData))

        event.target.name.value = '';
        event.target.email.value = '';

        event.target.reset();
        setStateData([]);
        toast.success('Data submitted succussfully.', {

        });
    }

    const filterStates = (event) => {
        const finalData = stateDatas.filter((v) => {
            if (v.country_name == event.target.value) {
                return v;
            }
        })

        setStateData(finalData);
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <form onSubmit={formHandler} autoComplete='off'>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name='name' autoComplete='off' />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name='email' />
                        </div>
                        <div class="mb-3">
                            <label for="mobile_number" class="form-label">Mobile Number</label>
                            <input type="text" class="form-control" id="mobile_number" name='mobile_number' />
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">Select Country</label>
                            <select id="country" class="form-control" name="country" onChange={filterStates}>
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="Canada">Canada</option>
                                <option value="Austraila">Austraila</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="state" class="form-label">Select State</label>
                            <select id="state" class="form-control" name="state">
                                <option value="">Select State</option>
                                {
                                    stateData.map((v, i) => {
                                        return (
                                            <option value={v.name}>{v.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className='col-md-2'></div>

            </div>
        </>
    )
}
