import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';

describe('App router provider', () => {
  it('renders without a router-context exception', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getAllByText(/Bag Of Rice/i).length).toBeGreaterThan(0);
  });

  it('renders the homepage route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getAllByText(/Bag Of Rice/i).length).toBeGreaterThan(0);
  });
});
