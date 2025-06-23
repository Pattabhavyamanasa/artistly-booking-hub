
import { useState, useMemo } from 'react';
import { useArtist } from '@/contexts/ArtistContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, User } from 'lucide-react';

const ArtistListing = () => {
  const { artists } = useArtist();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || artist.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || artist.location.includes(locationFilter);
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'low' && artist.price < 500) ||
                          (priceFilter === 'medium' && artist.price >= 500 && artist.price < 800) ||
                          (priceFilter === 'high' && artist.price >= 800);

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });
  }, [artists, searchTerm, categoryFilter, locationFilter, priceFilter]);

  const categories = ['all', ...Array.from(new Set(artists.map(artist => artist.category)))];
  const locations = ['all', ...Array.from(new Set(artists.map(artist => artist.location.split(',')[1]?.trim()).filter(Boolean)))];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Find Your Perfect Artist</h1>
          <p className="text-xl text-slate-600">Discover talented performers for your next event</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $500</SelectItem>
                <SelectItem value="medium">$500 - $800</SelectItem>
                <SelectItem value="high">$800+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredArtists.length} of {artists.length} artists
          </p>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <Card 
              key={artist.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-slate-800 hover:bg-white">
                      {artist.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{artist.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{artist.name}</h3>
                  <p className="text-slate-600 text-sm mb-3">{artist.description}</p>
                  
                  <div className="flex items-center text-slate-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {artist.location}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {artist.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {artist.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{artist.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">
                      ${artist.price}
                    </div>
                    <div className="text-sm text-slate-500">per event</div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <User className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No artists found</h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistListing;
