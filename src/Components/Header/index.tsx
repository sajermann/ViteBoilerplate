import { SelectLanguage } from '../SelectLanguage';
import { ToggleDarkMode } from '../ToggleDarkMode';

export function Header() {
	return (
		<header className="bg-slate-900 flex justify-between items-center p-4	text-white">
			<h1>Vite Boilerplate</h1>
			<ToggleDarkMode />
			<SelectLanguage />
		</header>
	);
}
