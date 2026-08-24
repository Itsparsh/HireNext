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
    marginBottom: 40,
    marginTop: -40,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    padding: 24,
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 28,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  col1: { width: '40%', padding: 16 },
  col2: { width: '30%', padding: 16 },
  col3: { width: '30%', padding: 16 },
  colHeaderTxt: {
    fontSize: 10,
    color: '#475569',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colTxt: {
    fontSize: 11,
    color: '#334155',
  },
  colHighlightTxt: {
    fontSize: 11,
    color: '#2563EB',
    fontFamily: 'Helvetica-Bold',
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

const ReportPDF = ({ data, period, origin }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const totalApps = data.reduce((sum, item) => sum + item.applicants, 0);
  const totalHires = data.reduce((sum, item) => sum + item.hires, 0);
  const convRate = totalApps > 0 ? ((totalHires / totalApps) * 100).toFixed(1) : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Dark Executive Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Svg width="40" height="40" viewBox="0 0 24 24">
                <Rect x="2" y="2" width="20" height="20" rx="6" fill="#3B82F6" />
                <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.brandName}>HireNext</Text>
            </View>
            <View>
              <Text style={styles.reportType}>Executive Summary</Text>
              <Text style={styles.reportId}>ID: HN-{Math.random().toString(36).substr(2, 6).toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.reportTitle}>Pipeline Analytics: {period === 'week' ? 'Past 7 Days' : period === 'month' ? 'Past 30 Days' : 'This Year'}</Text>
            <Text style={styles.reportDate}>Generated on {currentDate}</Text>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          
          {/* Overlapping Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Candidates</Text>
              <Text style={styles.statValue}>{totalApps.toLocaleString()}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Successful Hires</Text>
              <Text style={styles.statValue}>{totalHires.toLocaleString()}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Conversion Rate</Text>
              <Text style={styles.statValue}>{convRate}%</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Pipeline Breakdown</Text>
          
          {/* Data Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.col1}><Text style={styles.colHeaderTxt}>Time Period</Text></View>
              <View style={styles.col2}><Text style={styles.colHeaderTxt}>Applicants</Text></View>
              <View style={styles.col3}><Text style={styles.colHeaderTxt}>Hires</Text></View>
            </View>
            
            {data.map((item, i) => (
              <View style={[styles.tableRow, i === data.length - 1 ? { borderBottomWidth: 0 } : {}]} key={i}>
                <View style={styles.col1}><Text style={styles.colTxt}>{item.name}</Text></View>
                <View style={styles.col2}><Text style={styles.colTxt}>{item.applicants.toLocaleString()}</Text></View>
                <View style={styles.col3}><Text style={styles.colHighlightTxt}>{item.hires.toLocaleString()}</Text></View>
              </View>
            ))}
          </View>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Confidential & Proprietary</Text>
          <Text style={styles.footerText}>HireNext AI Intelligence © {new Date().getFullYear()}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ReportPDF;
