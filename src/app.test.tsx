import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from './app';
import { repositoryStore } from './stores/RepositoryStore';

describe('App Component', () => {
  it('renders repositories', async () => {
    repositoryStore.repositories = [
      { id: 1, name: 'Repo A', stargazers_count: 50, forks_count: 20, language: 'TypeScript', description: '', html_url: 'https://github.com/repoA' },
      { id: 2, name: 'Repo B', stargazers_count: 30, forks_count: 15, language: 'JavaScript', description: '', html_url: 'https://github.com/repoB' },
    ];

    await act(async() => {
        render(<App />);
    });

    await waitFor(() => {
        expect(screen.getByText('Repo A')).toBeInTheDocument();
        expect(screen.getByText('Repo B')).toBeInTheDocument();
    });
  });

  it('sorts repositories by stars', async () => {
    repositoryStore.repositories = [
      { id: 1, name: 'Repo A', stargazers_count: 50, forks_count: 20, language: 'TypeScript', description: '', html_url: 'https://github.com/repoA' },
      { id: 2, name: 'Repo B', stargazers_count: 30, forks_count: 15, language: 'JavaScript', description: '', html_url: 'https://github.com/repoB' },
    ];

    await act(async() => {
        render(<App />);
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'stargazers_count' } });

    await waitFor(() => {
        const items = screen.getAllByRole('heading', { level: 2 });
        expect(items[0]).toHaveTextContent('Repo A');
        expect(items[1]).toHaveTextContent('Repo B');
    });
  });

//   it('item editing', () => {
//     repositoryStore.repositories = [
//         { id: 1, name: "Repo 1", stargazers_count: 10, forks_count: 5, language: "TypeScript", description: "Description 1", html_url: 'https://github.com/Repo1' },
//     ];


//   });
});
