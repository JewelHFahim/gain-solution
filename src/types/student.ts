export interface Student {
    id: number;
    name: string;
    email: string;
    program: string;
    enrollmentYear: number;
    status: 'Active' | 'Inactive' | 'Graduated';
    gpa: number;
}

export interface StudentListResponse {
    data: Student[];
    total: number;
    page: number;
    limit: number;
}

export interface StudentCourse {
    id: number;
    code: string;
    name: string;
    grade: string;
    semester: string;
    credits: number;
}

export interface StudentProfile extends Student {
    address: string;
    phone: string;
    dob: string;
    courses: StudentCourse[];
}
