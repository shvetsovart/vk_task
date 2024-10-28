import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RepositoryItem from './RepositoryItem';

describe('RepositoryItem Component', () => {
  const sampleRepo = {
    id: 1,
    name: 'sample-repo',
    description: 'Sample description',
    language: 'TypeScript',
    stargazers_count: 42,
    forks_count: 10,
    html_url: 'https://github.com/sample-repo',
  };

  it('renders repository data correctly', () => {
    render(<RepositoryItem repo={sampleRepo} />);
    expect(screen.getByText('sample-repo')).toBeInTheDocument();
    expect(screen.getByText('Sample description')).toBeInTheDocument();
    expect(screen.getByText('Language: TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Stars: 42')).toBeInTheDocument();
    expect(screen.getByText('Forks: 10')).toBeInTheDocument();
  });

  it('renders link to the repository', () => {
    render(<RepositoryItem repo={sampleRepo} />);
    const link = screen.getByRole('link', { name: 'View Repository' });
    expect(link).toHaveAttribute('href', 'https://github.com/sample-repo');
  });

  it('allows editing repository details', () => {
    render(<RepositoryItem repo={sampleRepo} />);
    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByPlaceholderText('Name');
    fireEvent.change(input, { target: { value: 'new-repo-name' } });
    expect(input).toHaveValue('new-repo-name');
  });
});
