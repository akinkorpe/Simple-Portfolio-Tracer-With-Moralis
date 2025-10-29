import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Moralis Portfolio Tracker title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /Moralis Portfolio Tracker/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders wallet address input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter wallet address/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders fetch button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Fetch Assets/i);
  expect(buttonElement).toBeInTheDocument();
});
