import { Link, useNavigate } from 'react-router-dom';

export default function Poc() {
	const navigate = useNavigate();
	return (
		<header>
			<p>
				<Link to="/A">page A</Link>
			</p>
			<p>
				<Link to="/B">page B</Link>
			</p>
			<p>
				{/* <Link to="/C">page C</Link> */}
				<button type="button" onClick={() => navigate('/C')}>
					Ir pra C
				</button>
			</p>
		</header>
	);
}
