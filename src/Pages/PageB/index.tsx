import { Navigate } from 'react-router-dom';

export default function PageB() {
	console.log('Page B, redirect for A');
	return <Navigate to="/A" />;
}
