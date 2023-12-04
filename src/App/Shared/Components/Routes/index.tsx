import { Route, Routes } from 'react-router-dom';
import { LoginHomePage } from '~/App/Login/Pages/Home';
import { TicketsPage } from '~/App/Ticket/Pages/Home';
import { TicketPage } from '~/App/Ticket/Pages/Ticket';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/login" element={<LoginHomePage />} />
			<Route path="/tickets" element={<TicketsPage />} />
			<Route path="/ticket/:id" element={<TicketPage />} />
		</Routes>
	);
}
