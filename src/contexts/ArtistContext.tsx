
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Artist {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  skills: string[];
  experience: string;
  availability: string;
}

export interface ArtistSubmission {
  id: string;
  name: string;
  email: string;
  category: string;
  location: string;
  price: number;
  description: string;
  skills: string[];
  experience: string;
  submittedAt: string;
}

interface ArtistContextType {
  artists: Artist[];
  submissions: ArtistSubmission[];
  addSubmission: (submission: Omit<ArtistSubmission, 'id' | 'submittedAt'>) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};

// Mock data for artists
const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    category: 'Singers',
    location: 'Los Angeles, CA',
    price: 500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    description: 'Professional vocalist with 10+ years of experience in jazz and contemporary music.',
    skills: ['Jazz', 'Pop', 'R&B', 'Wedding Songs'],
    experience: '10+ years',
    availability: 'Weekends'
  },
  {
    id: '2',
    name: 'DJ Mike',
    category: 'DJs',
    location: 'New York, NY',
    price: 800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    description: 'High-energy DJ specializing in weddings and corporate events.',
    skills: ['Wedding DJ', 'Corporate Events', 'Club Music', 'Sound Systems'],
    experience: '8 years',
    availability: 'Flexible'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    category: 'Dancers',
    location: 'Miami, FL',
    price: 350,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    description: 'Professional dancer specializing in Latin and ballroom styles.',
    skills: ['Salsa', 'Bachata', 'Ballroom', 'Contemporary'],
    experience: '12 years',
    availability: 'Evenings'
  },
  {
    id: '4',
    name: 'Comedy Central',
    category: 'Comedians',
    location: 'Chicago, IL',
    price: 600,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Stand-up comedian with clean humor perfect for corporate events.',
    skills: ['Stand-up', 'Clean Comedy', 'Corporate Entertainment', 'MC Services'],
    experience: '6 years',
    availability: 'Weekends'
  },
  {
    id: '5',
    name: 'Jazz Ensemble',
    category: 'Singers',
    location: 'Nashville, TN',
    price: 1200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    description: 'Professional 4-piece jazz ensemble for upscale events.',
    skills: ['Jazz Standards', 'Swing', 'Bossa Nova', 'Instrumental'],
    experience: '15+ years',
    availability: 'Evenings'
  },
  {
    id: '6',
    name: 'DJ Luna',
    category: 'DJs',
    location: 'Las Vegas, NV',
    price: 950,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    description: 'Electronic music specialist with state-of-the-art equipment.',
    skills: ['Electronic', 'House', 'Techno', 'LED Light Shows'],
    experience: '9 years',
    availability: 'Weekends'
  }
];

export const ArtistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [artists] = useState<Artist[]>(mockArtists);
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>([]);

  const addSubmission = (submission: Omit<ArtistSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: ArtistSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => [...prev, newSubmission]);
  };

  return (
    <ArtistContext.Provider value={{ artists, submissions, addSubmission }}>
      {children}
    </ArtistContext.Provider>
  );
};
