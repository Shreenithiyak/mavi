import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LuZap as Zap, 
  LuShield as Shield, 
  LuServer as Server, 
  LuChevronRight as ChevronRight,
  LuMessageCircle as MessageCircle,
  LuMoon as Moon,
  LuBot as Bot,
  LuNetwork as Network,
  LuClock as Clock,
  LuEye as Eye,
  LuBellOff as BellOff,
  LuGitBranch as GitBranch,
  LuCloudUpload as CloudUpload,
  LuSettings as Settings,
  LuCpu as CpuIcon
} from 'react-icons/lu';
import { apiRequest, clearSession, getToken } from '../src/api';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }

    apiRequest('/api/auth/me').catch(() => {
      clearSession();
      navigate('/login');
    });
  }, [navigate]);

  return (
    <div className="relative min-h-screen pb-20 overflow-x-hidden bg-void-navy text-slate-100 font-sans">
      {/* Inline Scanline */}
      <div className="fixed top-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-neon-green/[0.02] to-transparent pointer-events-none z-[100] animate-[scanline_8s_linear_infinite]" 
           style={{ animation: 'scanline 8s linear infinite' }} />
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-tech-blue/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-widest">
            Reliability Protocols Active
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight max-w-4xl mb-6">
          We help startups and businesses achieve <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">99.99%</span> <span className="bg-gradient-to-r from-tech-blue to-tech-blue-end bg-clip-text text-transparent italic">uptime</span> with our SRE managed services.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Maxi Vision bridges the gap between <span className="text-white font-semibold">Web Development</span> and <span className="text-white font-semibold">Site Reliability</span>. We don't just build websites; we engineer high-performance platforms that are: <span className="text-tech-blue">Ultra-Fast</span>, <span className="text-white">Secure</span>, and <span className="text-neon-green">Scalable</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-neon-green to-tech-blue-end text-void-navy font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(66,230,149,0.3)] uppercase tracking-wider text-sm">
            Secure Your Infrastructure
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl transition-all hover:bg-white/10 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
            View Tools <CpuIcon size={16} className="text-tech-blue" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
          <div className="h-[1px] w-12 bg-white/10" />
          Trusted by startups and enterprises for mission-critical infrastructure
        </div>
      </section>

      {/* Mission Overview (About) */}
      <section className="relative py-20 px-4 md:px-0 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <div className="inline-flex px-3 py-1 rounded-full bg-tech-blue/10 border border-tech-blue/20 mb-8">
              <span className="text-[10px] font-mono font-bold text-tech-blue uppercase tracking-widest">
                CORPORATE DNA
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 uppercase tracking-tight">
              MISSION OVERVIEW
            </h2>
            
            <div className="pl-6 border-l-4 border-tech-blue mb-10">
              <p className="text-xl md:text-2xl text-slate-300 italic font-light leading-relaxed">
                "Maxi Vision is a high-performance Site Reliability Engineering (SRE) and Web Development startup that bridges the gap between 'shipping code' and 'staying online.' We specialize in building and protecting digital infrastructure for scaling startups and established enterprises."
              </p>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.05] p-8 rounded-2xl">
              <h3 className="text-xs font-mono font-bold text-tech-blue uppercase tracking-widest mb-4">OUR CORE PHILOSOPHY</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                *Site Reliability Engineering (SRE) is the foundation of everything we build. At its core, SRE is about using software to solve operational problems. We move away from reactive fixes and focus on:
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 relative overflow-hidden">
            {/* Watermark Shield */}
            <div className="absolute top-10 right-10 opacity-[0.03]">
              <Shield size={200} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-12 tracking-widest uppercase relative z-10">SRE PILLARS</h3>
            
            <div className="space-y-10 relative z-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[#121c36] rounded-2xl flex items-center justify-center text-tech-blue shadow-lg border border-white/5">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">AUTOMATED OPERATIONS</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    "Eliminating manual 'toil' through intelligent scripts and self-healing systems."
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[#121c36] rounded-2xl flex items-center justify-center text-tech-blue shadow-lg border border-white/5">
                  <Network size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">SCALABLE ARCHITECTURE</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    "Ensuring your systems grow as fast as your user base without performance lag."
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[#121c36] rounded-2xl flex items-center justify-center text-neon-green shadow-lg border border-white/5">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">MAXIMUM UPTIME</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    "Engineering reliability into the very fabric of your digital ecosystem."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="relative py-20 px-4 md:px-0 border-t border-white/5">
        <div className="inline-flex px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 mb-8">
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-widest">
            STRATEGIC EXECUTION
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 uppercase tracking-tight">
          OUR GOALS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group hover:border-tech-blue/30 transition-all h-[360px]">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-mono font-black text-white/5">01</span>
              <div className="w-12 h-12 bg-[#121c36] rounded-full flex items-center justify-center text-tech-blue group-hover:scale-110 transition-transform">
                <Eye size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">OBSERVABILITY & MONITORING</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Building "single panes of glass" using industry-leading tools like Grafana, Prometheus, or Datadog for real-time insights.
              </p>
            </div>
          </div>
          
          {/* Card 02 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group hover:border-tech-blue/30 transition-all h-[360px]">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-mono font-black text-tech-blue/20">02</span>
              <div className="w-12 h-12 bg-[#121c36] rounded-full flex items-center justify-center text-tech-blue group-hover:scale-110 transition-transform">
                <BellOff size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">INCIDENT MANAGEMENT</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Implementing 24/7 proactive response protocols using PagerDuty or Opsgenie to minimize downtime and business impact.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-tech-blue animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">ENTERPRISE READY</span>
            </div>
          </div>
          
          {/* Card 03 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group hover:border-neon-green/30 transition-all h-[360px]">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-mono font-black text-white/5">03</span>
              <div className="w-12 h-12 bg-[#121c36] rounded-full flex items-center justify-center text-neon-green group-hover:scale-110 transition-transform">
                <GitBranch size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">INFRASTRUCTURE AS CODE (IAC)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automating environments with Terraform or Ansible to ensure repeatable, version-controlled, and error-free deployments.
              </p>
            </div>
          </div>
          
          {/* Card 04 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group hover:border-neon-green/30 transition-all h-[360px]">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-mono font-black text-white/5">04</span>
              <div className="w-12 h-12 bg-[#121c36] rounded-full flex items-center justify-center text-neon-green group-hover:scale-110 transition-transform">
                <Zap size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">PERFORMANCE ENGINEERING</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Continuous optimization of application code and cloud resources to maximize speed while minimizing operational costs.
              </p>
            </div>
          </div>
          
          {/* Card 05 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col justify-between group hover:border-neon-green/30 transition-all h-[360px]">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-mono font-black text-white/5">05</span>
              <div className="w-12 h-12 bg-[#121c36] rounded-full flex items-center justify-center text-neon-green group-hover:scale-110 transition-transform">
                <CloudUpload size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">CLOUD-NATIVE SCALING</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Architecting systems to handle traffic surges automatically, ensuring your platform scales from 100 to 1M+ users seamlessly.
              </p>
            </div>
          </div>
          
          {/* Card 06 Placeholder */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col items-center justify-center group h-[360px]">
            <CpuIcon size={32} className="text-slate-600 mb-4 opacity-50" />
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em]">FUTURE-PROOF ENGINEERING</span>
          </div>
        </div>
      </section>

      {/* Core Offerings */}
      <section className="relative py-20 px-4 md:px-0 border-t border-white/5">
        <div className="inline-flex px-3 py-1 rounded-full bg-tech-blue/10 border border-tech-blue/20 mb-8">
          <span className="text-[10px] font-mono font-bold text-tech-blue uppercase tracking-widest">
            OUR EXPERTISE
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 uppercase tracking-tight">
          CORE OFFERINGS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col group hover:border-tech-blue/30 transition-all h-[400px]">
            <div className="w-16 h-16 bg-tech-blue/20 rounded-2xl flex items-center justify-center text-tech-blue mb-10 group-hover:scale-110 transition-transform">
              <Server size={28} />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">SRE AS A SERVICE</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
              Proactive incident management, 24/7 on-call response, and deep Root Cause Analysis to ensure maximum stability.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <a href="#" className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2 group-hover:text-tech-blue transition-colors">
                KNOW MORE <ChevronRight size={14} />
              </a>
              <div className="w-12 h-1 bg-tech-blue/30" />
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col group hover:border-neon-green/30 transition-all h-[400px]">
            <div className="w-16 h-16 bg-neon-green rounded-2xl flex items-center justify-center text-void-navy mb-10 shadow-[0_0_20px_rgba(66,230,149,0.3)] group-hover:scale-110 transition-transform">
              <Eye size={28} />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">MONITORING & OBSERVABILITY</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
              Building "single panes of glass" with real-time dashboards, distributed tracing, and intelligent logging.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <a href="#" className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2 group-hover:text-neon-green transition-colors">
                KNOW MORE <ChevronRight size={14} />
              </a>
              <div className="w-12 h-1 bg-neon-green/30" />
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="bg-[#0b101f] border border-white/[0.05] rounded-3xl p-10 flex flex-col group hover:border-tech-blue/30 transition-all h-[400px]">
            <div className="w-16 h-16 bg-[#1a233a] rounded-2xl flex items-center justify-center text-tech-blue mb-10 group-hover:scale-110 transition-transform">
              <Settings size={28} />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4">DEVOPS AUTOMATION</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
              Streamlining deployment cycles with high-performance CI/CD pipelines and Infrastructure as Code (IaC).
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <a href="#" className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2 group-hover:text-tech-blue transition-colors">
                KNOW MORE <ChevronRight size={14} />
              </a>
              <div className="w-12 h-1 bg-tech-blue/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors backdrop-blur-md">
          <Moon size={20} />
        </button>
        <button className="w-14 h-14 bg-gradient-to-br from-tech-blue to-tech-blue-end rounded-full flex items-center justify-center text-white shadow-lg shadow-tech-blue/30 hover:scale-110 transition-transform">
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
