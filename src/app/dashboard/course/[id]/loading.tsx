import PageSkeleton from '@/components/skeletons/PageSkeleton';

export default function CourseDetailLoading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                    <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video player skeleton */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-200 rounded-lg aspect-video mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                    {/* Video list skeleton */}
                    <div className="lg:col-span-1">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-32 h-20 bg-gray-200 rounded flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

