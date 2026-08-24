const mongoose = require('mongoose');
const Job = require('./models/Job');
const Company = require('./models/Company');
const Application = require('./models/Application');
const User = require('./models/User');

const companiesData = [
  { name: 'TechFlow Inc.', domain: 'techflow.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Amazon', domain: 'amazon.com' }
];

const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Data Scientist', 'UI/UX Designer'];
const stages = ['Applied', 'Under Review', 'Shortlisted', 'Assessment', 'Technical Interview', 'HR Interview', 'Final Interview', 'Offer', 'Hired', 'Rejected'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDatabase = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount > 0) {
      console.log(`Database already seeded with ${jobCount} jobs.`);
      return;
    }

    console.log('Clearing database for fresh seed...');
    await Job.deleteMany({});
    await Company.deleteMany({});
    await Application.deleteMany({});
    await User.deleteMany({});

    console.log('Seeding Companies...');
    
    // Create an Admin user to act as creator for companies
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@hirenext.com',
      password: 'password123',
      role: 'admin'
    });

    const insertedCompanies = [];
    for (let c of companiesData) {
      const comp = await Company.create({
        name: c.name,
        logo: `https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`,
        website: `https://${c.domain}`,
        industry: 'Technology',
        verified: true,
        createdBy: adminUser._id
      });
      insertedCompanies.push(comp);
    }
    
    const techFlowCompany = insertedCompanies.find(c => c.name === 'TechFlow Inc.');

    console.log('Seeding Recruiter User...');
    const recruiterUser = await User.create({
      name: 'Muskan Dutta',
      email: 'muskandutta022@gmail.com',
      password: '12345678',
      role: 'recruiter',
      companyId: techFlowCompany._id,
      authProvider: 'local'
    });

    console.log('Seeding Candidates...');
    const candidates = [];
    for (let i = 1; i <= 20; i++) {
      const cand = await User.create({
        name: `Candidate ${i}`,
        email: `candidate${i}@example.com`,
        password: 'password123',
        role: 'candidate',
        authProvider: 'local',
        avatar: `https://i.pravatar.cc/150?u=${i}`
      });
      candidates.push(cand);
    }

    console.log('Seeding Jobs...');
    const jobs = [];
    for (let i = 0; i < 25; i++) {
      const company = getRandom(insertedCompanies);
      const role = getRandom(roles);
      const isTechFlow = company._id.toString() === techFlowCompany._id.toString();
      
      const job = await Job.create({
        title: role,
        company: company._id,
        location: getRandom(['San Francisco, CA', 'New York, NY', 'Remote']),
        workMode: getRandom(['Remote', 'Hybrid', 'On-site']),
        jobType: getRandom(['Full-time', 'Contract']),
        salary: { min: 80000, max: 120000, currency: 'USD' },
        experienceLevel: getRandom(['Entry Level', 'Mid Level', 'Senior Level']),
        skills: ['React', 'Node.js'],
        description: `We are looking for an exceptional ${role} to join our team at ${company.name}.`,
        aiMatchScore: getRandInt(60, 99),
        postedAt: new Date(Date.now() - getRandInt(0, 10) * 24 * 60 * 60 * 1000)
      });
      jobs.push(job);
    }

    console.log('Seeding Applications for Recruiter Kanban...');
    // Only get jobs belonging to TechFlow so the recruiter sees them
    const recruiterJobs = jobs.filter(j => j.company.toString() === techFlowCompany._id.toString());
    
    if (recruiterJobs.length > 0) {
      for (let cand of candidates) {
        // Apply to a random job in TechFlow
        const job = getRandom(recruiterJobs);
        await Application.create({
          jobId: job._id,
          candidateId: cand._id,
          stage: getRandom(stages),
          aiMatchScore: getRandInt(50, 98),
          appliedAt: new Date(Date.now() - getRandInt(0, 5) * 24 * 60 * 60 * 1000)
        });
      }
    }

    console.log('Database Seeding Complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
