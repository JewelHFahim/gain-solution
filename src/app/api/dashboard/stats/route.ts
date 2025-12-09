import { NextResponse } from 'next/server';

export async function GET() {
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
        students: { total: 1250, trend: 12, label: 'vs last semester' },
        courses: { total: 45, trend: 5, label: 'new courses' },
        faculty: { total: 85, trend: 2, label: 'new hires' },
        enrollmentData: {
            categories: ['CS101', 'MAT201', 'PHY101', 'ENG101', 'HIS101', 'CHE101', 'BIO101'],
            series: [{
                name: 'Enrollments',
                data: [450, 320, 280, 400, 150, 180, 210]
            }]
        },
        topStudents: [
            { id: 1, name: 'Ayesha Rahman', gpa: 3.98, program: 'Computer Science', grade: 'A+' },
            { id: 2, name: 'Imran Hossain', gpa: 3.95, program: 'Mathematics', grade: 'A' },
            { id: 3, name: 'Samiul Karim', gpa: 3.92, program: 'Physics', grade: 'A' },
            { id: 4, name: 'Nusrat Jahan', gpa: 3.90, program: 'Engineering', grade: 'A' },
            { id: 5, name: 'Farhan Ahmed', gpa: 3.88, program: 'History', grade: 'A-' },
        ]
    });
}
