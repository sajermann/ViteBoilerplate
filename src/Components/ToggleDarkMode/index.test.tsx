/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, MockInstance, vi } from 'vitest';

import { DarkModeProvider, useDarkMode } from '~/hooks/useDarkMode';
import { ToggleDarkMode } from '.';
import '~/config/i18n';

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
      vi.spyOn(Storage.prototype, 'getItem') as MockInstance<
        (key: string) => string | null
      >
    ).mockReturnValue('true');
    const { getByText, debug } = await render(<Mock1 />);
    await fireEvent.click(await getByText('🌞'));
    expect(await getByText('DarkModeOff')).not.toBeNull();
    debug();

    await fireEvent.click(await getByText('🌜'));
    expect(await getByText('DarkModeOn')).not.toBeNull();
    debug();
  });
});
