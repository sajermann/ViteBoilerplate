import { useToken } from '../../Hooks/UseToken';

export function Logout() {
	const { clear } = useToken();
	return (
		<button type="button" onClick={clear}>
			Logout
		</button>
	);
}
