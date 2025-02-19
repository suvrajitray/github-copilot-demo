import { render, screen } from '@testing-library/react';
import { PlayerCard } from '../PlayerCard';

describe('PlayerCard', () => {
  const mockPlayer = {
    id: 1,
    name: 'Test Player',
    fullName: 'Test Player Full Name',
    born: '1990-01-01',
    age: '33 years',
    battingStyle: 'Right Handed',
    bowlingStyle: 'Right-arm fast',
    playingRole: 'Bowler',
    image: 'test-image.jpg'
  };

  it('renders player information correctly', () => {
    render(<PlayerCard player={mockPlayer} />);

    expect(screen.getByText(mockPlayer.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockPlayer.age)).toBeInTheDocument();
    expect(screen.getByText(mockPlayer.playingRole)).toBeInTheDocument();
    expect(screen.getByText(mockPlayer.battingStyle)).toBeInTheDocument();
    expect(screen.getByText(mockPlayer.bowlingStyle)).toBeInTheDocument();
  });

  it('handles image load error correctly', () => {
    render(<PlayerCard player={mockPlayer} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPlayer.image);

    // Simulate image load error
    img.dispatchEvent(new Event('error'));

    expect(img).toHaveAttribute('src', '/profile.png');
  });
});