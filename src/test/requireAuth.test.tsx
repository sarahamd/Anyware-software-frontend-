import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../components/Dashboard/Dashboard';
import { requireAuth } from '../components/requireAuth';
import { login } from '../store/authSlice';

const Protected = requireAuth(() => <div>protected</div>);

test('redirects to home when not logged in', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Protected />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

test('shows protected when logged in', () => {
  store.dispatch(login());
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<Protected />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/protected/i)).toBeInTheDocument();
});
