/**
 * Dashboard Page
 */
import React, { Suspense } from 'react';
import { getCourses, getCourseProgress } from '@/lib/courseProgress';
import { cookies } from 'next/headers';
import { deCrypt } from '@/lib/session';
import Link from 'next/link';
import { Course, CourseProgress } from '@/lib/types/course';
import CoursesSection from '@/components/CoursesSection';

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
        <Suspense fallback={<div>Loading...</div>}>
          <CoursesSection courses={courses as Course[]} courseProgress={courseProgress as CourseProgress} />
        </Suspense>
      </div>
    </div>
  );
}