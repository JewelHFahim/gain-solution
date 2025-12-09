'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentTable } from '@/components/students/StudentTable';
import { useDebounce } from '@/hooks/useDebounce';
import { StudentListResponse } from '@/types/student';

async function fetchStudents(page: number, search: string, program: string): Promise<StudentListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        program,
    });
    const { data } = await axios.get(`/api/students?${params}`);
    return data;
}

export default function StudentsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [program, setProgram] = useState('');

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading } = useQuery({
        queryKey: ['students', page, debouncedSearch, program],
        queryFn: () => fetchStudents(page, debouncedSearch, program),
        placeholderData: (previousData) => previousData,
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            </div>

            <StudentFilters
                search={search}
                onSearchChange={(val) => { setSearch(val); setPage(1); }}
                program={program}
                onProgramChange={(val) => { setProgram(val); setPage(1); }}
            />

            <StudentTable
                students={data?.data || []}
                isLoading={isLoading}
            />

            {data && (
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(data.page - 1) * data.limit + 1}</span> to <span className="font-medium">{Math.min(data.page * data.limit, data.total)}</span> of <span className="font-medium">{data.total}</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1 || isLoading}
                            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!data || page * data.limit >= data.total || isLoading}
                            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
