import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
  header: { borderBottom: '2px solid #3B82F6', paddingBottom: 20, marginBottom: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  brandName: { fontSize: 24, color: '#0F172A', fontFamily: 'Helvetica-Bold', marginLeft: 10 },
  title: { fontSize: 20, color: '#0F172A', fontFamily: 'Helvetica-Bold' },
  meta: { fontSize: 10, color: '#64748B', marginTop: 5 },
  content: { fontSize: 11, color: '#334155', lineHeight: 1.6 },
  paragraph: { marginBottom: 15 },
});

const MockDocumentPDF = ({ file }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Rect x="2" y="2" width="20" height="20" rx="6" fill="#3B82F6" />
            <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.brandName}>HireNext</Text>
        </View>
        <Text style={styles.title}>{file.name.replace(/_/g, ' ').replace('.pdf', '').replace('.docx', '')}</Text>
        <Text style={styles.meta}>Author: {file.author}  |  Date: {file.date}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          This is a securely generated document preview for {file.name}. In a production environment, this would display the exact contents of the uploaded candidate resume, signed offer letter, or internal company policy.
        </Text>
        <Text style={styles.paragraph}>
          The HireNext Document Vault ensures that all sensitive files are encrypted at rest and in transit. Access is strictly logged and monitored to comply with SOC2 and GDPR requirements.
        </Text>
        <Text style={styles.paragraph}>
          Document ID: {file.id}
          {'\n'}Size: {file.size}
          {'\n'}Type: {file.type.toUpperCase()}
          {'\n'}Folder ID: {file.folderId || 'Root'}
        </Text>
      </View>
    </Page>
  </Document>
);

export default MockDocumentPDF;
