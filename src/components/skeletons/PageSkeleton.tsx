/**
 * Page loading skeleton
 */
export default function PageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
}

