'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StudentProfileHeader } from '@/components/students/StudentProfileHeader';
import { StudentGradesTable } from '@/components/students/StudentGradesTable';
import { StudentProfile } from '@/types/student';

async function fetchStudentProfile(id: string): Promise<StudentProfile> {
    const { data } = await axios.get(`/api/students/${id}`);
    return data;
}

import { use } from 'react';


export default function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data, isLoading } = useQuery({
        queryKey: ['student', id],
        queryFn: () => fetchStudentProfile(id),
    });

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    if (!data) {
        return <div className="p-8 text-center text-red-500">Student not found</div>;
    }

    return (
        <div className="space-y-6">
            <StudentProfileHeader student={data} />
            <StudentGradesTable courses={data.courses} />
        </div>
    );
}
