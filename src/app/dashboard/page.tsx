/**
 * Dashboard Page
 */
import React, { Suspense } from 'react';
import { getCourses, getCourseProgress } from '@/lib/courseProgress';
import { cookies } from 'next/headers';
import { deCrypt } from '@/lib/session';
import Link from 'next/link';
import { Course, CourseProgress } from '@/lib/types/course';
import dynamic from 'next/dynamic';
import CourseCardSkeleton from '@/components/skeletons/CourseCardSkeleton';

const CoursesSection = dynamic(() => import('@/components/CoursesSection'), {
  loading: () => (
    <div>
      <div className="mb-8">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-full w-24 flex-shrink-0 animate-pulse"></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  ),
  ssr: true
});

export default async function DashboardPage() {
  const courses: Course[] = await getCourses();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;
  
  let userEmail = '';
  if (sessionToken) {
    const payload = await deCrypt(sessionToken);
    if (payload) {
      userEmail = payload.userEmail as string;
    }
  }
  
  const courseProgress = await getCourseProgress(userEmail);
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Learning Dashboard</h1>
          <p className="text-lg text-gray-600">Continue your learning journey with our comprehensive courses</p>
        </div>
        <Suspense fallback={
          <div>
            <div className="mb-8">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-full w-24 flex-shrink-0 animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }>
          <CoursesSection courses={courses as Course[]} courseProgress={courseProgress as CourseProgress} />
        </Suspense>
      </div>
    </div>
  );
}