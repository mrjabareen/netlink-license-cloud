'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  Key,
  Package,
  TrendingUp,
  Users,
  Activity,
  Download,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 12500, licenses: 145 },
  { month: 'Feb', revenue: 15800, licenses: 189 },
  { month: 'Mar', revenue: 18200, licenses: 212 },
  { month: 'Apr', revenue: 22100, licenses: 278 },
  { month: 'May', revenue: 26500, licenses: 324 },
  { month: 'Jun', revenue: 31200, licenses: 389 },
];

const activationData = [
  { day: 'Mon', activations: 45 },
  { day: 'Tue', activations: 52 },
  { day: 'Wed', activations: 61 },
  { day: 'Thu', activations: 58 },
  { day: 'Fri', activations: 72 },
  { day: 'Sat', activations: 38 },
  { day: 'Sun', activations: 41 },
];

const productDistribution = [
  { name: 'Pro Plan', value: 45, color: '#10b981' },
  { name: 'Business', value: 30, color: '#3b82f6' },
  { name: 'Enterprise', value: 20, color: '#8b5cf6' },
  { name: 'Starter', value: 5, color: '#f59e0b' },
];

const stats = [
  {
    title: 'Total Revenue',
    value: '$142,380',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    description: 'vs last month',
  },
  {
    title: 'Active Licenses',
    value: '1,567',
    change: '+15.3%',
    trend: 'up',
    icon: Key,
    description: 'Currently active',
  },
  {
    title: 'Total Customers',
    value: '892',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    description: 'Registered users',
  },
  {
    title: 'Activation Rate',
    value: '94.2%',
    change: '-2.1%',
    trend: 'down',
    icon: Activity,
    description: 'Success rate',
  },
];

const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Activated license',
    product: 'Business Plan',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Purchased license',
    product: 'Pro Plan',
    time: '15 minutes ago',
    status: 'success',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'License expired',
    product: 'Starter Plan',
    time: '1 hour ago',
    status: 'warning',
  },
  {
    id: 4,
    user: 'Sarah Williams',
    action: 'Renewed license',
    product: 'Enterprise Plan',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 5,
    user: 'Tom Brown',
    action: 'Deactivated license',
    product: 'Pro Plan',
    time: '3 hours ago',
    status: 'danger',
  },
];

const topProducts = [
  { name: 'Business Suite Pro', licenses: 423, revenue: 42300, growth: 15 },
  { name: 'Developer Tools', licenses: 312, revenue: 31200, growth: 22 },
  { name: 'Enterprise CRM', licenses: 189, revenue: 56700, growth: -5 },
  { name: 'Analytics Platform', licenses: 156, revenue: 23400, growth: 8 },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your licenses today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and license sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="text-sm font-semibold">{payload[0].payload.month}</p>
                          <p className="text-sm">
                            Revenue: {formatCurrency(payload[0].value as number)}
                          </p>
                          <p className="text-sm">
                            Licenses: {payload[0].payload.licenses}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activations Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activations</CardTitle>
            <CardDescription>License activations this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activationData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="text-sm font-semibold">{payload[0].payload.day}</p>
                          <p className="text-sm">
                            Activations: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="activations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Product Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>License distribution by product</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{product.licenses} licenses</span>
                      <span>{formatCurrency(product.revenue)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.growth > 0 ? (
                      <ArrowUpIcon className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs ${
                        product.growth > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest license activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.action}</span>
                      <span>•</span>
                      <span>{activity.product}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge
                      variant={
                        activity.status === 'success'
                          ? 'default'
                          : activity.status === 'warning'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="mt-1"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
