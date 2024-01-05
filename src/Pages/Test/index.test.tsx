/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { Test } from './index';
import { TestProvider } from '../../Hooks/UseTest';

vi.mock('../../Hooks/UseTest', async () => {
	const mod = await vi.importActual<any>('../../Hooks/UseTest');
	return {
		...mod,
		useTest: () => ({
			toggleDarkMode: () => 'Essa função está mocada',
		}),
	};
});

function Mock() {
	return <Test />;
}

describe('Pages/Test', () => {
	it(`should render list items`, async () => {
		const { getByText } = render(
			<TestProvider>
				<Mock />
			</TestProvider>
		);
		fireEvent.click(getByText('Batata'));
		await waitFor(() => {
			expect(getByText('Essa função está mocada')).toBeInTheDocument();
		});
	});
});
