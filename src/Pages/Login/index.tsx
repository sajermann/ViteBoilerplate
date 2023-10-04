import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '~/Components/Login/Form';
import { CONSTANTS } from '~/Constants';
import { useToken } from '~/Hooks/UseToken';

export function Login() {
	const navigate = useNavigate();
	const { accessToken } = useToken();

	useEffect(() => {
		if (accessToken) {
			navigate(CONSTANTS.URL.ROOT);
		}
	}, [accessToken]);

	if (accessToken) return null;

	return (
		<div className="flex items-center justify-center p-32 h-full">
			<div className="flex items-center justify-center flex-col gap-6 border rounded-xl p-16 w-96">
				<h1 className="font-extrabold text-5xl">Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}
