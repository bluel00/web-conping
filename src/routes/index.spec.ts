import { render } from '@testing-library/svelte';
import Index from './index.svelte';

describe('Home', () => {
  const renderHomePage = () => render(Index);

  it('renders titles', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('Welcome to SvelteKit');

    expect(container).toHaveTextContent('상품리스트');
  });

  it('renders a link to 상품리스트 page', () => {
    const { getByText } = renderHomePage();

    expect(getByText('상품리스트')).toHaveAttribute('href', '/products');
  });

});
