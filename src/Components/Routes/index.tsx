import { Route, Routes } from 'react-router-dom';
import { Login } from '~/Pages/Login';
import { Ticket } from '~/Pages/Ticket';
import Home from '../../Pages/Home';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/tickets" element={<Ticket />} />
		</Routes>
	);
}
