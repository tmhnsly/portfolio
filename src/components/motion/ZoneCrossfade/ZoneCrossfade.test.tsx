import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ZoneCrossfade } from './ZoneCrossfade';

describe('ZoneCrossfade', () => {
  it('renders an aria-hidden layer carrying its className and children', () => {
    const { container, getByText } = render(
      <ZoneCrossfade zoneKey="code" className="tint">hello</ZoneCrossfade>,
    );
    const el = container.querySelector('.tint');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute('aria-hidden');
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('honours the `as` tag for inline fills', () => {
    const { container } = render(<ZoneCrossfade zoneKey="x" as="span" className="fill" />);
    expect(container.querySelector('span.fill')).not.toBeNull();
  });
});
