/**
 * Form loading skeleton
 */
export default function FormSkeleton() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
            <div className="space-y-4">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}

