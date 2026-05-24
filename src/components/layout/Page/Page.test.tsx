import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Page } from './index';

describe('Page', () => {
  it('exposes the discipline accent on its root', () => {
    const { container } = render(<Page discipline="blog">x</Page>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--accent')).toBe('#46a758');
  });
  it('defaults to tomato accent when no discipline', () => {
    const { container } = render(<Page>x</Page>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--accent')).toBe('#e54d2e');
  });
});
