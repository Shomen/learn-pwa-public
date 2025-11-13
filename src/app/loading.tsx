import PageSkeleton from '@/components/skeletons/PageSkeleton';

export default function HomeLoading() {
    return (
        <div className="block animate-pulse">
            {/* Hero section skeleton */}
            <section className="flex flex-col md:flex-row items-center justify-evenly bg-stone-50 py-12">
                <div className="max-w-lg flex flex-col items-center text-center mb-8 md:mb-0">
                    <div className="h-16 bg-gray-200 rounded w-96 mb-6"></div>
                    <div className="h-8 bg-gray-200 rounded w-80"></div>
                </div>
                <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-200 rounded"></div>
            </section>
            {/* Content sections skeleton */}
            <section className="max-w-4xl mx-auto my-12 px-4">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
            </section>
            {/* Course cards skeleton */}
            <section className="max-w-4xl mx-auto my-12 px-4">
                <div className="h-8 bg-gray-200 rounded w-80 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-6">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="space-y-2 mb-4">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

