'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FacultyCourseList } from '@/components/faculty/FacultyCourseList';

async function fetchFacultyCourses() {
    const { data } = await axios.get('/api/faculty/courses');
    return data;
}

export default function FacultyPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['facultyCourses'],
        queryFn: fetchFacultyCourses,
    });

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="text-gray-600">Overview of your assigned courses.</p>

            {data && <FacultyCourseList courses={data} />}
        </div>
    );
}
