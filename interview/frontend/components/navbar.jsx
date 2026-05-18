import { Link } from 'react-router-dom';
import { LuHexagon as Hexagon, LuCpu as Cpu, LuMenu as Menu } from 'react-icons/lu';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'About', path: '#' },
    { name: 'Services', path: '#' },
    { name: 'Case Studies', path: '#' },
  ];

  return (
    <nav className="bg-void-navy/80 backdrop-blur-xl sticky top-0 z-50 py-4 border-b border-white/5">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Hexagon className="w-full h-full text-tech-blue group-hover:rotate-90 transition-transform duration-500" strokeWidth={2.5} />
              <Cpu className="absolute inset-0 m-auto w-4 h-4 text-neon-green" strokeWidth={2} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black tracking-tighter text-white font-sans">MaVi</span>
              <span className="text-2xl font-black tracking-tighter text-neon-green font-sans">Solution</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors font-mono"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-8 py-2.5 bg-neon-green text-void-navy font-extrabold rounded-lg text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(66,230,149,0.2)] hover:bg-neon-green/90 transition-all font-mono">
              Contact
            </button>
            <button className="lg:hidden text-white p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
