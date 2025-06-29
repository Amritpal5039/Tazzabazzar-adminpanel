import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingBag, ChartBar as BarChart3, Calendar } from 'lucide-react-native';
import { dummyDB } from '@/services/dummyDatabase';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
        <View style={styles.changeContainer}>
          {isPositive ? (
            <TrendingUp size={16} color="#10B981" />
          ) : (
            <TrendingDown size={16} color="#EF4444" />
          )}
          <Text style={[styles.changeText, { color: isPositive ? '#10B981' : '#EF4444' }]}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </Text>
        </View>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );
}

export default function AnalyticsScreen() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const data = dummyDB.getAnalytics();
    setAnalyticsData(data);
  };

  if (!analyticsData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <BarChart3 size={48} color="#10B981" />
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const revenueChange = analyticsData.revenue.yesterday > 0 
    ? ((analyticsData.revenue.today - analyticsData.revenue.yesterday) / analyticsData.revenue.yesterday * 100)
    : 0;
  
  const ordersChange = analyticsData.orders.yesterday > 0
    ? ((analyticsData.orders.today - analyticsData.orders.yesterday) / analyticsData.orders.yesterday * 100)
    : 0;
  
  const monthlyRevenueChange = analyticsData.revenue.lastMonth > 0
    ? ((analyticsData.revenue.thisMonth - analyticsData.revenue.lastMonth) / analyticsData.revenue.lastMonth * 100)
    : 0;
  
  const monthlyOrdersChange = analyticsData.orders.lastMonth > 0
    ? ((analyticsData.orders.thisMonth - analyticsData.orders.lastMonth) / analyticsData.orders.lastMonth * 100)
    : 0;

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Analytics Dashboard</Text>
            <Text style={styles.subtitle}>Track your business performance</Text>
          </View>
          <View style={styles.headerIcon}>
            <BarChart3 size={32} color="#10B981" />
          </View>
        </View>

        <View style={styles.periodSelector}>
          {periods.map(period => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.activePeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period.key as any)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.key && styles.activePeriodButtonText,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Today's Performance</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Today's Revenue"
            value={`₹${analyticsData.revenue.today.toLocaleString()}`}
            change={revenueChange}
            icon={<DollarSign size={24} color="#10B981" />}
            color="#10B981"
          />
          <MetricCard
            title="Today's Orders"
            value={analyticsData.orders.today.toString()}
            change={ordersChange}
            icon={<ShoppingBag size={24} color="#3B82F6" />}
            color="#3B82F6"
          />
        </View>

        <Text style={styles.sectionTitle}>Monthly Overview</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Monthly Revenue"
            value={`₹${(analyticsData.revenue.thisMonth / 1000).toFixed(0)}K`}
            change={monthlyRevenueChange}
            icon={<DollarSign size={24} color="#10B981" />}
            color="#10B981"
          />
          <MetricCard
            title="Monthly Orders"
            value={analyticsData.orders.thisMonth.toString()}
            change={monthlyOrdersChange}
            icon={<ShoppingBag size={24} color="#3B82F6" />}
            color="#3B82F6"
          />
        </View>

        <Text style={styles.sectionTitle}>Inventory Status</Text>
        <View style={styles.inventoryGrid}>
          <View style={styles.inventoryCard}>
            <View style={styles.inventoryHeader}>
              <Package size={20} color="#64748B" />
              <Text style={styles.inventoryTitle}>Total Products</Text>
            </View>
            <Text style={styles.inventoryValue}>{analyticsData.products.total}</Text>
            <Text style={styles.inventorySubtext}>Active items</Text>
          </View>
          
          <View style={styles.inventoryCard}>
            <View style={styles.inventoryHeader}>
              <Package size={20} color="#F59E0B" />
              <Text style={styles.inventoryTitle}>Low Stock</Text>
            </View>
            <Text style={[styles.inventoryValue, { color: '#F59E0B' }]}>
              {analyticsData.products.lowStock}
            </Text>
            <Text style={styles.inventorySubtext}>Need restock</Text>
          </View>
          
          <View style={styles.inventoryCard}>
            <View style={styles.inventoryHeader}>
              <Package size={20} color="#EF4444" />
              <Text style={styles.inventoryTitle}>Out of Stock</Text>
            </View>
            <Text style={[styles.inventoryValue, { color: '#EF4444' }]}>
              {analyticsData.products.outOfStock}
            </Text>
            <Text style={styles.inventorySubtext}>Urgent action</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Customer Insights</Text>
        <View style={styles.customerSection}>
          <View style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <Users size={24} color="#8B5CF6" />
              <Text style={styles.customerTitle}>Total Customers</Text>
            </View>
            <Text style={styles.customerValue}>{analyticsData.customers.total.toLocaleString()}</Text>
            <Text style={styles.customerSubtext}>Registered users</Text>
          </View>
          
          <View style={styles.customerRow}>
            <View style={styles.customerSubCard}>
              <Text style={styles.customerSubTitle}>New Today</Text>
              <Text style={styles.customerSubValue}>{analyticsData.customers.new}</Text>
              <Text style={styles.customerSubText}>First-time buyers</Text>
            </View>
            <View style={styles.customerSubCard}>
              <Text style={styles.customerSubTitle}>Returning</Text>
              <Text style={styles.customerSubValue}>{analyticsData.customers.returning}</Text>
              <Text style={styles.customerSubText}>Repeat customers</Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Quick Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Calendar size={16} color="#64748B" />
              <Text style={styles.summaryLabel}>Best Day</Text>
              <Text style={styles.summaryValue}>Yesterday</Text>
            </View>
            <View style={styles.summaryItem}>
              <Package size={16} color="#64748B" />
              <Text style={styles.summaryLabel}>Top Category</Text>
              <Text style={styles.summaryValue}>Vegetables</Text>
            </View>
            <View style={styles.summaryItem}>
              <DollarSign size={16} color="#64748B" />
              <Text style={styles.summaryLabel}>Avg Order</Text>
              <Text style={styles.summaryValue}>₹{Math.round(analyticsData.revenue.thisMonth / analyticsData.orders.thisMonth)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <TrendingUp size={16} color="#10B981" />
              <Text style={styles.summaryLabel}>Growth</Text>
              <Text style={[styles.summaryValue, { color: '#10B981' }]}>+{monthlyRevenueChange.toFixed(1)}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activePeriodButtonText: {
    color: '#1E293B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748B',
  },
  inventoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inventoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  inventoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inventoryTitle: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  inventoryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  inventorySubtext: {
    fontSize: 11,
    color: '#94A3B8',
  },
  customerSection: {
    marginBottom: 24,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  customerValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  customerSubtext: {
    fontSize: 14,
    color: '#64748B',
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerSubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  customerSubTitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  customerSubValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  customerSubText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  bottomSpacing: {
    height: 20,
  },
});