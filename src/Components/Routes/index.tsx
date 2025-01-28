import { Route, Routes } from 'react-router';
import Home from '~/pages/Home';
import { Test } from '~/pages/Test';


export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/test" element={<Test />} />
		</Routes>
	);
}
