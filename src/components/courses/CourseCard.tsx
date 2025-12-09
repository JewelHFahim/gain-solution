import { Course } from '@/types/course';
import { BookOpen, Users, Clock } from 'lucide-react';

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const usagePercentage = Math.round((course.enrolled / course.capacity) * 100);
    const isFull = course.enrolled >= course.capacity;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700">
                        {course.code}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-1">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.facultyName}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <BookOpen className="w-5 h-5" />
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 line-clamp-2 min-h-[40px]">
                {course.description}
            </p>

            <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.schedule}
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 flex items-center">
                            <Users className="w-4 h-4 mr-1" /> Enrollment
                        </span>
                        <span className={`font-medium ${isFull ? 'text-red-600' : 'text-gray-900'}`}>
                            {course.enrolled} / {course.capacity}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${isFull ? 'bg-red-500' : usagePercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                            style={{ width: `${usagePercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
