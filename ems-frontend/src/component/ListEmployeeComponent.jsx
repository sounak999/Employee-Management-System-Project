import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();

    }, []);

    const getAllEmployees = () => {

        listEmployees().then((response) => { 
            setEmployees(response.data.sort((a, b) => a.id - b.id));
            
        }).catch((error) => {
            console.error(error);
        });
    }

    const navigator = useNavigate();

    const addEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`)
    }

    const removeEmployee = (id) => {
        deleteEmployee(id).then(() => {
            getAllEmployees();

        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <h2 className="text-center">Employee List</h2>
            <button type="button" className="btn btn-primary mg-2" onClick={addEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-info mx-2" onClick={ () => updateEmployee(employee.id) }>Update</button>
                                    <button className="btn btn-danger" onClick={ () => removeEmployee(employee.id) }>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent