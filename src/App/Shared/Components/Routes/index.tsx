import { Route, Routes } from 'react-router-dom';
import { LoginHomePage } from '~/App/Login/Pages/Home';
import { TicketHomePage } from '~/App/Ticket/Pages/Home';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/login" element={<LoginHomePage />} />
			<Route path="/tickets" element={<TicketHomePage />} />
		</Routes>
	);
}
