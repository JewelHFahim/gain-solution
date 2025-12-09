export interface Course {
    id: number;
    code: string;
    name: string;
    facultyName: string;
    credits: number;
    enrolled: number;
    capacity: number;
    schedule: string;
    description: string;
}

export interface CourseListResponse {
    data: Course[];
    total: number;
    page: number;
    limit: number;
}
