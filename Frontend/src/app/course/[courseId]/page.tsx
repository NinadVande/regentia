'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

import Button from '@/components/ui/Button';
import { learningService, LearningCourse } from '@/services/learning';
import { 
  ArrowLeft, 
  BookOpen, 
  Network, 
  BarChart3, 
  HelpCircle, 
  Clock, 
  User as UserIcon, 
  FileText, 
  Lock, 
  Loader2 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

export default function CourseViewerPlaceholder() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<LearningCourse | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!user) return;
      try {
        const courses = await learningService.getCourses(user.email);
        const matched = courses.find(c => c.id === courseId);
        if (matched) {
          setCourse(matched);
        } else {
          // If not purchased/enrolled, redirect to /my-learning
          router.push('/my-learning');
        }
      } catch (e) {
        console.error('Error fetching course:', e);
      } finally {
        setPageLoading(false);
      }
    };

    if (mounted && !loading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchCourse();
      }
    }
  }, [mounted, user, loading, courseId, router]);

  if (!mounted || loading || pageLoading || !user) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-regentia-blue animate-spin" />
        <span className="mt-4 text-sm text-slate-500 font-sans">Verifying course enrollment...</span>
      </div>
    );
  }

  if (!course) return null;

  const IconComp = iconMap[course.iconName] || BookOpen;

  return (
    <div className="w-full min-h-screen bg-slate-50/30 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 text-left font-sans animate-fade-in">
        {/* Back Link */}
        <div>
          <Link 
            href="/my-learning" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-regentia-blue transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Learning</span>
          </Link>
        </div>

        {/* Premium Detail Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-slate-50/50 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-6 md:gap-8 relative z-10">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-start gap-4 justify-between">
              <div className="flex gap-4 items-center">
                <div className="h-14 w-14 rounded-2xl bg-regentia-light flex items-center justify-center text-regentia-blue shrink-0 shadow-xs">
                  <IconComp className="h-7 w-7" />
                </div>
                <div className="space-y-1 text-left">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">
                    Enrolled
                  </span>
                  <h1 className="text-xl md:text-2xl font-extrabold text-regentia-navy leading-snug">
                    {course.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Course metadata bar */}
            <div className="flex flex-wrap gap-6 py-4 border-y border-slate-50 text-xs font-semibold text-slate-500 font-sans">
              <div className="flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>{course.duration} Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>Syllabus Verified</span>
              </div>
            </div>

            {/* Placeholder notification block */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 max-w-2xl mx-auto my-4">
              <div className="p-4 bg-white border border-slate-100 rounded-full text-slate-400 shadow-xs">
                <Lock className="h-8 w-8 text-regentia-navy animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-regentia-navy">LMS Classroom Integration Pending</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-md">
                  Course content will be available after backend integration.
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  We are currently integrating this study track with our Spring Boot LMS core microservice. Lectures, quizzes, and resources will sync directly in a future deployment.
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center pt-2">
              <Link href="/my-learning">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to Learning Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
