
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, Search, User } from 'lucide-react';

const categories = [
  {
    title: 'Singers',
    description: 'Professional vocalists for any genre or occasion',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    count: '500+ artists'
  },
  {
    title: 'DJs',
    description: 'Expert DJs with top-tier equipment and music libraries',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    count: '300+ artists'
  },
  {
    title: 'Dancers',
    description: 'Skilled dancers in various styles and choreography',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    count: '250+ artists'
  },
  {
    title: 'Comedians',
    description: 'Stand-up comedians and entertainers for all audiences',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    count: '150+ artists'
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
              Book Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Performers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto animate-fade-in">
              Connect with talented artists and entertainers for your next event. 
              From intimate gatherings to grand celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-purple-50 font-semibold px-8 py-3 text-lg"
              >
                <Link to="/artists">
                  <Search className="w-5 h-5 mr-2" />
                  Find Artists
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-3 text-lg"
              >
                <Link to="/onboarding">
                  <User className="w-5 h-5 mr-2" />
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

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Discover Talented Artists
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse through our curated categories of professional performers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                        {category.count}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 group-hover:text-purple-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link to="/artists">
                View All Artists
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of satisfied clients who've found their perfect performers through Artistly
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
