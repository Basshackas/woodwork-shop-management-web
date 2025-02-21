import React from 'react';
import { Employee, Certification } from '../../types';
import { Award, Book, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface TrainingProgressProps {
  employee: Employee;
}

export function TrainingProgress({ employee }: TrainingProgressProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Training & Certifications</h2>
        
        {/* Certifications */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Current Certifications</h3>
          {employee.certifications?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employee.certifications.map(cert => (
                <div key={cert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-600">{cert.issuingAuthority}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No certifications found</p>
          )}
        </div>

        {/* Skills Development */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Skills Development</h3>
          <div className="space-y-4">
            {employee.skills?.map(skill => (
              <div key={skill.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-gray-600" />
                    <p className="font-medium">{skill.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    skill.level === 'expert' ? 'bg-green-100 text-green-800' :
                    skill.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{skill.yearsOfExperience} years experience</span>
                  <span>Last used: {new Date(skill.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Requirements */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Required Training</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Safety Training</span>
              </div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span>Advanced Tools Workshop</span>
              </div>
              <span className="text-sm text-gray-600">Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
