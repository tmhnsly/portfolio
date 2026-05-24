import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Media } from './Media';

describe('Media', () => {
  it('renders an img with alt when src is present', () => {
    render(<Media src="/images/projects/boucle/cover.jpg" alt="Boucle cover" ratio="16/10" sizes="100vw" />);
    expect(screen.getByRole('img', { name: 'Boucle cover' })).toBeInTheDocument();
  });
  it('falls back to a gradient placeholder when no src', () => {
    const { container } = render(<Media grad="linear-gradient(135deg,#dd4a2e,#6b1d1a)" ratio="4/3" alt="" />);
    expect(container.querySelector('img')).toBeNull();
  });
});
