import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageC() {
	const navigate = useNavigate();

	useEffect(() => {
		console.log('Page C, redirect for A');
		navigate('/A', { replace: true });
	}, []);

	return null;
}
