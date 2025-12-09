'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CourseCard } from '@/components/courses/CourseCard';
import { useDebounce } from '@/hooks/useDebounce';
import { CourseListResponse } from '@/types/course';
import { Search } from 'lucide-react';

async function fetchCourses(page: number, search: string): Promise<CourseListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        search,
    });
    const { data } = await axios.get(`/api/courses?${params}`);
    return data;
}

export default function CoursesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading } = useQuery({
        queryKey: ['courses', page, debouncedSearch],
        queryFn: () => fetchCourses(page, debouncedSearch),
        placeholderData: (previousData) => previousData,
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Courses</h1>

                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border border-gray-300 rounded-md leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search courses..."
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl h-[300px] shadow-sm border border-gray-100 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.data.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {data && (
                        <div className="flex justify-center mt-8">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <div className="flex items-center px-4 text-sm text-gray-600">
                                    Page {data.page} of {Math.ceil(data.total / data.limit)}
                                </div>
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={page * data.limit >= data.total}
                                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
