'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface EnrollmentChartProps {
    categories: string[];
    data: number[];
}

export function EnrollmentChart({ categories, data }: EnrollmentChartProps) {
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            title: { text: 'Students' },
        },
        fill: { opacity: 1 },
        tooltip: {
            y: {
                formatter: (val) => `${val} students`
            }
        },
        colors: ['#4f46e5'],
    };

    const series = [{
        name: 'Enrollments',
        data: data,
    }];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Enrollments</h3>
            <div className="h-[350px]">
                {typeof window !== 'undefined' && (
                    <Chart options={options} series={series} type="bar" height="100%" />
                )}
            </div>
        </div>
    );
}
