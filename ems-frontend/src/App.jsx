import './App.css'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './component/EmployeeComponent'

function App() {
	return (
		<>
			<BrowserRouter>
				<HeaderComponent />
				<Routes>
					{/* http://localhost:3000 */}
					<Route path="/" element={ <ListEmployeeComponent /> } />

					{/* http://localhost:3000/employees */}
					<Route path='/employees' element={ <ListEmployeeComponent /> } />

					{/* http://localhost:3000/add-employee */}
					<Route path='/add-employee' element={ <EmployeeComponent /> } />

					{/* http://localhost:3000/edit-employee/1 */}
					<Route path='/edit-employee/:id' element={ <EmployeeComponent /> } />

				</Routes>
				<FooterComponent />
			</BrowserRouter>
		</>
	)
}

export default App