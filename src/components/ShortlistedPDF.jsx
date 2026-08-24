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
  colName: { width: '30%', padding: 16 },
  colRole: { width: '30%', padding: 16 },
  colScore: { width: '20%', padding: 16 },
  colStatus: { width: '20%', padding: 16 },
  colHeaderTxt: {
    fontSize: 10,
    color: '#475569',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colTxt: {
    fontSize: 10,
    color: '#334155',
  },
  colTxtBold: {
    fontSize: 10,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
  },
  colHighlightTxt: {
    fontSize: 10,
    color: '#10B981', // Emerald for match score
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

const ShortlistedPDF = ({ candidates }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const avgScore = candidates.length > 0 
    ? Math.round(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length) 
    : 0;

  const interviewingCount = candidates.filter(c => c.status === 'Interviewing').length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Dark Executive Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Svg width="40" height="40" viewBox="0 0 24 24">
                <Rect x="2" y="2" width="20" height="20" rx="6" fill="#F59E0B" />
                <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.brandName}>HireNext</Text>
            </View>
            <View>
              <Text style={styles.reportType}>Candidate Dossier</Text>
              <Text style={styles.reportId}>ID: HN-{Math.random().toString(36).substr(2, 6).toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.reportTitle}>Shortlisted Candidates</Text>
            <Text style={styles.reportDate}>Generated on {currentDate}</Text>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          
          {/* Overlapping Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Shortlisted</Text>
              <Text style={styles.statValue}>{candidates.length}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Avg AI Match Score</Text>
              <Text style={styles.statValue}>{avgScore}%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>In Interviews</Text>
              <Text style={styles.statValue}>{interviewingCount}</Text>
            </View>
          </View>

          {/* Data Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.colName}><Text style={styles.colHeaderTxt}>Candidate</Text></View>
              <View style={styles.colRole}><Text style={styles.colHeaderTxt}>Applying For</Text></View>
              <View style={styles.colScore}><Text style={styles.colHeaderTxt}>Match</Text></View>
              <View style={styles.colStatus}><Text style={styles.colHeaderTxt}>Status</Text></View>
            </View>
            
            {candidates.map((candidate, i) => (
              <View style={[styles.tableRow, i === candidates.length - 1 ? { borderBottomWidth: 0 } : {}]} key={i}>
                <View style={styles.colName}>
                  <Text style={styles.colTxtBold}>{candidate.name}</Text>
                  <Text style={{...styles.colTxt, marginTop: 4}}>{candidate.role}</Text>
                </View>
                <View style={styles.colRole}><Text style={styles.colTxt}>{candidate.job}</Text></View>
                <View style={styles.colScore}><Text style={styles.colHighlightTxt}>{candidate.matchScore}%</Text></View>
                <View style={styles.colStatus}><Text style={styles.colTxt}>{candidate.status}</Text></View>
              </View>
            ))}
          </View>

        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Confidential Candidate Information</Text>
          <Text style={styles.footerText}>HireNext AI Intelligence © {new Date().getFullYear()}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ShortlistedPDF;
