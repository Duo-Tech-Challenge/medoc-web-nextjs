'use client';


import { Badge } from './Badge';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const statusConfig = {
  active: {
    label: 'Active',
    variant: 'success' as const,
  },
  inactive: {
    label: 'Inactive',
    variant: 'default' as const,
  },
  pending: {
    label: 'Pending',
    variant: 'warning' as const,
  },
  suspended: {
    label: 'Suspended',
    variant: 'danger' as const,
  },
  rejected: {
    label: 'Rejected',
    variant: 'danger' as const,
  },
};

export default function StatusBadge({ status, size = 'md', animated = false }: StatusBadgeProps) {
  const config = statusConfig[status];
  const pulseClass = animated && status === 'pending' ? 'animate-pulse' : '';

  return (
    <Badge variant={config.variant} size={size}>
      <span className={`flex items-center gap-2 ${pulseClass}`}>
        <span className={`w-2 h-2 rounded-full ${
          status === 'active' ? 'bg-green-600' :
          status === 'inactive' ? 'bg-gray-500' :
          status === 'pending' ? 'bg-yellow-600' :
          'bg-red-600'
        }`} />
        {config.label}
      </span>
    </Badge>
  );
}
