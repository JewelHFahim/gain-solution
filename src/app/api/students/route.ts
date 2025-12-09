import { NextRequest, NextResponse } from 'next/server';
import { Student } from '@/types/student';



// Mock students
const students: Student[] = Array.from({ length: 100 }, (_, i) => {

    const fullName = [
        'Ayesha Rahman',
        'Imran Hossain',
        'Samiul Karim',
        'Nusrat Jahan',
        'Farhan Ahmed',
        'Maliha Chowdhury',
        'Rafid Islam',
        'Tahsin Nawar',
        'Arif Abdullah',
        'Jannat Akter'
    ][i % 10] + `${Math.floor(i / 10) + 1}`;

    const firstName = fullName.split(" ")[0].toLocaleLowerCase();


    return {
        id: i + 1,
        name: fullName,
        email: `${firstName}${i + 1}@university.edu`,
        program: ['Computer Science', 'Mathematics', 'Physics', 'Engineering', 'History'][i % 5],
        enrollmentYear: 2020 + (i % 4),
        status: i % 15 === 0 ? 'Inactive' : 'Active',
        gpa: (3.0 + (i % 100) / 100).toFixed(2) as unknown as number
    }
});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const program = searchParams.get('program') || '';

    let filtered = students;

    if (search) {
        filtered = filtered.filter(s =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (program) {
        filtered = filtered.filter(s => s.program === program);
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
