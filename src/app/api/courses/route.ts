import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@/types/course';

const courses: Course[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    code: ['CS', 'MAT', 'PHY', 'ENG', 'HIS'][i % 5] + (100 + i),
    name: `Course ${i + 1} Title`,
    facultyName: `Prof. ${['Rahman', 'Hossain', 'Chowdhury', 'Karim', 'Ahmed'][i % 5]}`,
    credits: 3 + (i % 2),
    enrolled: 20 + (i % 30),
    capacity: 60,
    schedule: ['Mon/Wed 10:00', 'Tue/Thu 14:00', 'Fri 09:00'][i % 3],
    description: 'This is a comprehensive course covering fundamental concepts and advanced topics in the field.'
}));

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';

    let filtered = courses;

    if (search) {
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.code.toLowerCase().includes(search.toLowerCase())
        );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    // delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    });
}
