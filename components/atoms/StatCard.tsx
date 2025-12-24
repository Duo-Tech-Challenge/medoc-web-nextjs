'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  icon?: ReactNode;
  color?: 'green' | 'blue' | 'orange' | 'red';
  className?: string;
}

const colorMap = {
  green: 'text-green-600',
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
};

const trendColorMap = {
  up: 'text-green-600',
  down: 'text-red-600',
};

export default function StatCard({
  label,
  value,
  trend,
  icon,
  color = 'blue',
  className = '',
}: StatCardProps) {
  return (
    <Card className={`relative ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.direction === 'up' ? (
                <TrendingUp size={16} className={trendColorMap.up} />
              ) : (
                <TrendingDown size={16} className={trendColorMap.down} />
              )}
              <span className={`text-sm font-medium ${trendColorMap[trend.direction]}`}>
                {trend.percentage}%
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`p-3 rounded-full bg-${color}-50`}>
            <div className={colorMap[color]}>{icon}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
