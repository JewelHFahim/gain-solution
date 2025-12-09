import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    color?: 'blue' | 'green' | 'yellow' | 'purple';
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }: StatsCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={clsx('p-3 rounded-full', colorClasses[color])}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={clsx('font-medium', trend.value >= 0 ? 'text-green-600' : 'text-red-600')}>
                        {trend.value >= 0 ? '+' : ''}{trend.value}%
                    </span>
                    <span className="text-gray-500 ml-2">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
