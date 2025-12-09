'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GradingTable } from '@/components/faculty/GradingTable';

async function fetchGrades() {
    const { data } = await axios.get('/api/faculty/grading');
    return data;
}

import { use } from 'react';

export default function CourseGradingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading } = useQuery({
        queryKey: ['courseGrades', id],
        queryFn: fetchGrades,
    });

    if (isLoading) return <div className="p-8">Loading grades...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Course Grading</h1>
                    <p className="text-gray-600 mt-1">Manage student grades for Course ID: {id}</p>
                </div>
            </div>

            {data && <GradingTable initialData={data} />}
        </div>
    );
}
