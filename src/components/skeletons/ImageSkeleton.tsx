/**
 * Image loading skeleton
 */
export default function ImageSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-gray-200 animate-pulse ${className}`}></div>
    );
}

