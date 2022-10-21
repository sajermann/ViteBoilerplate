/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { it, describe, expect, vi, SpyInstance } from 'vitest';
import { ToggleDarkMode } from '.';
import '../../Config/i18n';
import { DarkModeProvider, useDarkMode } from '../../Hooks/UseDarkMode';

function Mock0() {
	const { darkMode } = useDarkMode();
	return (
		<>
			<ToggleDarkMode />
			<div>{darkMode ? <span>DarkModeOn</span> : <span>DarkModeOff</span>}</div>
		</>
	);
}

function Mock1() {
	return (
		<DarkModeProvider>
			<Mock0 />
		</DarkModeProvider>
	);
}

describe('Components/ToggleDarkMode', () => {
	it(`should change dark mode`, async () => {
		(
			vi.spyOn(Storage.prototype, 'getItem') as SpyInstance<
				Array<string>,
				string | null
			>
		).mockReturnValue('true');
		const { getByText, debug } = await render(<Mock1 />);
		await fireEvent.click(await getByText('🌞'));
		expect(await getByText('DarkModeOff')).toBeInTheDocument();
		debug();

		await fireEvent.click(await getByText('🌜'));
		expect(await getByText('DarkModeOn')).toBeInTheDocument();
		debug();
	});
});
