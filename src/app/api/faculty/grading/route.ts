import { NextRequest, NextResponse } from 'next/server';

// Mock grading data
let gradingData = [
    { studentId: 1, name: 'Ayesha Rahman', grade: 'A', midTerm: 92, final: 95 },
    { studentId: 2, name: 'Imran Hossain', grade: 'B+', midTerm: 85, final: 88 },
    { studentId: 3, name: 'Samiul Karim', grade: 'A-', midTerm: 89, final: 91 },
    { studentId: 4, name: 'Nusrat Jahan', grade: 'A', midTerm: 95, final: 96 },
    { studentId: 5, name: 'Farhan Ahmed', grade: 'B', midTerm: 82, final: 84 },
];

export async function GET(request: NextRequest) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json(gradingData);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { studentId, grade } = body;

    // Update mock data
    gradingData = gradingData.map(s =>
        s.studentId === studentId ? { ...s, grade } : s
    );

    return NextResponse.json({ success: true });
}
