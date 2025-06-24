import { useState, useMemo } from 'react';
import { useArtist } from '@/contexts/ArtistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Star, Calendar, Mail, Phone, Grid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuoteRequestForm from '@/components/QuoteRequestForm';

const ArtistListing = () => {
  const { artists } = useArtist();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(artist.category);
      const matchesLocation = locationFilter === 'all' || artist.location.includes(locationFilter);
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'low' && artist.price < 500) ||
                          (priceRange === 'medium' && artist.price >= 500 && artist.price < 800) ||
                          (priceRange === 'high' && artist.price >= 800);

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [artists, searchTerm, selectedCategories, locationFilter, priceRange, sortBy]);

  const categories = Array.from(new Set(artists.map(artist => artist.category)));
  const locations = Array.from(new Set(artists.map(artist => artist.location.split(',')[1]?.trim()).filter(Boolean)));

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleQuoteRequest = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Quote Request Sent!",
      description: `Your quote request has been sent to ${selectedArtist}. They will contact you within 24 hours.`,
    });
    
    setSelectedArtist(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Find Artists</h1>
          <p className="text-xl text-slate-600">Discover talented performers for your next event</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="font-medium text-slate-700 mb-3">Search Artists</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Enter artist name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-slate-700 mb-3">Categories</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                      />
                      <label htmlFor={category} className="text-sm text-slate-600 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium text-slate-700 mb-3">Location</h3>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-slate-700 mb-3">Price Range</h3>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All prices" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All prices</SelectItem>
                    <SelectItem value="low">Under $500</SelectItem>
                    <SelectItem value="medium">$500 - $800</SelectItem>
                    <SelectItem value="high">$800+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-slate-600">
                <span className="font-medium">{filteredArtists.length} artists found</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Artist Grid/List */}
            {filteredArtists.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredArtists.map((artist) => (
                  <Card 
                    key={artist.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={viewMode === 'list' ? "flex" : ""}>
                      <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}`}>
                        <img 
                          src={artist.image} 
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-slate-800 hover:bg-white">
                            ${artist.price}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span className="text-xs font-medium">{artist.rating}</span>
                        </div>
                      </div>

                      <CardContent className="p-4 flex-1">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">{artist.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {artist.category}
                            </Badge>
                            {artist.skills.slice(0, 1).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center text-slate-500 text-sm mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            {artist.location}
                          </div>

                          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                            {artist.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">
                            <span className="font-semibold text-slate-800">${artist.price}</span> per event
                          </div>
                          
                          <Dialog open={selectedArtist === artist.name} onOpenChange={(open) => !open && setSelectedArtist(null)}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                onClick={() => setSelectedArtist(artist.name)}
                              >
                                Ask for Quote
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
                              <QuoteRequestForm
                                artistName={artist.name}
                                onSubmit={handleQuoteRequest}
                                onCancel={() => setSelectedArtist(null)}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
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
      </div>
    </div>
  );
};

export default ArtistListing;
