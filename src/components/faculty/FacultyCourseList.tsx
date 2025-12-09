import Link from 'next/link';
import { Users, Clock, ChevronRight } from 'lucide-react';

interface FacultyCourse {
    id: number;
    code: string;
    name: string;
    enrolled: number;
    schedule: string;
}

export function FacultyCourseList({ courses }: { courses: FacultyCourse[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Link key={course.id} href={`/faculty/course/${course.id}`} className="block">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all h-full flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                    {course.code}
                                </span>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                        </div>

                        <div className="mt-4 space-y-3 pt-4 border-t border-gray-50">
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{course.enrolled} Students Enrolled</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{course.schedule}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
