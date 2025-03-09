import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')

	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		email: ''
	})

	const { id } = useParams();

	const navigator = useNavigate();

	useEffect(() => {
		if (id) {
			getEmployeeById(id).then((response) => {
				const employee = response.data;
				setFirstName(employee.firstName);
				setLastName(employee.lastName);
				setEmail(employee.email);
			}).catch((error) => {
				console.error(error);
			});
		}
	}, [id]);

	function pageTitle() {
		return <h2 className='text-center'> {id ? 'Update Employee' : 'Add Employee'} </h2>
	}

	function saveOrUpdateEmployee(e) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const employee = { firstName, lastName, email }
		// console.log(employee)

		// update logic
		if (id) {
			updateEmployee(employee, id).then((response) => {
				// console.log(response.data);
				navigator('/employees')
			}).catch((error) => {
				console.error(error)
			})

			return ;
		}

		// create logic
		createEmployee(employee).then((response) => {
			// console.log(response.data);
			navigator('/employees')
		}).catch((error) => {
			console.error(error);
		});
	}

	function validateForm() {
		let valid = true;

		const errorsCopy = { ...errors }

		if (firstName.trim()) {
			errorsCopy.firstName = ''
		} else {
			errorsCopy.firstName = 'First Name is required'
			valid = false
		}

		if (lastName.trim()) {
			errorsCopy.lastName = ''
		} else {
			errorsCopy.lastName = 'Last Name is required'
			valid = false
		}

		if (email.trim()) {
			errorsCopy.email = ''
		} else {
			errorsCopy.email = 'Email is required'
			valid = false
		}

		setErrors(errorsCopy);
		return valid;
	}

	return (
		<div className='container col-md-6 offset-md-3'>
			<div className='row'>
				<div className='card'>
					{ pageTitle() }
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
									className={`form-control ${ errors.firstName ? 'is-invalid' : '' }`}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								{ errors.firstName && <div className='invalid-feedback'> { errors.firstName }</div> }

								<label htmlFor='lastName' className='form-label'>Last Name:</label>
								<input
									type='text'
									placeholder='Enter Employee Last Name'
									id='lastName'
									name='lastName'
									value={lastName}
									className = { `form-control ${ errors.lastName ? 'is-invalid' : '' }` }
									onChange={(e) => setLastName(e.target.value)}
								/>
								{ errors.lastName && <div className='invalid-feedback'> { errors.lastName } </div> }

								<label htmlFor='email' className='form-label'>Email Id:</label>
								<input
									type='email'
									placeholder='Enter Employee Email Id'
									id='email'
									name='email'
									value={email}
									className= { `form-control ${ errors.email ? 'is-invalid' : '' }` }
									onChange={(e) => setEmail(e.target.value)}
								/>
								{ errors.email && <div className='invalid-feedback'> { errors.email } </div> }
							</div>

							<button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)

}

export default EmployeeComponent