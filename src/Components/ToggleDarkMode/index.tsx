import { useDarkMode } from '../../Hooks/UseDarkMode';

export function ToggleDarkMode() {
	const { darkMode, toggleDarkMode } = useDarkMode();
	return (
		<button onClick={toggleDarkMode} type="button">
			{!darkMode && '🌜'}
			{darkMode && '🌞'}
		</button>
	);
}
