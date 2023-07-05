import Play from '../src/pages/play'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Play Page', () => {
  it('Render RPS play page', () => {
    render(<Play />)
    expect(screen.getByTestId('player-hand')).toBeInTheDocument()
    expect(screen.getByTestId('com-hand')).toBeInTheDocument()
    expect(screen.getByTestId('player-score')).toBeInTheDocument()
    expect(screen.getByTestId('com-score')).toBeInTheDocument()
    expect(screen.getByTestId('refresh')).toBeInTheDocument()
    expect(screen.getByTestId('game-winner')).toBeInTheDocument()
  })
})
