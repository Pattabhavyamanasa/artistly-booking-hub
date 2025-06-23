
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useArtist } from '@/contexts/ArtistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Upload, X, User, Mail, MapPin, DollarSign, Star, Camera, Languages, ChevronDown } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  location: string;
  price: number;
  description: string;
  experience: string;
}

const categoryOptions = ['Singers', 'DJs', 'Dancers', 'Comedians'];

const languageOptions = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi'
];

const ArtistOnboarding = () => {
  const navigate = useNavigate();
  const { addSubmission } = useArtist();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (selectedCategories.length === 0) {
      toast({
        title: "Category Required",
        description: "Please select at least one category.",
        variant: "destructive"
      });
      return;
    }

    if (selectedLanguages.length === 0) {
      toast({
        title: "Languages Required",
        description: "Please select at least one language.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Artist Onboarding Submission:', {
        ...data,
        categories: selectedCategories,
        languages: selectedLanguages,
        profileImage: profileImage?.name || 'No image uploaded'
      });

      addSubmission({
        ...data,
        category: selectedCategories.join(', '),
        skills: selectedCategories
      });

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 24 hours.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const removeLanguage = (language: string) => {
    setSelectedLanguages(prev => prev.filter(l => l !== language));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview('');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Join Our Artist Community</h1>
          <p className="text-xl text-slate-600">Share your talent with the world and connect with clients</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Artist Application</CardTitle>
            <CardDescription>
              Tell us about yourself and showcase your talents
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register('location', { required: 'Location is required' })}
                    placeholder="City, State"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Bio & Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Tell us about your performance style, experience, and what makes you unique..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Profile Image (Optional)
                </h3>

                <div className="space-y-4">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="image-upload" className="cursor-pointer text-purple-600 hover:text-purple-700">
                          Click to upload profile image
                        </Label>
                        <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Professional Information
                </h3>

                {/* Category Multi-Select Dropdown */}
                <div className="space-y-2">
                  <Label>Performance Category *</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedCategories.length > 0 
                          ? `${selectedCategories.length} selected` 
                          : "Select categories"
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white border shadow-lg z-50">
                      {categoryOptions.map(category => (
                        <DropdownMenuCheckboxItem
                          key={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        >
                          {category}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {selectedCategories.length > 0 && (
                    <div className="space-y-2 mt-2">
                      <Label>Selected Categories:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map(category => (
                          <Badge key={category} variant="secondary" className="pr-1">
                            {category}
                            <button
                              type="button"
                              onClick={() => removeCategory(category)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Rate per Event ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      {...register('price', { 
                        required: 'Price is required',
                        min: { value: 50, message: 'Minimum rate is $50' }
                      })}
                      placeholder="500"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <select
                      {...register('experience', { required: 'Experience is required' })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select experience level</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-10 years">6-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                    {errors.experience && (
                      <p className="text-sm text-red-600">{errors.experience.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Languages Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <Languages className="w-5 h-5 mr-2" />
                  Languages Spoken *
                </h3>
                
                <div className="space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedLanguages.length > 0 
                          ? `${selectedLanguages.length} selected` 
                          : "Select languages"
                        }
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white border shadow-lg z-50 max-h-60 overflow-y-auto">
                      {languageOptions.map(language => (
                        <DropdownMenuCheckboxItem
                          key={language}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={() => toggleLanguage(language)}
                        >
                          {language}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {selectedLanguages.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Languages:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguages.map(language => (
                          <Badge key={language} variant="secondary" className="pr-1">
                            {language}
                            <button
                              type="button"
                              onClick={() => removeLanguage(language)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistOnboarding;
