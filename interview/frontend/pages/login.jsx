import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, setSession } from '../src/api';
import { 
  LuMail as Mail, 
  LuLock as Lock, 
  LuArrowRight as ArrowRight, 
  LuGlobe as Globe, 
  LuUserPlus as UserPlus 
} from 'react-icons/lu';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSession(data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-void-navy font-sans">
      <div className="relative w-full max-w-md">
        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-tech-blue/10 blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-neon-green/10 blur-[100px]" />

        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-[20px] shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono">
              MAVI<span className="text-neon-green">LOGIN</span>
            </h1>
            <p className="mt-2 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              Access engineering terminal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs font-mono text-rose-200">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-600 group-focus-within:text-neon-green transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-white/5 bg-void-navy/50 py-3 pl-10 pr-4 text-white placeholder-slate-600 transition-all focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/20 outline-none font-mono text-sm"
                  placeholder="ID@MAVISOLUTION.COM"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Access Key</label>
                <a href="#" className="text-[10px] font-mono text-tech-blue hover:text-tech-blue/80 transition-colors">
                  RESET_KEY
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-600 group-focus-within:text-neon-green transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-white/5 bg-void-navy/50 py-3 pl-10 pr-4 text-white placeholder-slate-600 transition-all focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/20 outline-none font-mono text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-4 py-3 font-bold text-void-navy transition-all active:scale-[0.98] font-mono uppercase tracking-widest ${
                isLoading ? 'bg-neon-green/50 cursor-not-allowed' : 'bg-neon-green hover:bg-neon-green/90'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? 'PROCESSING...' : 'INIT_SESSION'} {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </span>
              {!isLoading && <div className="absolute inset-0 -z-0 bg-gradient-to-r from-neon-green to-tech-blue opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className="bg-void-navy px-2 text-slate-600">Cross_Auth</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-[10px] font-mono font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] uppercase">
                <Globe size={16} className="text-tech-blue" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-[10px] font-mono font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] uppercase">
                <UserPlus size={16} className="text-neon-green" />
                Github
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            New Engineer?{' '}
            <Link to="/register" className="font-bold text-tech-blue hover:text-tech-blue/80 transition-colors">
              REGISTER_UNIT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
