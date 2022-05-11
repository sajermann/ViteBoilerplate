import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './index';

function Mock() {
	return <Home />;
}

describe('Pages/Users/UserAdd', () => {
	test(`Must contain the Batata`, () => {
		render(<Mock />);
		expect(screen.getByTestId("Batata")).toBeInTheDocument();
	});
});
