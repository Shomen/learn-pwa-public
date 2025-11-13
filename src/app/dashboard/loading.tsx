import PageSkeleton from '@/components/skeletons/PageSkeleton';
import CourseCardSkeleton from '@/components/skeletons/CourseCardSkeleton';

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <div className="h-10 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>
                {/* Category skeleton */}
                <div className="mb-8">
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded-full w-24 flex-shrink-0 animate-pulse"></div>
                        ))}
                    </div>
                </div>
                {/* Course cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

