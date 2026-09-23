/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as useTestMock from '~/hooks/useTest';

import { TestProvider } from '~/hooks/useTest';
import { Test } from '.';

function Mock() {
  return <Test />;
}

describe('Pages/Test', () => {
  it(`should render list items`, async () => {
    vi.spyOn(useTestMock, 'useTest').mockImplementation(() => ({
      toggleDarkMode: () => 'Essa função está mocada',
      darkMode: true,
    }));

    const { getByText } = render(
      <TestProvider>
        <Mock />
      </TestProvider>,
    );
    fireEvent.click(getByText('Batata'));
    await waitFor(() => {
      expect(getByText('Essa função está mocada')).not.toBeNull();
    });
  });
});
