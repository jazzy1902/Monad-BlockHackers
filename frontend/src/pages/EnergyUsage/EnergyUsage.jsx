import React from "react";
import {
  FaBolt,
  FaArrowUp,
  FaArrowDown,
  FaHome,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import {
  EnergyUsageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricIcon,
  MetricValue,
  MetricChange,
  ChartsSection,
  ChartCard,
  ChartTitle,
  UsageLogSection,
  LogHeader,
  LogEntry,
  LogTime,
  LogDevice,
  LogUsage,
  LogStatus,
  MockChart,
} from "./EnergyUsage.styles";

export const EnergyUsage = () => {
  const metrics = [
    {
      title: "Total Usage Today",
      value: "24.8 kWh",
      change: "+12% vs yesterday",
      positive: false,
      icon: <FaBolt />,
    },
    {
      title: "Average Daily Usage",
      value: "22.3 kWh",
      change: "-5% this month",
      positive: true,
      icon: <FaHome />,
    },
    {
      title: "Peak Usage Time",
      value: "7:30 PM",
      change: "6.2 kWh peak",
      positive: null,
      icon: <FaClock />,
    },
    {
      title: "Monthly Usage",
      value: "670 kWh",
      change: "+3% vs last month",
      positive: false,
      icon: <FaChartLine />,
    },
  ];

  const usageLogs = [
    {
      time: "09:45 AM",
      device: "Air Conditioning",
      usage: "3.2 kWh",
      status: "high",
    },
    {
      time: "09:30 AM",
      device: "Water Heater",
      usage: "2.8 kWh",
      status: "medium",
    },
    {
      time: "09:15 AM",
      device: "Washing Machine",
      usage: "1.5 kWh",
      status: "medium",
    },
    {
      time: "09:00 AM",
      device: "Refrigerator",
      usage: "0.8 kWh",
      status: "low",
    },
    {
      time: "08:45 AM",
      device: "LED Lights (Living Room)",
      usage: "0.2 kWh",
      status: "low",
    },
    {
      time: "08:30 AM",
      device: "Laptop Charging",
      usage: "0.1 kWh",
      status: "low",
    },
    {
      time: "08:15 AM",
      device: "Coffee Maker",
      usage: "1.2 kWh",
      status: "medium",
    },
    { time: "08:00 AM", device: "Microwave", usage: "0.9 kWh", status: "low" },
    {
      time: "07:45 AM",
      device: "Electric Kettle",
      usage: "1.8 kWh",
      status: "medium",
    },
    {
      time: "07:30 AM",
      device: "Hair Dryer",
      usage: "1.5 kWh",
      status: "medium",
    },
  ];

  return (
    <EnergyUsageContainer>
      <PageHeader>
        <PageTitle>⚡ Power Usage Analytics</PageTitle>
        <PageSubtitle>
          Monitor and analyze your energy consumption patterns
        </PageSubtitle>
      </PageHeader>

      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricHeader>
              <MetricTitle>{metric.title}</MetricTitle>
              <MetricIcon>{metric.icon}</MetricIcon>
            </MetricHeader>
            <MetricValue>{metric.value}</MetricValue>
            {metric.positive !== null && (
              <MetricChange $positive={metric.positive}>
                {metric.positive ? <FaArrowUp /> : <FaArrowDown />}
                {metric.change}
              </MetricChange>
            )}
            {metric.positive === null && (
              <div style={{ fontSize: "0.9rem", color: "inherit" }}>
                {metric.change}
              </div>
            )}
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartsSection>
        <ChartCard>
          <ChartTitle>Daily Usage Pattern</ChartTitle>
          <MockChart>
            📊 Interactive usage chart will be implemented here
          </MockChart>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Device Breakdown</ChartTitle>
          <MockChart>
            🥧 Device usage pie chart will be implemented here
          </MockChart>
        </ChartCard>
      </ChartsSection>

      <UsageLogSection>
        <LogHeader>⏰ Real-time Usage Log</LogHeader>
        {usageLogs.map((log, index) => (
          <LogEntry key={index}>
            <LogTime>{log.time}</LogTime>
            <LogDevice>{log.device}</LogDevice>
            <LogUsage>{log.usage}</LogUsage>
            <LogStatus $status={log.status}>
              {log.status.toUpperCase()}
            </LogStatus>
          </LogEntry>
        ))}
      </UsageLogSection>
    </EnergyUsageContainer>
  );
};
