/* global require, process, module, __dirname */
const companies = [
  { name: 'Google', domain: 'google.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Infosys', domain: 'infosys.com' },
  { name: 'TCS', domain: 'tcs.com' },
  { name: 'Wipro', domain: 'wipro.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Nvidia', domain: 'nvidia.com' },
  { name: 'Cisco', domain: 'cisco.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Spotify', domain: 'spotify.com' },
  { name: 'Flipkart', domain: 'flipkart.com' }
];

// ... inside generateJobs loop we will map it

const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Data Scientist', 'DevOps Engineer', 'Product Manager'];
const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Remote'];
const workModes = ['Remote', 'Hybrid', 'On-site'];
const jobTypes = ['Full-time', 'Contract'];
const expLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
const allSkills = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'SQL', 'TypeScript'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateJobs = () => {
  const jobs = [];
  for (let i = 1; i <= 150; i++) {
    const role = getRandom(roles);
    const company = getRandom(companies);
    const exp = getRandom(expLevels);
    
    let minSal = 60000;
    if (exp === 'Mid Level') minSal = 90000;
    if (exp === 'Senior Level') minSal = 130000;
    if (exp === 'Executive') minSal = 180000;
    
    const maxSal = minSal + getRandInt(20000, 50000);
    
    const jobSkills = [];
    for(let j=0; j<getRandInt(3, 5); j++) {
      const s = getRandom(allSkills);
      if(!jobSkills.includes(s)) jobSkills.push(s);
    }

    jobs.push({
      _id: i.toString(),
      title: role,
      company: {
        name: company.name,
        logo: `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        verified: Math.random() > 0.2
      },
      location: getRandom(locations),
      workMode: getRandom(workModes),
      jobType: getRandom(jobTypes),
      salary: { min: minSal, max: maxSal, currency: 'USD' },
      experienceLevel: exp,
      skills: jobSkills,
      description: `We are looking for an exceptional ${role} to join our team.`,
      benefits: ['Health Insurance', '401(k)', 'Unlimited PTO'],
      aiMatchScore: getRandInt(60, 99),
      atsCompatibility: getRandInt(70, 100),
      hiringUrgency: getRandom(['Normal', 'Normal', 'High', 'Urgent']),
      applicantCount: getRandInt(10, 500),
      isEasyApply: Math.random() > 0.5,
      postedAt: new Date(Date.now() - getRandInt(0, 30) * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  return jobs;
};

// Singleton instance to hold in-memory jobs across API calls
const jobsData = generateJobs();

module.exports = jobsData;
