'use client';
import { useState } from 'react';
import { Course, Video } from '@/lib/types/course';
import { updateCourseProgress } from '@/lib/courseProgress';

interface VideoListProps {
  course: Course;
  completedVideos: string[];
  userEmail: string;
}

export default function VideoList({ course, completedVideos, userEmail }: VideoListProps) {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const handleVideoToggle = (videoId: string) => {
    setExpandedVideo(expandedVideo === videoId ? null : videoId);
  };

  const handleVideoComplete = async (videoId: string, isCompleted: boolean) => {
    try {
      await updateCourseProgress(userEmail, course.id, videoId, isCompleted);
      // Refresh the page to update progress
      window.location.reload();
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📹</span>
          Course Videos ({course.totalVideos})
        </h2>
        <p className="text-gray-600 mt-2">Click on any video to expand and view details</p>
      </div>

      <div className="divide-y divide-gray-200">
        {course.videos.map((video, index) => {
          const isCompleted = completedVideos.includes(video.id);
          const isExpanded = expandedVideo === video.id;

          return (
            <div key={video.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                {/* Video Number and Status */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                </div>

                {/* Video Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleVideoToggle(video.id)}>
                      {video.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{video.duration}</span>
                      <button
                        onClick={() => handleVideoToggle(video.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg 
                          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Video Description (Expandable) */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4 animate-fadeIn">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{video.description}</p>
                      </div>

                      {/* Video Player */}
                      <div className="bg-black rounded-lg overflow-hidden">
                        <iframe
                          src={video.videourl.replace('watch?v=', 'embed/')}
                          width="100%"
                          height="315"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full"
                          loading="lazy"
                          title={video.title}
                        ></iframe>
                      </div>

                      {/* Complete Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`complete-${video.id}`}
                            checked={isCompleted}
                            onChange={(e) => handleVideoComplete(video.id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <label htmlFor={`complete-${video.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                            Mark as completed
                          </label>
                        </div>
                        
                        {isCompleted && (
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <span className="mr-1">✅</span>
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
