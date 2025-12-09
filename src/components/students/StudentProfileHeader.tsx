import { StudentProfile } from '@/types/student';
import { Mail, MapPin, Phone, Calendar } from 'lucide-react';

interface StudentProfileHeaderProps {
    student: StudentProfile;
}

export function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold ring-4 ring-white shadow-sm">
                    {student.name.charAt(0)}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-gray-500 font-medium">{student.program} • {student.status}</p>
                        </div>
                        <div className="mt-2 md:mt-0 px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 font-bold text-lg">
                            GPA: {student.gpa}
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center justify-center md:justify-start">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {student.email}
                        </div>
                        <div className="flex items-center justify-center md:justify-start">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {student.phone}
                        </div>
                        <div className="flex items-center justify-center md:justify-start">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {student.address}
                        </div>
                        <div className="flex items-center justify-center md:justify-start">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            Enrolled: {student.enrollmentYear}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
