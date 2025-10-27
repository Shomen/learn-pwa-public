/**
 * Dashboard Page
 */
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-700">This is a protected area of the application.</p>
    </div>
  );
}