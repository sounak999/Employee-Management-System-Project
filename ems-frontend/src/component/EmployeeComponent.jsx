import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const navigator = useNavigate()

  function saveEmployee(e) {
    e.preventDefault();
    const employee = { firstName, lastName, email }
    // console.log(employee)

    createEmployee(employee).then((response) => {
      // console.log(response.data);
      navigator('/employees')
    });
  }

  return (
    <div className='container col-md-6 offset-md-3'>
      <div className='row'>
        <div className='card'>
          <h2 className='text-center'>Add Employee</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label htmlFor='firstName' className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  id='firstName'
                  name='firstName'
                  value={firstName}
                  className='form-control'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastName' className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Last Name'
                  id='lastName'
                  name='lastName'
                  value={lastName}
                  className='form-control'
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor='email' className='form-label'>Email Id:</label>
                <input
                  type='email'
                  placeholder='Enter Employee Email Id'
                  id='email'
                  name='email'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default EmployeeComponent