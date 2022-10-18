import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import PageA from '../PageA';
import PageB from '../PageB';
import PageC from '../PageC';

export default function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/A" element={<PageA />} />
			<Route path="/B" element={<PageB />} />
			<Route path="/C" element={<PageC />} />
		</Routes>
	);
}
