import ForgotPassword from '../src/pages/forgotpassword'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('forgotpassword Page', () => {
  it('Render RPS forgotpassword page', () => {
    render(<ForgotPassword />)
    expect(screen.getByTestId('form1')).toBeInTheDocument()
  })
})
