'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Network, 
  BarChart3, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  PlayCircle, 
  Download, 
  ChevronRight, 
  X, 
  Award,
  BookOpenCheck
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  purchaseDate: string;
  status: string;
  iconName: string;
  description: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedCourses = localStorage.getItem('regentia_courses');
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error('Error loading courses:', e);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left font-sans">
        {/* Header Block */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-regentia-navy tracking-tight">My Enrolled Courses</h1>
            <p className="text-xs text-slate-400 mt-1 font-sans">Access your scientific research studies, syllabus materials, and analytics portal.</p>
          </div>
          <Link href="/services">
            <Button size="sm" className="flex items-center gap-1.5 self-start">
              <span>Browse Programs</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {courses.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-full bg-regentia-light flex items-center justify-center text-regentia-blue mb-5">
              <BookOpenCheck className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-regentia-navy">No courses enrolled yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
              Enhance your clinical research methodology and validation capabilities. Explore our professional studies.
            </p>
            <Link href="/services" className="mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Explore Catalog</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Courses Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const IconComp = iconMap[course.iconName] || HelpCircle;
              return (
                <div 
                  key={course.id}
                  className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-sm shadow-slate-100 flex flex-col h-full hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Design accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-regentia-blue/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex gap-4 items-start mb-4">
                    <div className="p-3 bg-regentia-light text-regentia-navy rounded-xl shrink-0 group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-regentia-navy text-base leading-snug group-hover:text-regentia-blue transition-colors">
                        {course.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-sans block mt-1">
                        Purchased: {new Date(course.purchaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-emerald-600">{course.status}</span>
                    </div>
                    
                    <Button 
                      onClick={() => setActiveCourse(course)}
                      variant="secondary" 
                      size="sm"
                      className="text-xs flex items-center gap-1 opacity-90 hover:opacity-100 font-bold"
                    >
                      <span>Continue Learning</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Mock Workspace Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in" 
            onClick={() => setActiveCourse(null)}
          />
          <div className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scale-up text-left flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-regentia-navy text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  {React.createElement(iconMap[activeCourse.iconName] || HelpCircle, { className: "h-5 w-5" })}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold leading-snug truncate max-w-[350px] md:max-w-[450px]">
                    {activeCourse.title}
                  </h3>
                  <span className="text-[10px] text-slate-300 font-sans block mt-0.5">Syllabus Portal Workspace</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveCourse(null)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sans">
              {/* Progress Panel */}
              <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
                  <span>Workspace Progress:</span>
                  <span className="text-regentia-blue">25% (Module 1 Completed)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-regentia-blue h-full w-1/4 rounded-full transition-all duration-500" />
                </div>
              </div>

              {/* Modules List Mock */}
              <div className="space-y-3.5">
                <h4 className="font-extrabold text-regentia-navy text-sm">Course Modules & Lectures</h4>
                
                {/* Module 1 */}
                <div className="border border-slate-100 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                  <div className="flex gap-3 items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xs font-bold font-mono">
                      01
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-700 text-xs md:text-sm">Introduction to Study Formulation</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Video Lecture • 45 minutes</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Completed
                  </span>
                </div>

                {/* Module 2 */}
                <div className="border border-slate-100 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors bg-white">
                  <div className="flex gap-3 items-center">
                    <div className="h-8 w-8 rounded-full bg-regentia-light text-regentia-blue border border-regentia-blue/10 flex items-center justify-center text-xs font-bold font-mono animate-pulse">
                      02
                    </div>
                    <div>
                      <h5 className="font-bold text-regentia-navy text-xs md:text-sm">Clinical Research Methodology & Design</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Live webinar recording • 60 minutes</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="text-[10px] h-7 px-3 font-semibold flex items-center gap-1">
                    <PlayCircle className="h-3.5 w-3.5" />
                    <span>Resume</span>
                  </Button>
                </div>

                {/* Module 3 */}
                <div className="border border-slate-100 rounded-xl p-4 flex justify-between items-center opacity-65 bg-white">
                  <div className="flex gap-3 items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200/60 flex items-center justify-center text-xs font-bold font-mono">
                      03
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-500 text-xs md:text-sm">Literature Review Protocols & Data Collection</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Interactive syllabus • 50 minutes</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">Locked</span>
                </div>
              </div>

              {/* Research Resources Panel */}
              <div className="border border-slate-100 rounded-xl p-4">
                <h4 className="font-extrabold text-regentia-navy text-sm mb-3">Academic Research Materials</h4>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-regentia-blue" />
                    <span>Meta-Analysis-Syllabus-Overview.pdf</span>
                  </div>
                  <button className="text-regentia-blue hover:text-regentia-navy transition-colors cursor-pointer flex items-center gap-1 font-bold">
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans">
              <div className="flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-regentia-blue" />
                <span>Certificate unlocks upon final module completion.</span>
              </div>
              <Button onClick={() => setActiveCourse(null)} size="sm">
                Close Workspace
              </Button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
