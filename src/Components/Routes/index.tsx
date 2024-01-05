import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home';
import { Test } from '../../Pages/Test';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/test" element={<Test />} />
		</Routes>
	);
}
