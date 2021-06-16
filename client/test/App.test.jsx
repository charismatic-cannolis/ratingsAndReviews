/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/components/App.jsx';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText('Question and Answers')).toBeInTheDocument();
  });
});