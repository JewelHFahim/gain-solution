import { NextResponse } from 'next/server';

export async function GET() {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock courses for logged in faculty
    const courses = [
        { id: 101, code: 'CS101', name: 'Intro to Computer Science', enrolled: 45, schedule: 'Mon/Wed 10:00' },
        { id: 104, code: 'CS102', name: 'Data Structures', enrolled: 38, schedule: 'Tue/Thu 14:00' },
        { id: 205, code: 'CS205', name: 'Algorithms', enrolled: 30, schedule: 'Fri 09:00' },
    ];

    return NextResponse.json(courses);
}
