import { NextRequest, NextResponse } from 'next/server';
import { StudentProfile } from '@/types/student';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: idVal } = await params;
    const id = parseInt(idVal);

    // delay
    await new Promise(resolve => setTimeout(resolve, 300));


    // Static name
    const profile: StudentProfile = {
        id: id,
        name: 'Ayesha Rahman',
        email: 'ayesha@university.edu',
        program: 'Computer Science',
        enrollmentYear: 2022,
        status: 'Active',
        gpa: 3.85,
        address: '123 University Ave, Campus Town, ST',
        phone: '(173) 123-4567',
        dob: '2001-05-15',
        courses: [
            { id: 101, code: 'CS101', name: 'Intro to Computer Science', grade: 'A', semester: 'Fall 2022', credits: 4 },
            { id: 102, code: 'MAT101', name: 'Calculus I', grade: 'B+', semester: 'Fall 2022', credits: 4 },
            { id: 103, code: 'ENG101', name: 'College Writing', grade: 'A-', semester: 'Fall 2022', credits: 3 },
            { id: 104, code: 'CS102', name: 'Data Structures', grade: 'A', semester: 'Spring 2023', credits: 4 },
            { id: 105, code: 'PHY101', name: 'Physics I', grade: 'B', semester: 'Spring 2023', credits: 4 },
        ]
    };

    return NextResponse.json(profile);
}
