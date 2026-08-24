import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  pageModern: {
    padding: '40pt',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  pageClassic: {
    padding: '45pt',
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#111111',
    lineHeight: 1.5,
  },
  headerModern: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
  },
  headerClassic: {
    marginBottom: 25,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#111111',
    paddingBottom: 14,
  },
  nameModern: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  nameClassic: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  contactModern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    color: '#555555',
    fontSize: 9,
  },
  contactClassic: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    color: '#333333',
    fontSize: 10.5,
  },
  section: {
    marginBottom: 15,
  },
  sectionClassic: {
    marginBottom: 18,
  },
  sectionTitleModern: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 4,
    marginBottom: 8,
  },
  sectionTitleClassic: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
    paddingBottom: 4,
    marginBottom: 10,
    color: '#111111',
  },
  text: {
    marginBottom: 4,
  },
  textClassic: {
    marginBottom: 6,
    color: '#222222',
  },
  boldModern: {
    fontFamily: 'Helvetica-Bold',
  },
  boldClassic: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
    color: '#111111',
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 6,
  },
  projectItemClassic: {
    marginBottom: 10,
  },
  bullet: {
    width: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  listItemClassic: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  listItemText: {
    flex: 1,
  },
  skillsModern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    fontSize: 9,
    color: '#334155',
  },
  skillsClassic: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 1.6,
  },
  skillTextClassic: {
    fontSize: 11,
    color: '#222222',
  }
});

const ResumePDF = ({ data, color, format = 'modern' }) => {
  const accentColor = color || '#2563eb';
  const isClassic = format === 'classic';

  const parseProjects = () => {
    if (!data?.projects) return [];
    return data.projects.split('\n').filter(p => p.trim()).map(p => {
      const parts = p.split(':');
      return { title: parts[0]?.trim(), desc: parts[1]?.trim() };
    });
  };

  const parseAchievements = () => {
    if (!data?.achievements) return [];
    return data.achievements.split('\n').filter(a => a.trim());
  };

  const parseSkills = () => {
    if (!data?.skills) return [];
    return data.skills.split(',').filter(s => s.trim()).map(s => s.trim());
  };

  return (
    <Document>
      <Page size="A4" style={isClassic ? styles.pageClassic : styles.pageModern}>
        
        {/* Header */}
        <View style={isClassic ? styles.headerClassic : styles.headerModern}>
          <Text style={[
            isClassic ? styles.nameClassic : styles.nameModern, 
            !isClassic && { color: accentColor }
          ]}>
            {data?.name || 'Your Name'}
          </Text>
          <View style={isClassic ? styles.contactClassic : styles.contactModern}>
            {data?.email && <Text>{data.email}</Text>}
            {data?.github && <Text>{isClassic ? '  |  ' : '|'} {data.github}</Text>}
            {data?.linkedin && <Text>{isClassic ? '  |  ' : '|'} {data.linkedin}</Text>}
          </View>
        </View>

        {/* Education */}
        {data?.education && (
          <View style={isClassic ? styles.sectionClassic : styles.section}>
            <Text style={[
              isClassic ? styles.sectionTitleClassic : styles.sectionTitleModern, 
              !isClassic && { color: accentColor }
            ]}>Education</Text>
            <Text style={isClassic ? styles.textClassic : styles.text}>{data.education}</Text>
          </View>
        )}

        {/* Skills */}
        {data?.skills && (
          <View style={isClassic ? styles.sectionClassic : styles.section}>
            <Text style={[
              isClassic ? styles.sectionTitleClassic : styles.sectionTitleModern, 
              !isClassic && { color: accentColor }
            ]}>Technical Skills</Text>
            
            {isClassic ? (
              <View style={styles.skillsClassic}>
                <Text style={styles.skillTextClassic}>
                  <Text style={{ fontFamily: 'Times-Bold' }}>Core Competencies: </Text>
                  {parseSkills().join(' • ')}
                </Text>
              </View>
            ) : (
              <View style={styles.skillsModern}>
                {parseSkills().map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {data?.projects && (
          <View style={isClassic ? styles.sectionClassic : styles.section}>
            <Text style={[
              isClassic ? styles.sectionTitleClassic : styles.sectionTitleModern, 
              !isClassic && { color: accentColor }
            ]}>Projects</Text>
            {parseProjects().map((proj, i) => (
              <View key={i} style={isClassic ? styles.projectItemClassic : styles.projectItem}>
                {proj.title && <Text style={isClassic ? styles.boldClassic : styles.boldModern}>{proj.title}</Text>}
                {proj.desc && <Text style={isClassic ? styles.textClassic : styles.text}>{proj.desc}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {data?.achievements && (
          <View style={isClassic ? styles.sectionClassic : styles.section}>
            <Text style={[
              isClassic ? styles.sectionTitleClassic : styles.sectionTitleModern, 
              !isClassic && { color: accentColor }
            ]}>Achievements</Text>
            {parseAchievements().map((ach, i) => (
              <View key={i} style={isClassic ? styles.listItemClassic : styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemText}>{ach}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ResumePDF;
