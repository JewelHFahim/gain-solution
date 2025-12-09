'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

interface StudentGrade {
    studentId: number;
    name: string;
    grade: string;
    midTerm: number;
    final: number;
}

export function GradingTable({ initialData }: { initialData: StudentGrade[] }) {
    const [grades, setGrades] = useState(initialData);
    const [editingId, setEditingId] = useState<number | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: { studentId: number, grade: string }) => {
            await axios.post('/api/faculty/grading', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courseGrades'] });
            setEditingId(null);
        }
    });

    const handleGradeChange = (id: number, field: keyof StudentGrade, value: string | number) => {
        setGrades(prev => prev.map(g => g.studentId === id ? { ...g, [field]: value } : g));
    };

    const handleSave = (id: number) => {
        const student = grades.find(g => g.studentId === id);
        if (student) {
            mutation.mutate({ studentId: id, grade: student.grade });
        }
    };

    const ths = ["Student Name", "Midterm (100)", "Final (100)", "Final Grade", "Actions"]

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Student Grades</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {
                                ths.map((th, i) => (
                                    <th key={i + 1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{th}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grades.map((student) => (
                            <tr key={student.studentId} className={editingId === student.studentId ? 'bg-indigo-50' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editingId === student.studentId ? (
                                        <input
                                            type="number"
                                            value={student.midTerm}
                                            onChange={(e) => handleGradeChange(student.studentId, 'midTerm', parseInt(e.target.value))}
                                            className="w-20 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                                        />
                                    ) : student.midTerm}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {editingId === student.studentId ? (
                                        <input
                                            type="number"
                                            value={student.final}
                                            onChange={(e) => handleGradeChange(student.studentId, 'final', parseInt(e.target.value))}
                                            className="w-20 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                                        />
                                    ) : student.final}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === student.studentId ? (
                                        <select
                                            value={student.grade}
                                            onChange={(e) => handleGradeChange(student.studentId, 'grade', e.target.value)}
                                            className="rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                                        >
                                            <option>A</option><option>A-</option>
                                            <option>B+</option><option>B</option><option>B-</option>
                                            <option>C+</option><option>C</option><option>F</option>
                                        </select>
                                    ) : (
                                        <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                            student.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                                student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                        )}>
                                            {student.grade}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {editingId === student.studentId ? (
                                        <button
                                            onClick={() => handleSave(student.studentId)}
                                            disabled={mutation.isPending}
                                            className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end w-full"
                                        >
                                            <Save className="w-4 h-4 mr-1" /> Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditingId(student.studentId)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit Grads
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
