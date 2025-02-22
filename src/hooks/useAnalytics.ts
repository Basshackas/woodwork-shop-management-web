import { useMemo } from 'react';
import type { SaleTransaction } from '../types';

export function useAnalytics(salesData: SaleTransaction[]) {
  return useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    const lastMonthSales = salesData.filter(sale => new Date(sale.date) >= thirtyDaysAgo);

    // Calculate total sales and revenue
    const totalSales = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const lastMonthTotal = lastMonthSales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    // Calculate average order value
    const averageOrderValue = totalSales / (salesData.length || 1);
    const lastMonthAverage = lastMonthTotal / (lastMonthSales.length || 1);

    // Calculate growth rates
    const revenueGrowth = totalSales > 0 ? ((lastMonthTotal - totalSales) / totalSales) * 100 : 0;

    // Calculate customer metrics
    const uniqueCustomers = new Set(salesData.map(sale => sale.customerName)).size;
    const repeatCustomers = salesData.reduce((acc, sale) => {
      acc[sale.customerName] = (acc[sale.customerName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const repeatRate = (Object.values(repeatCustomers).filter(count => count > 1).length / uniqueCustomers) * 100;

    // Payment method distribution
    const paymentMethods = salesData.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSales,
      lastMonthTotal,
      averageOrderValue,
      lastMonthAverage,
      revenueGrowth,
      uniqueCustomers,
      repeatRate,
      paymentMethods
    };
  }, [salesData]);
}