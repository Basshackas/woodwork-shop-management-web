type StatusType = 'completed' | 'in-progress' | 'pending' | 'available' | 'in-use' | 'maintenance';

export function getStatusStyle(status: StatusType): string {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    available: 'bg-green-100 text-green-800',
    'in-use': 'bg-blue-100 text-blue-800',
    maintenance: 'bg-red-100 text-red-800'
  };

  return styles[status] || 'bg-gray-100 text-gray-800';
}