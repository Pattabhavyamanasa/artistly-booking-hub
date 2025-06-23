
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Artistly</span>
            </Link>
            <p className="text-slate-400 max-w-md">
              Connect with talented performers and entertainers for your next event. 
              Professional artists, seamless booking, unforgettable experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Artists</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/onboarding" className="hover:text-white transition-colors">Join as Artist</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Artist Resources</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/artists" className="hover:text-white transition-colors">Find Artists</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Event Planning</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Artistly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
