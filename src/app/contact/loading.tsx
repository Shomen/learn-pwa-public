import FormSkeleton from '@/components/skeletons/FormSkeleton';

export default function ContactLoading() {
    return (
        <div className="min-h-screen flex">
            {/* Left Section - Background Image Skeleton */}
            <div className="hidden lg:block lg:w-1/2 bg-gray-200 animate-pulse"></div>
            {/* Right Section - Form Skeleton */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <FormSkeleton />
            </div>
        </div>
    );
}

