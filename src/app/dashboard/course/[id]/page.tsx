/**
 * Individual Course Page
 */
import React, { Suspense } from 'react';
import { getCourseById, getCourseProgress, updateCourseProgress } from '@/lib/courseProgress';
import { cookies } from 'next/headers';
import { deCrypt } from '@/lib/session';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const VideoList = dynamic(() => import('@/components/VideoList'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-md animate-pulse">
      <div className="p-6 border-b">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: true
});

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourseById(id);
  
  if (!course) {
    notFound();
  }

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
  const progress = courseProgress[course.id] || { completedVideos: [], progressPercentage: 0 };
  
  const getCategoryIcon = (category: string) => {
    const icons = {
      'HTML': '🌐',
      'CSS': '🎨',
      'JavaScript': '⚡',
      'PHP': '🐘',
      'Java': '☕'
    };
    return icons[category as keyof typeof icons] || '📚';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">{getCategoryIcon(course.category)}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.heading}</h1>
              <p className="text-gray-600">{course.coursename} • {course.package}</p>
            </div>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            {course.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Your Progress
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">Course Completion</span>
                  <span className="text-2xl font-bold text-blue-600">{progress.progressPercentage}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress.progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{progress.completedVideos.length} of {course.totalVideos} videos completed</span>
                  <span>{course.duration} total duration</span>
                </div>
                
                {progress.progressPercentage === 100 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-800">
                      <span className="text-2xl mr-2">🎉</span>
                      <span className="font-semibold">Congratulations! You've completed this course!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video List */}
            <Suspense fallback={
              <div className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="p-6 border-b">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }>
              <VideoList 
                course={course} 
                completedVideos={progress.completedVideos}
                userEmail={userEmail}
              />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{course.package}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Videos</span>
                  <span className="font-medium">{course.totalVideos}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Videos Watched</span>
                  <span className="font-medium text-blue-600">{progress.completedVideos.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-medium text-gray-600">{course.totalVideos - progress.completedVideos.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-green-600">{progress.progressPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
