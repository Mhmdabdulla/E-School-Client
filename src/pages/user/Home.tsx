import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Award, Play, Globe, Sparkles, Activity } from 'lucide-react';
import Header from '@/components/user/home/Header';

export default function Home() {
  return (
    <>
    <Header />
    <div className="bg-[#121212] min-h-screen text-white font-sans overflow-hidden selection:bg-purple-500/30 relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-8 pb-20 lg:pt-12 lg:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-gray-300">The Future of E-Learning</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Master</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-[#00F0FF] to-purple-500">New Skills</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                Unlock your potential with immersive, world-class courses designed for the modern creator, developer, and visionary. 
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <Link to="/courses">
                  <Button size="lg" className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-400 hover:to-purple-500 text-white border-0 shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(176,38,255,0.4)] rounded-full">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/auth?mode=instructor">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-white/10 text-white hover:bg-white/5 hover:text-white rounded-full backdrop-blur-sm bg-transparent">
                     Become an Instructor
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Glassmorphism Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-purple-500/20 rounded-[2.5rem] transform rotate-3 blur-xl opacity-50" />
              <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                      <Activity className="w-5 h-5 text-teal-400" />
                      Progress Tracker
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Advanced UI/UX Course</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-purple-500/30 border-t-purple-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">78%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Progress Item 1 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-gray-300">
                      <span>Module 4: Glassmorphism</span>
                      <span className="text-teal-400">Completed</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                       <div className="bg-teal-400 h-2 rounded-full w-full" />
                    </div>
                  </div>
                  {/* Progress Item 2 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-gray-300">
                      <span>Module 5: Micro-interactions</span>
                      <span className="text-purple-400">In Progress</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                       <div className="bg-purple-500 h-2 rounded-full w-[45%]" />
                    </div>
                  </div>
                  {/* Progress Item 3 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                      <span>Module 6: Advanced Animation</span>
                      <span>Locked</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                       <div className="bg-white/10 h-2 rounded-full w-[0%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-[#121212] flex items-center justify-center text-xs font-bold">JD</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#121212] flex items-center justify-center text-xs font-bold">AL</div>
                    <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-[#121212] flex items-center justify-center text-xs text-gray-400">+5</div>
                  </div>
                  <p className="text-sm text-gray-400">Active learners right now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="relative z-10 py-20 bg-black/20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
            
            {/* Bento Box 1 */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 hover:border-teal-500/30 transition-colors group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none group-hover:bg-teal-500/20 transition-all duration-500" />
               <Award className="w-10 h-10 text-teal-400 mb-6" />
               <h3 className="text-2xl font-bold mb-3 text-white">Global Certificates</h3>
               <p className="text-gray-400 max-w-md">
                 Earn recognized credentials upon successful completion. Showcase your acquired skills to top tech companies worldwide.
               </p>
            </div>

            {/* Bento Box 2 */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition-colors group relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
               <Users className="w-10 h-10 text-purple-400 mb-6" />
               <h3 className="text-2xl font-bold mb-3 text-white">Elite Instructors</h3>
               <p className="text-gray-400">
                 Learn directly from industry masters and visionary leaders.
               </p>
            </div>

            {/* Bento Box 3 */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 hover:border-[#00F0FF]/30 transition-colors group relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#00F0FF]/20 transition-all duration-500" />
               <Globe className="w-10 h-10 text-[#00F0FF] mb-6" />
               <h3 className="text-2xl font-bold mb-3 text-white">Learn Anywhere</h3>
               <p className="text-gray-400">
                 Accessible across devices, designed for a global audience.
               </p>
            </div>

            {/* Bento Box 4 */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 hover:border-purple-500/30 transition-colors group relative flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
               <div className="relative z-10 max-w-md">
                 <Play className="w-10 h-10 text-purple-400 mb-6" />
                 <h3 className="text-2xl font-bold mb-3 text-white">Interactive Curriculum</h3>
                 <p className="text-gray-400">
                   Experience our next-generation video player and hands-on coding environments designed for deep focus.
                 </p>
               </div>
               <div className="relative mt-8 md:mt-0 z-10 hidden md:block">
                  <div className="w-40 h-24 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md flex flex-col justify-center items-center gap-2 transform rotate-2">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                       <Play className="w-4 h-4 text-teal-400 fill-teal-400" />
                    </div>
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
    </>
  );
}