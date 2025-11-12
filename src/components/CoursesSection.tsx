/**
 * All courses
 */
"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Course, CourseProgress } from '@/lib/types/course';
import Link from 'next/link';



export default function CoursesSection({courses, courseProgress}: {courses: Course[], courseProgress: CourseProgress}) {
    const [currentCat, setCurrentCat] = useState('');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    
    const currentCourses = useMemo(() => {
        if (currentCat) {
            return courses.filter(course => course.category === currentCat);
        }
        return courses;
    }, [currentCat, courses]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            // Show left fade if scrolled right
            setShowLeftFade(scrollContainer.scrollLeft > 10);
        };

        // Check initial scroll position
        handleScroll();
        
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);
  
    const getCategoryIcon = (category: string) => {
        const icons = {
        'All': '🌟',
        'HTML': '🌐',
        'CSS': '🎨',
        'JavaScript': '⚡',
        'PHP': '🐘',
        'Java': '☕'
        };
        return icons[category as keyof typeof icons] || '📚';
    };

    return (
        <div>
            {/* Course Categories */}
            <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Browse by Category</h2>
                {/* Mobile: Horizontal scrollable chips */}
                <div className="md:hidden relative -mx-4 px-4">
                    {/* Fade gradient on the right to indicate scrollability */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
                    {/* Fade gradient on the left - shows when scrolled right */}
                    <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div ref={scrollContainerRef} className="overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
                        <div className="flex gap-2 min-w-max pl-1 pr-4">
                            {['All', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Java'].map((category) => {
                                const categoryCourses = category === 'All' 
                                    ? courses 
                                    : courses.filter(course => course.category === category);
                                const isActive = (category === 'All' && !currentCat) || (category === currentCat);
                                return (
                                    <button
                                        onClick={() => setCurrentCat(category === 'All' ? '' : category)}
                                        key={category}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                                            isActive
                                                ? 'bg-purple-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                                        }`}
                                    >
                                        <span className="text-lg">{getCategoryIcon(category)}</span>
                                        <span className="font-medium text-sm">{category}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                            isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {categoryCourses.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Desktop: Grid layout */}
                <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3">
                    {['All', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Java'].map((category) => {
                        const categoryCourses = category === 'All' 
                            ? courses 
                            : courses.filter(course => course.category === category);
                        const isActive = (category === 'All' && !currentCat) || (category === currentCat);
                        return (
                            <div 
                                onClick={() => setCurrentCat(category === 'All' ? '' : category)} 
                                key={category} 
                                className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 ${
                                    isActive ? 'border-blue-600 shadow-md' : 'border-transparent'
                                }`}
                            >
                                <div className="text-3xl mb-2">{getCategoryIcon(category)}</div>
                                <h3 className={`font-semibold text-sm mb-1 ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {category}
                                </h3>
                                <p className="text-xs text-gray-600">{categoryCourses.length} courses</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* All Courses */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                                      
                    {currentCourses.map((course) => {
                        const progress = courseProgress[course.id] || { completedVideos: [], progressPercentage: 0 };
                        const isCompleted = progress.progressPercentage === 100;

                        return (
                            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
                                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-3xl">{getCategoryIcon(course.category)}</div>
                                            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {course.package}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {course.heading}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {course.description}
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>📹 {course.totalVideos} videos</span>
                                                <span>⏱️ {course.duration}</span>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">Progress</span>
                                                    <span className="font-medium">{progress.progressPercentage}%</span>
                                                </div>

                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                                            }`}
                                                        style={{ width: `${progress.progressPercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {isCompleted && (
                                                <div className="flex items-center text-green-600 text-sm font-medium">
                                                    <span className="mr-1">✅</span>
                                                    Course Completed!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}