import { FinancialMetrics } from '../types';

export const analyticsData: FinancialMetrics = {
  revenue: 450000,
  expenses: 320000,
  profit: 130000,
  cashFlow: 95000,
  projectMargins: [
    {
      projectId: '1',
      revenue: 85000,
      costs: 55000,
      margin: 35.29,
      laborHours: 420,
      materialCosts: 35000,
      overheadCosts: 20000
    },
    {
      projectId: '2',
      revenue: 120000,
      costs: 82000,
      margin: 31.67,
      laborHours: 680,
      materialCosts: 52000,
      overheadCosts: 30000
    },
    {
      projectId: '3',
      revenue: 45000,
      costs: 28000,
      margin: 37.78,
      laborHours: 240,
      materialCosts: 18000,
      overheadCosts: 10000
    }
  ],
  monthlyTrends: [
    {
      month: '2024-01',
      revenue: 42000,
      expenses: 31000,
      profit: 11000,
      projectCount: 4,
      laborHours: 840,
      materialCosts: 20000,
      overheadCosts: 11000
    },
    {
      month: '2024-02',
      revenue: 38000,
      expenses: 28000,
      profit: 10000,
      projectCount: 3,
      laborHours: 720,
      materialCosts: 18000,
      overheadCosts: 10000
    },
    {
      month: '2024-03',
      revenue: 45000,
      expenses: 32000,
      profit: 13000,
      projectCount: 5,
      laborHours: 920,
      materialCosts: 21000,
      overheadCosts: 11000
    }
  ],
  forecasts: [
    {
      period: 'Q2 2024',
      projectedRevenue: 150000,
      projectedExpenses: 105000,
      projectedProfit: 45000,
      confidence: 0.85,
      riskFactors: ['Market Competition', 'Material Costs'],
      opportunities: ['New Market Expansion', 'Process Optimization']
    },
    {
      period: 'Q3 2024',
      projectedRevenue: 180000,
      projectedExpenses: 125000,
      projectedProfit: 55000,
      confidence: 0.75,
      riskFactors: ['Seasonal Slowdown', 'Labor Costs'],
      opportunities: ['Product Innovation', 'Strategic Partnerships']
    },
    {
      period: 'Q4 2024',
      projectedRevenue: 200000,
      projectedExpenses: 140000,
      projectedProfit: 60000,
      confidence: 0.65,
      riskFactors: ['Economic Uncertainty', 'Supply Chain'],
      opportunities: ['Market Consolidation', 'Technology Investment']
    }
  ],
  keyMetrics: {
    customerRetention: 92,
    projectCompletionRate: 88,
    employeeProductivity: 85,
    materialWastage: 3.2,
    qualityScore: 4.8,
    customerSatisfaction: 4.6
  }
};