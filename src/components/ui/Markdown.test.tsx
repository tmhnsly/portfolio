import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Markdown } from './Markdown';

describe('Markdown', () => {
  it('renders headings, paragraphs and blockquotes', () => {
    render(<Markdown>{'## Title\n\nBody text\n\n> Quote'}</Markdown>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title');
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText(/Quote/)).toBeInTheDocument();
  });
});
