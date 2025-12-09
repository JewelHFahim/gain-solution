'use client';

import { FileText, Download } from 'lucide-react';

export default function ReportsPage() {
    const handleExport = () => {
        // Mock export
        const data = [
            ['Student Name', 'Course', 'Grade'],
            ['Farhan Ahmed', 'CS101', 'A'],
            ['Nusrat Jahan', 'CS101', 'B+'],
        ];

        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "academic_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Academic Reports</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 mr-4">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Semester Performance Report</h2>
                            <p className="text-gray-500">Summary of all student grades for Spring 2025</p>
                        </div>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 font-medium"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                    <p>This report includes detailed performance metrics for all departments.</p>
                </div>
            </div>
        </div>
    );
}
