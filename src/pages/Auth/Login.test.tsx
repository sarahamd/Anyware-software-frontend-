import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import authReducer from '../../store/authSlice'

// Mock store
const mockStore = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the dispatch
vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}))

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText('Login to Your Account')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('validates email input', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    // Wait for the validation to complete and error message to appear
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument()
  })

  it('shows required error when email is empty', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    // Wait for the validation to complete
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    // Mock the loginUser action to resolve successfully
    const mockLoginUser = vi.fn().mockResolvedValue({})
    vi.mock('../../store/authSlice', async (importOriginal) => {
      const actual = await importOriginal()
      return {
        ...actual,
        loginUser: () => mockLoginUser,
      }
    })

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    // Check that no validation errors are displayed
    await waitFor(() => {
      expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument()
    })
  })
})