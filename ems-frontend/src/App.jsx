import './App.css'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<>
			<BrowserRouter>
				<HeaderComponent />
				<Routes>
					<Route path="/" element={<ListEmployeeComponent />} />
					<Route path='/employees' element={<ListEmployeeComponent />} />
				</Routes>
				<FooterComponent />
			</BrowserRouter>
		</>
	)
}

export default App