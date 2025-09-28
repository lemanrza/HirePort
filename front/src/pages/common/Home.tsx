import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, ArrowRight, Briefcase, Rocket, Star, ChevronDown } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'company' | 'user';
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      posted: "2 days ago",
      description: "We're looking for an experienced frontend developer to join our team..."
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "New York, NY",
      type: "Full-time",
      salary: "$70,000 - $100,000",
      posted: "1 week ago",
      description: "Creative UX/UI designer needed for innovative projects..."
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataFlow",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $130,000",
      posted: "3 days ago",
      description: "Join our backend team to build scalable applications..."
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateLab",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      posted: "5 days ago",
      description: "Lead product strategy and development initiatives..."
    }
  ]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in (replace with your auth logic)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user) as User);
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  HirePort
                </span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
                Jobs
              </Link>
              <Link to="/companies" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
                Companies
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 hidden sm:block">
                    Welcome, {currentUser.name}
                  </span>
                  <div className="relative group">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>{currentUser.role === 'company' ? 'Company' : 'User'}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                          Dashboard
                        </Link>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                          Profile
                        </Link>
                        {currentUser.role === 'company' && (
                          <Link to="/post-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">
                            Post Job
                          </Link>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                  <br />
                  or{' '}
                  <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    Perfect Candidate
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Connect talented professionals with innovative companies. 
                  Your next career opportunity or ideal hire is just a click away.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Input 
                      placeholder="Job title, keywords, or company"
                      className="h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Location"
                      className="h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full mt-4 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">10,000+</div>
                  <div className="text-gray-600">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5,000+</div>
                  <div className="text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50,000+</div>
                  <div className="text-gray-600">Job Seekers</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
              </div>
              
              <div className="relative space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Remote Work</div>
                      <div className="text-sm text-gray-600">Work from anywhere</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Startup Jobs</div>
                      <div className="text-sm text-gray-600">Join the next unicorn</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 transform rotate-1 hover:rotate-0 transition-transform duration-300 ml-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Top Companies</div>
                      <div className="text-sm text-gray-600">Fortune 500 opportunities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {jobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="group hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="text-lg font-semibold text-green-600">
                    {job.salary}
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-gray-500">
                      Posted {job.posted}
                    </span>
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
              >
                View All Jobs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join thousands of professionals and companies already using HirePort
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  Find Jobs
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
                >
                  Post Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">HirePort</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/companies" className="text-gray-400 hover:text-white transition-colors">Company Reviews</Link></li>
                <li><Link to="/career-advice" className="text-gray-400 hover:text-white transition-colors">Career Advice</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Companies</h4>
              <ul className="space-y-2">
                <li><Link to="/post-job" className="text-gray-400 hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/recruitment-solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 HirePort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
