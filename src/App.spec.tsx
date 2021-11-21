import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders application title', () => {
  render(<App title={ 'Simple React Application on test' }/>)

  const linkElement = screen.getByText(/Simple React Application on test/i)
  expect(linkElement).toBeInTheDocument()
})
