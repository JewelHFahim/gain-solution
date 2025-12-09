'use client';

import { Search } from 'lucide-react';

interface StudentFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    program: string;
    onProgramChange: (value: string) => void;
}

export function StudentFilters({ search, onSearchChange, program, onProgramChange }: StudentFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border border-gray-300 rounded-md leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search students by name or email..."
                />
            </div>
            <div className="w-full md:w-48">
                <select
                    value={program}
                    onChange={(e) => onProgramChange(e.target.value)}
                    className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All Programs</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Engineering">Engineering</option>
                    <option value="History">History</option>
                </select>
            </div>
        </div>
    );
}
