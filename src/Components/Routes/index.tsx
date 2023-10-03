import { Route, Routes } from 'react-router-dom';
import { Login } from '~/Pages/Login';
import Home from '../../Pages/Home';
import { Test } from '../../Pages/Test';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
