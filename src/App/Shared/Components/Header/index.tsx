import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SelectLanguage } from '../SelectLanguage';
import { ToggleDarkMode } from '../ToggleDarkMode';
import { Logout } from '../Logout';
import { UserInfo } from '../UserInfo';

export function Header() {
	const location = useLocation();
	const [showHeader, setShowHeader] = useState(false);
	useLayoutEffect(() => {
		setShowHeader(location.pathname !== '/login');
	}, [location.pathname]);

	if (!showHeader) return null;
	return (
		<header className="bg-slate-900 h-20 flex justify-between items-center p-4	text-white">
			<h1 className="font-bold text-4xl">Mini Help Desk</h1>
			<ToggleDarkMode />
			<SelectLanguage />
			<UserInfo />
			<Logout />
		</header>
	);
}
