'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

import Button from '@/components/ui/Button';
import { learningService, LearningCourse, LearningStats } from '@/services/learning';
import { 
  Network, 
  BarChart3, 
  BookOpen, 
  HelpCircle,
  Calendar,
  Clock,
  User as UserIcon,
  Loader2,
  BookOpenCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

export default function MyLearningPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<LearningCourse[]>([]);
  const [stats, setStats] = useState<LearningStats>({
    totalEnrolled: 0,
    activeCourses: 0,
    completedCourses: 0,
    averageProgress: 0
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const loadData = async (email: string) => {
    try {
      const userCourses = await learningService.getCourses(email);
      const userStats = await learningService.getStats(email);
      setCourses(userCourses);
      setStats(userStats);
    } catch (e) {
      console.error('Failed to load learning data:', e);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && !loading) {
      if (!user) {
        router.push('/login');
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData(user.email);
      }
    }
  }, [mounted, user, loading, router]);

  // Dev Mock Helper: Enroll in a test course
  const handleSimulateEnrollment = async (courseType: 'meta' | 'network' | 'research') => {
    if (!user) return;
    setPageLoading(true);
    
    let mockCourse = {
      id: 'online-research',
      title: 'Online Research',
      description: 'Learn research methodology, study design, literature review, protocol development, and evidence-based healthcare research.',
      duration: '10 weeks',
      instructor: 'Dr. Harshwardhan Ramteke',
      iconName: 'BookOpen'
    };

    if (courseType === 'meta') {
      mockCourse = {
        id: 'meta-analysis',
        title: 'Meta-Analysis Course',
        description: 'Comprehensive training on systematic reviews, statistical methods, and pairwise meta-analysis for healthcare research.',
        duration: '6 weeks',
        instructor: 'Dr. Harshwardhan Ramteke',
        iconName: 'BarChart3'
      };
    } else if (courseType === 'network') {
      mockCourse = {
        id: 'network-meta-analysis',
        title: 'Network Meta-Analysis Course',
        description: 'Learn advanced methodologies for conducting and interpreting Network Meta-Analysis using evidence-based research practices.',
        duration: '8 weeks',
        instructor: 'Dr. Harshwardhan Ramteke',
        iconName: 'Network'
      };
    }

    await learningService.enrollCourse(user.email, mockCourse);
    await loadData(user.email);
  };

  const handleClearMockData = async () => {
    if (!user) return;
    setPageLoading(true);
    const key = `learning_${user.email.toLowerCase().trim()}`;
    localStorage.removeItem(key);
    await loadData(user.email);
  };

  if (!mounted || loading || pageLoading || !user) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-regentia-blue animate-spin" />
        <span className="mt-4 text-sm text-slate-500 font-sans">Preparing your learning workspace...</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/30 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 text-left font-sans animate-fade-in">
        {/* Top welcome section */}
        <div className="relative bg-gradient-to-r from-regentia-navy to-[#0A1D56] rounded-3xl overflow-hidden p-6 md:p-8 shadow-lg shadow-regentia-navy/10 text-white">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-regentia-blue/10 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full bg-regentia-blue/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-regentia-light tracking-wide border border-white/10 uppercase">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                LMS Dashboard
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Welcome back, {user.fullName}!
              </h1>
              <p className="text-slate-200 text-sm max-w-xl font-sans leading-relaxed">
                Continue your learning journey with Regentia Health & Research.
              </p>
            </div>
            
            {/* Developer Test Tools block */}
            <div className="flex flex-wrap gap-2.5 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 shrink-0 self-start md:self-center">
              <div className="w-full text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Flame className="h-3 w-3 text-orange-500" /> Dev/Testing Sandbox
              </div>
              <button 
                onClick={() => handleSimulateEnrollment('research')}
                className="px-2.5 py-1.5 text-[11px] font-bold bg-white text-regentia-navy hover:bg-slate-50 transition-colors rounded-lg shadow-sm cursor-pointer"
              >
                + Research Course
              </button>
              <button 
                onClick={() => handleSimulateEnrollment('meta')}
                className="px-2.5 py-1.5 text-[11px] font-bold bg-white text-regentia-navy hover:bg-slate-50 transition-colors rounded-lg shadow-sm cursor-pointer"
              >
                + Meta Course
              </button>
              {courses.length > 0 && (
                <button 
                  onClick={handleClearMockData}
                  className="px-2.5 py-1.5 text-[11px] font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors rounded-lg shadow-sm cursor-pointer"
                >
                  Reset Courses
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 flex flex-col gap-1.5 hover:border-slate-200 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enrolled</span>
            <span className="text-3xl font-extrabold text-regentia-navy">{stats.totalEnrolled}</span>
            <span className="text-[10px] text-slate-500 font-sans mt-1">LMS Active subscriptions</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 flex flex-col gap-1.5 hover:border-slate-200 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Courses</span>
            <span className="text-3xl font-extrabold text-regentia-navy">{stats.activeCourses}</span>
            <span className="text-[10px] text-slate-500 font-sans mt-1">In progress status</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 flex flex-col gap-1.5 hover:border-slate-200 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</span>
            <span className="text-3xl font-extrabold text-slate-300">0</span>
            <span className="text-[10px] text-slate-500 font-sans mt-1">Certificate credentials</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/50 flex flex-col gap-1.5 hover:border-slate-200 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learning Progress</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-300">0%</span>
              <span className="text-xs font-bold text-slate-400">avg</span>
            </div>
            <span className="text-[10px] text-slate-500 font-sans mt-1">Calculated syllabus progress</span>
          </div>
        </div>

        {/* My Courses Title Header */}
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <h2 className="text-lg font-bold text-regentia-navy tracking-tight">My Courses</h2>
          <span className="text-xs text-slate-400 font-semibold font-sans">{courses.length} Course{courses.length !== 1 ? 's' : ''} Purchased</span>
        </div>

        {/* My Courses Grid or Empty State */}
        {courses.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-100 rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-sm max-w-4xl mx-auto">
            <div className="h-20 w-20 rounded-full bg-regentia-light flex items-center justify-center text-regentia-blue mb-6">
              <BookOpenCheck className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-regentia-navy">You haven&apos;t enrolled in any courses yet.</h3>
            <p className="text-sm text-slate-500 max-w-md mt-3 leading-relaxed font-sans">
              Enhance your clinical research methodology and validation capabilities. Explore our professional studies to get started.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/services">
                <Button className="flex items-center gap-2 px-6">
                  <span>Browse Courses</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const IconComp = iconMap[course.iconName] || BookOpen;
              return (
                <div 
                  key={course.id} 
                  className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Card Top Banner (Premium Gradient Context) */}
                  <div className="bg-slate-50/80 px-6 py-5 flex items-start gap-4 border-b border-slate-50">
                    <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center justify-center text-regentia-blue shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 text-left min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">
                          Purchased
                        </span>
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-regentia-light text-regentia-blue border border-regentia-blue/10 uppercase">
                          {course.status}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-regentia-navy text-base leading-snug truncate">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content body */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <p className="text-xs text-slate-500 leading-relaxed font-sans text-left">
                      {course.description}
                    </p>

                    {/* Progress Bar Component */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                        <span>COURSE PROGRESS</span>
                        <span className="text-regentia-blue">{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-regentia-blue to-regentia-navy rounded-full transition-all duration-500" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta Stats List */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="truncate">{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Enrolled on {new Date(course.purchaseDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Card Button */}
                    <Link href={`/course/${course.id}`} className="block w-full">
                      <Button className="w-full justify-center flex items-center gap-2 group shadow-xs">
                        <span>Continue Learning</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
