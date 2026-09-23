/**
 * @vitest-environment jsdom
 */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Home from './index';

function Mock() {
  return <Home />;
}

describe('Pages/Home', () => {
  it(`should render list items`, () => {
    const { getByText } = render(<Mock />);
    expect(getByText('Bruno')).not.toBeNull();
    expect(getByText('Marcia')).not.toBeNull();
  });

  it(`should add new item to the list`, async () => {
    const { getByText, debug, getByTestId, findByText } = render(<Mock />);
    const inputElement = getByTestId('inputNewItem');
    const addButton = getByText('ADD');
    debug();
    await userEvent.type(inputElement, 'Dereck');
    await userEvent.click(addButton);
    expect(await findByText('Dereck')).not.toBeNull();
  });

  it(`should remove item to the list`, async () => {
    const { getAllByText, debug, queryByText } = render(<Mock />);
    const removeButton = getAllByText('REMOVE');
    debug();
    await userEvent.click(removeButton[0]);
    await waitFor(() => {
      expect(queryByText('Bruno')).not.not.toBeNull();
    });
  });

  it(`should not add repeat item`, async () => {
    const { getByText, debug, getByTestId, findAllByText } = render(<Mock />);
    const inputElement = getByTestId('inputNewItem');
    const addButton = getByText('ADD');
    debug();
    await userEvent.type(inputElement, 'Bruno');
    await userEvent.click(addButton);
    await waitFor(async () => {
      const items = await findAllByText('Bruno');
      expect(items.length).toBe(1);
    });
  });
});
