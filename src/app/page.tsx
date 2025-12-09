'use client';

import axios from 'axios';
import { StatsData } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EnrollmentChart } from '@/components/dashboard/EnrollmentChart';
import { StudentLeaderboard } from '@/components/dashboard/StudentLeaderboard';

async function fetchDashboardStats(): Promise<StatsData> {
  const { data } = await axios.get('/api/dashboard/stats');
  return data;
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-red-500">Failed to load dashboard data.</div>
      </div>
    );
  }

  const { students, courses, faculty, enrollmentData, topStudents } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Students"
          value={students.total}
          icon={Users}
          trend={{ value: students.trend, label: students.label }}
          color="blue"
        />
        <StatsCard
          title="Total Courses"
          value={courses.total}
          icon={BookOpen}
          trend={{ value: courses.trend, label: courses.label }}
          color="green"
        />
        <StatsCard
          title="Faculty Members"
          value={faculty.total}
          icon={GraduationCap}
          trend={{ value: faculty.trend, label: faculty.label }}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentChart
          categories={enrollmentData.categories}
          data={enrollmentData.series[0].data}
        />
        <StudentLeaderboard students={topStudents} />
      </div>
    </div>
  );
}
