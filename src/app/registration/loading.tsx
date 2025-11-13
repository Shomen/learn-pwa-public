import FormSkeleton from '@/components/skeletons/FormSkeleton';

export default function RegistrationLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
            <FormSkeleton />
        </div>
    );
}

