export interface Student {
    id: number;
    name: string;
    gpa: number;
    program: string;
    grade: string;
}

export interface StatsData {
    students: { total: number; trend: number; label: string };
    courses: { total: number; trend: number; label: string };
    faculty: { total: number; trend: number; label: string };
    enrollmentData: {
        categories: string[];
        series: { name: string; data: number[] }[];
    };
    topStudents: Student[];
}
