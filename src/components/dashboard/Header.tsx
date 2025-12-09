'use client';

import { Bell, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 border border-gray-300 rounded-md leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search students, courses..."
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <Bell className="w-6 h-6" />
                </button>
                <div className="relative ml-3">
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-medium text-gray-900">Admin User</span>
                            <span className="text-xs text-gray-500">Administrator</span>
                        </div>
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            A
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
