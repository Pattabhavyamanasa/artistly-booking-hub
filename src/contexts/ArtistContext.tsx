import React, { createContext, useContext, useState } from 'react';

interface Artist {
  id: string;
  name: string;
  category: string;
  description: string;
  skills: string[];
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface ArtistContextProps {
  artists: Artist[];
}

const ArtistContext = createContext<ArtistContextProps>({
  artists: [],
});

const useArtist = () => {
  return useContext(ArtistContext);
};

const ArtistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artists] = useState<Artist[]>([
    {
      id: '1',
      name: 'DJ Mike',
      category: 'DJ',
      description: 'Professional DJ with 10+ years of experience in weddings and corporate events.',
      skills: ['House Music', 'Hip Hop', 'Wedding Music'],
      location: 'Downtown, Los Angeles',
      price: 800,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      category: 'Singer',
      description: 'Soulful vocalist specializing in jazz, R&B, and contemporary music.',
      skills: ['Jazz', 'R&B', 'Soul'],
      location: 'Beverly Hills, CA',
      price: 600,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Jazz Ensemble',
      category: 'Band',
      description: 'Classic jazz ensemble perfect for elegant events and sophisticated gatherings.',
      skills: ['Jazz', 'Classical', 'Swing'],
      location: 'West Hollywood, CA',
      price: 1200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Acoustic Harmony',
      category: 'Band',
      description: 'Acoustic duo providing beautiful harmonies for intimate events.',
      skills: ['Acoustic', 'Folk', 'Pop'],
      location: 'Santa Monica, CA',
      price: 500,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1543760749-5d355a419c21?w=400&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'Electric Pulse',
      category: 'DJ',
      description: 'High-energy DJ specializing in electronic dance music and club anthems.',
      skills: ['EDM', 'Techno', 'House'],
      location: 'Hollywood, CA',
      price: 900,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1584231010874-1c4429834914?w=400&h=300&fit=crop'
    },
    {
      id: '6',
      name: 'Maria Rodriguez',
      category: 'Singer',
      description: 'Versatile singer covering pop, rock, and country hits.',
      skills: ['Pop', 'Rock', 'Country'],
      location: 'Venice, CA',
      price: 550,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1547948803-dca99b5b1e75?w=400&h=300&fit=crop'
    },
    {
      id: '7',
      name: 'String Serenade',
      category: 'Band',
      description: 'String quartet providing elegant music for weddings and formal events.',
      skills: ['Classical', 'Wedding Music', 'Chamber Music'],
      location: 'Pasadena, CA',
      price: 1100,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1576766491415-0744c46c4413?w=400&h=300&fit=crop'
    },
    {
      id: '8',
      name: 'Retro Revival',
      category: 'Band',
      description: 'Vintage band playing hits from the 50s, 60s, and 70s.',
      skills: ['Rock n Roll', 'Motown', 'Disco'],
      location: 'Long Beach, CA',
      price: 700,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1605492484344-4494272144d1?w=400&h=300&fit=crop'
    },
    {
      id: '9',
      name: 'Global Beats',
      category: 'DJ',
      description: 'World music DJ blending sounds from around the globe.',
      skills: ['World Music', 'Latin', 'African'],
      location: 'Culver City, CA',
      price: 850,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1541424443423-f35936ca9623?w=400&h=300&fit=crop'
    },
    {
      id: '10',
      name: 'Harmony Voices',
      category: 'Singer',
      description: 'A cappella group performing stunning vocal arrangements.',
      skills: ['A cappella', 'Vocal Harmony', 'Gospel'],
      location: 'Glendale, CA',
      price: 650,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526666934485-c91f45c6596f?w=400&h=300&fit=crop'
    }
  ]);

  const value = {
    artists
  };

  return (
    <ArtistContext.Provider value={value}>
      {children}
    </ArtistContext.Provider>
  );
};

export { ArtistProvider, useArtist };
