import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  headerWrapper: {
    backgroundColor: '#0F172A',
    padding: 40,
    paddingTop: 50,
    paddingBottom: 70,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  reportType: {
    fontSize: 10,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    marginBottom: 6,
  },
  reportId: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'right',
  },
  titleSection: {
    marginTop: 10,
  },
  reportTitle: {
    fontSize: 34,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    letterSpacing: -1,
  },
  reportDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  contentWrapper: {
    padding: 40,
    paddingTop: 0,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: -40,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '23%',
    padding: 20,
    borderRadius: 12,
    border: '1px solid #E2E8F0',
  },
  statLabel: {
    fontSize: 9,
    color: '#64748B',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  statTrend: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },
  trendPositive: { color: '#10B981' },
  trendNegative: { color: '#EF4444' },
  sectionTitle: {
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 16,
    marginTop: 10,
  },
  funnelContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    padding: 24,
  },
  funnelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  funnelLabel: {
    width: '30%',
    fontSize: 11,
    color: '#334155',
    fontFamily: 'Helvetica-Bold',
  },
  funnelBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  funnelCount: {
    width: '20%',
    fontSize: 11,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  footer: {
    padding: 40,
    borderTop: '1px solid #E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 10,
  }
});

const PerformancePDF = ({ timeRange, kpiData, funnelData }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Dark Executive Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Svg width="40" height="40" viewBox="0 0 24 24">
                <Rect x="2" y="2" width="20" height="20" rx="6" fill="#10B981" />
                <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.brandName}>HireNext</Text>
            </View>
            <View>
              <Text style={styles.reportType}>Performance Report</Text>
              <Text style={styles.reportId}>Period: {timeRange.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.reportTitle}>Hiring Analytics Overview</Text>
            <Text style={styles.reportDate}>Generated on {currentDate}</Text>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          
          {/* Overlapping Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Applicants</Text>
              <Text style={styles.statValue}>{kpiData.applicants}</Text>
              <Text style={[styles.statTrend, kpiData.appPos ? styles.trendPositive : styles.trendNegative]}>{kpiData.appTrend} vs Prev</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Time to Hire</Text>
              <Text style={styles.statValue}>{kpiData.timeToHire}</Text>
              <Text style={[styles.statTrend, kpiData.timePos ? styles.trendPositive : styles.trendNegative]}>{kpiData.timeTrend} vs Prev</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Active Jobs</Text>
              <Text style={styles.statValue}>{kpiData.activeJobs}</Text>
              <Text style={[styles.statTrend, kpiData.jobsPos ? styles.trendPositive : styles.trendNegative]}>{kpiData.jobsTrend} vs Prev</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Offer Acceptance</Text>
              <Text style={styles.statValue}>{kpiData.offerAcceptance}</Text>
              <Text style={[styles.statTrend, kpiData.offerPos ? styles.trendPositive : styles.trendNegative]}>{kpiData.offerTrend} vs Prev</Text>
            </View>
          </View>

          {/* Funnel Data Section */}
          <Text style={styles.sectionTitle}>Pipeline Conversion Funnel</Text>
          <View style={styles.funnelContainer}>
            {funnelData.map((item, i) => (
              <View style={[styles.funnelRow, i === funnelData.length - 1 ? { marginBottom: 0 } : {}]} key={i}>
                <Text style={styles.funnelLabel}>{item.stage}</Text>
                <View style={styles.funnelBarBg}>
                  <View style={[styles.funnelBarFill, { width: `${item.percentage}%`, backgroundColor: i === 0 ? '#3B82F6' : i === 1 ? '#6366F1' : i === 2 ? '#A855F7' : i === 3 ? '#10B981' : '#14B8A6' }]} />
                </View>
                <Text style={styles.funnelCount}>{item.count} ({item.percentage}%)</Text>
              </View>
            ))}
          </View>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Confidential Internal Data</Text>
          <Text style={styles.footerText}>HireNext Analytics © {new Date().getFullYear()}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default PerformancePDF;
