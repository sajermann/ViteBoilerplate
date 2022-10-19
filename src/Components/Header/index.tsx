import { SelectLanguage } from '../SelectLanguage';

export function Header() {
	return (
		<header className="bg-slate-900 flex justify-between items-center p-4">
			<h1>Vite Boilerplate</h1>
			<SelectLanguage />
		</header>
	);
}
