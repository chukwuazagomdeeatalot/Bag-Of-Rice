import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Brand } from '@/components/common/Brand';

describe('Brand', () => {
  it('renders the brand name', () => {
    render(<Brand />);
    expect(screen.getByText('Bag Of Rice')).toBeInTheDocument();
  });

  it('renders the slogan when requested', () => {
    render(<Brand showSlogan />);
    expect(screen.getByText('One Platform. Endless Opportunities.')).toBeInTheDocument();
  });

  it('renders the shopping bag icon', () => {
    const { container } = render(<Brand />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
