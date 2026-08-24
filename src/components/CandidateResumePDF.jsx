import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#0F172A',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#3B82F6',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  contactDetails: {
    flexDirection: 'row',
  },
  contactText: {
    fontSize: 10,
    color: '#64748B',
    marginRight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 10,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    marginRight: 10,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 15,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  expRole: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0F172A',
  },
  expCompany: {
    fontSize: 10,
    color: '#3B82F6',
    fontFamily: 'Helvetica-Bold',
  },
  expDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  expDesc: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
  }
});

const CandidateResumePDF = ({ candidate }) => {
  const email = `${candidate.name.split(' ')[0].toLowerCase()}@example.com`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <Text style={styles.name}>{candidate.name || 'Candidate Name'}</Text>
          <Text style={styles.role}>{candidate.role || 'Software Professional'}</Text>
          <View style={styles.contactDetails}>
            <Text style={styles.contactText}>Location: {candidate.location || 'Remote'}</Text>
            <Text style={styles.contactText}>Email: {email}</Text>
            <Text style={styles.contactText}>Phone: (555) 123-4567</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.paragraph}>
            Passionate and highly driven {candidate.role || 'professional'} with {candidate.experience || 'years'} of proven track record delivering scalable solutions. 
            Strongly focused on modern web architectures, user-centric design, and collaborating with cross-functional teams to exceed expectations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <View style={styles.skillsContainer}>
            {(candidate.skills || ['React', 'JavaScript', 'Node.js', 'UI/UX']).map((skill, i) => (
              <View key={i} style={styles.skillPill}>
                <Text>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          
          <View style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <View>
                <Text style={styles.expRole}>{candidate.role || 'Senior Developer'}</Text>
                <Text style={styles.expCompany}>{candidate.currentCompany || 'Tech Corp'}</Text>
              </View>
              <Text style={styles.expDate}>2022 - Present</Text>
            </View>
            <Text style={styles.expDesc}>
              Led the migration of the legacy monolith to a microservices architecture, improving system scalability by 40%. Mentored junior developers and instituted strict code review policies.
            </Text>
          </View>

          <View style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <View>
                <Text style={styles.expRole}>Software Engineer</Text>
                <Text style={styles.expCompany}>Previous Company Inc.</Text>
              </View>
              <Text style={styles.expDate}>2019 - 2022</Text>
            </View>
            <Text style={styles.expDesc}>
              Developed dynamic UIs using React.js and Redux. Reduced page load times by 2s by implementing code splitting and lazy loading.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <View>
                <Text style={styles.expRole}>B.S. in Computer Science</Text>
                <Text style={styles.expCompany}>University of Technology</Text>
              </View>
              <Text style={styles.expDate}>Class of 2019</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default CandidateResumePDF;
