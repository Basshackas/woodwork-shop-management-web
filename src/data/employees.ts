import { Employee } from '../types';

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Michael Chen',
    role: 'Senior Craftsman',
    email: 'michael.chen@example.com',
    phone: '(555) 123-4567',
    employmentType: 'salary',
    salary: 75000,
    status: 'active',
    department: 'Production',
    projectIds: ['1', '2'],
    skills: [
      {
        id: '1',
        name: 'Cabinet Making',
        level: 'expert',
        yearsOfExperience: 8,
        lastUsed: '2024-03-15'
      },
      {
        id: '2',
        name: 'Wood Finishing',
        level: 'expert',
        yearsOfExperience: 10,
        lastUsed: '2024-03-15'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Master Craftsman',
        issueDate: '2020-01-15',
        expiryDate: '2025-01-15',
        issuingAuthority: 'Woodworking Institute',
        status: 'active'
      }
    ],
    startDate: '2018-03-15',
    emergencyContact: {
      name: 'Sarah Chen',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    },
    documents: [
      {
        id: '1',
        type: 'contract',
        name: 'Employment Contract',
        url: '/documents/contract-001.pdf',
        uploadDate: '2018-03-15',
        required: true,
        status: 'valid'
      }
    ],
    performance: [
      {
        id: '1',
        date: '2024-01-15',
        reviewer: 'John Manager',
        rating: 4.8,
        strengths: ['Leadership', 'Technical Skills', 'Quality'],
        improvements: ['Documentation'],
        goals: ['Train junior staff', 'Lead 3 major projects'],
        comments: 'Exceptional performance and leadership'
      }
    ],
    availability: {
      schedule: [
        {
          day: 'Monday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Tuesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Wednesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Thursday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Friday',
          shifts: [{ start: '08:00', end: '17:00' }]
        }
      ],
      timeOff: [
        {
          id: '1',
          type: 'vacation',
          startDate: '2024-04-01',
          endDate: '2024-04-05',
          approved: true,
          approvedBy: 'John Manager'
        }
      ],
      utilization: 85
    }
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    role: 'Junior Woodworker',
    email: 'emma.rodriguez@example.com',
    phone: '(555) 234-5678',
    employmentType: 'wage',
    hourlyRate: 25,
    status: 'active',
    department: 'Production',
    projectIds: ['3'],
    skills: [
      {
        id: '3',
        name: 'Basic Woodworking',
        level: 'intermediate',
        yearsOfExperience: 2,
        lastUsed: '2024-03-15'
      }
    ],
    certifications: [
      {
        id: '2',
        name: 'Safety Certification',
        issueDate: '2023-01-15',
        expiryDate: '2024-01-15',
        issuingAuthority: 'Safety Council',
        status: 'expired'
      }
    ],
    startDate: '2022-06-15',
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Mother',
      phone: '(555) 876-5432'
    },
    documents: [
      {
        id: '2',
        type: 'contract',
        name: 'Employment Contract',
        url: '/documents/contract-002.pdf',
        uploadDate: '2022-06-15',
        required: true,
        status: 'valid'
      }
    ],
    performance: [
      {
        id: '2',
        date: '2024-01-15',
        reviewer: 'Michael Chen',
        rating: 4.2,
        strengths: ['Quick learner', 'Team player'],
        improvements: ['Technical skills', 'Time management'],
        goals: ['Complete advanced training', 'Lead small project'],
        comments: 'Shows great potential and enthusiasm'
      }
    ],
    availability: {
      schedule: [
        {
          day: 'Monday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Tuesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Wednesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Thursday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Friday',
          shifts: [{ start: '08:00', end: '17:00' }]
        }
      ],
      timeOff: [],
      utilization: 75
    }
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Workshop Assistant',
    email: 'james.wilson@example.com',
    phone: '(555) 345-6789',
    employmentType: 'wage',
    hourlyRate: 20,
    status: 'on-leave',
    department: 'Production',
    projectIds: [],
    skills: [
      {
        id: '4',
        name: 'Tool Maintenance',
        level: 'intermediate',
        yearsOfExperience: 1,
        lastUsed: '2024-03-10'
      }
    ],
    certifications: [],
    startDate: '2023-01-15',
    emergencyContact: {
      name: 'Jane Wilson',
      relationship: 'Sister',
      phone: '(555) 765-4321'
    },
    documents: [
      {
        id: '3',
        type: 'contract',
        name: 'Employment Contract',
        url: '/documents/contract-003.pdf',
        uploadDate: '2023-01-15',
        required: true,
        status: 'valid'
      }
    ],
    performance: [
      {
        id: '3',
        date: '2024-01-15',
        reviewer: 'Michael Chen',
        rating: 3.8,
        strengths: ['Reliability', 'Organization'],
        improvements: ['Initiative', 'Skill development'],
        goals: ['Complete basic certifications', 'Improve efficiency'],
        comments: 'Reliable team member with room for growth'
      }
    ],
    availability: {
      schedule: [
        {
          day: 'Monday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Tuesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Wednesday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Thursday',
          shifts: [{ start: '08:00', end: '17:00' }]
        },
        {
          day: 'Friday',
          shifts: [{ start: '08:00', end: '17:00' }]
        }
      ],
      timeOff: [
        {
          id: '2',
          type: 'sick',
          startDate: '2024-03-10',
          endDate: '2024-03-20',
          approved: true,
          approvedBy: 'John Manager'
        }
      ],
      utilization: 60
    }
  }
];
