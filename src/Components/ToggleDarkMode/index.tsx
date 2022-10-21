import { useDarkMode } from '../../Hooks/UseDarkMode';

export function ToggleDarkMode() {
	const { darkMode, toggleDarkMode } = useDarkMode();
	return (
		<button onClick={toggleDarkMode} type="button" className="text-2xl">
			{!darkMode && '🌜'}
			{darkMode && '🌞'}
		</button>
	);
}
