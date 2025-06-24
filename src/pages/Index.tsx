
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, Search, User, Mic, Music, Users, MessageSquare } from 'lucide-react';

const categories = [
  {
    title: 'Singers',
    description: 'Professional vocalists for all occasions',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    count: '245 artists available',
    icon: <Mic className="w-8 h-8" />
  },
  {
    title: 'DJs',
    description: 'Electronic music experts and party starters',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    count: '189 artists available',
    icon: <Music className="w-8 h-8" />
  },
  {
    title: 'Dancers',
    description: 'Choreographers and performance dancers',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    count: '156 artists available',
    icon: <Users className="w-8 h-8" />
  },
  {
    title: 'Speakers',
    description: 'Motivational and corporate speakers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    count: '98 artists available',
    icon: <MessageSquare className="w-8 h-8" />
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find the Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Artist
              </span>
              for Your Event
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto animate-fade-in">
              Connect with talented performers, speakers, and entertainers. Book 
              verified artists for weddings, corporate events, and celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-purple-50 font-semibold px-8 py-3 text-lg"
              >
                <Link to="/artists">
                  Explore Artists
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-3 text-lg"
              >
                <Link to="/onboarding">
                  Join as Artist
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">2,500+</div>
              <div className="text-slate-600">Verified Artists</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">10,000+</div>
              <div className="text-slate-600">Events Booked</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">150+</div>
              <div className="text-slate-600">Cities Covered</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">4.8</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover talented performers across various categories. From musicians to 
              speakers, find the right fit for your event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-white"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                    <div className="text-purple-600">
                      {category.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-purple-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="text-sm font-medium text-purple-600">
                    {category.count}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple steps to book your perfect artist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Browse Artists</h3>
              <p className="text-slate-600">
                Search and filter through our curated list of professional artists
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Request Quote</h3>
              <p className="text-slate-600">
                Contact artists directly and discuss your event requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Book & Enjoy</h3>
              <p className="text-slate-600">
                Confirm your booking and enjoy an amazing performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Artist?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
            >
              <Link to="/artists">
                Start Browsing Artists
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold"
            >
              <Link to="/onboarding">
                Become an Artist
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
