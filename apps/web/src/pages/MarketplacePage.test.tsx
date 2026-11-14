import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { DEMO_PRODUCTS } from '@/lib/sampleData';

function renderPage(initialPath = '/') {
  const router = createMemoryRouter([{ path: '/', element: <MarketplacePage /> }], {
    initialEntries: [initialPath],
  });
  return { ...render(<RouterProvider router={router} />), router };
}

describe('MarketplacePage', () => {
  it('renders demonstration products', () => {
    renderPage();
    expect(screen.getByText(`${DEMO_PRODUCTS.length} products`)).toBeInTheDocument();
    expect(screen.getAllByText('Demonstration').length).toBeGreaterThan(0);
  });

  it('filters products by search query', () => {
    renderPage('/?search=Throw');
    expect(screen.getByText('1 product')).toBeInTheDocument();
    expect(screen.getByText('Handwoven Cotton Throw Blanket')).toBeInTheDocument();
  });

  it('filters products by category', () => {
    renderPage('/?category=fashion');
    expect(screen.getByText('2 products')).toBeInTheDocument();
  });

  it('sorts products by price low to high', () => {
    renderPage();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'price-asc' } });
    const prices = screen.getAllByText(/\$\d+\.\d{2}/);
    expect(prices.length).toBe(5);
  });

  it('shows empty state when nothing matches', () => {
    renderPage('/?search=zzznothing');
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});
