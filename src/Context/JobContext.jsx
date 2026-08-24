/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  // Mock Database of Jobs
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Engineer (React/Next.js)',
      company: 'TechVision Inc.',
      location: 'Bengaluru',
      salary: '₹18L - ₹24L',
      type: 'Full-time',
      posted: '2 hours ago',
      rating: '4.8',
      match: 96,
      logo: 'https://www.google.com/s2/favicons?domain=techvision.com&sz=128'
    },
    {
      id: 2,
      title: 'React Native Developer',
      company: 'AppFlow Mobile',
      location: 'Gurgaon',
      salary: '₹12L - ₹16L',
      type: 'Full-time',
      posted: '5 hours ago',
      rating: '4.5',
      match: 92,
      logo: 'https://www.google.com/s2/favicons?domain=appflow.com&sz=128'
    },
    {
      id: 3,
      title: 'UI/UX Engineer Intern',
      company: 'DesignStudio',
      location: 'Delhi',
      salary: '₹20k - ₹30k / month',
      type: 'Internship',
      posted: '1 day ago',
      rating: '4.2',
      match: 88,
      logo: 'https://www.google.com/s2/favicons?domain=designstudio.com&sz=128'
    },
    {
      id: 4,
      title: 'Lead Software Engineer, Frontend',
      company: 'CloudScale Solutions',
      location: 'Hyderabad',
      salary: '₹25L - ₹35L',
      type: 'Full-time',
      posted: '2 days ago',
      rating: '4.9',
      match: 85,
      logo: 'https://www.google.com/s2/favicons?domain=cloudscale.com&sz=128'
    },
    {
      id: 5,
      title: 'Part-Time Web Developer',
      company: 'Creative Agency',
      location: 'Bengaluru',
      salary: '₹4L - ₹6L',
      type: 'Part-time',
      posted: '3 days ago',
      rating: '4.1',
      match: 80,
      logo: 'https://www.google.com/s2/favicons?domain=creative.com&sz=128'
    },
    {
      id: 6,
      title: 'Junior React Developer (Training Program)',
      company: 'DevAcademy',
      location: 'Delhi',
      salary: '₹3L - ₹5L',
      type: 'Training',
      posted: '4 days ago',
      rating: '4.6',
      match: 75,
      logo: 'https://www.google.com/s2/favicons?domain=devacademy.io&sz=128'
    }
  ]);

  const [savedJobs, setSavedJobs] = useState([1, 4]); // Start with a few saved jobs
  const [appliedJobs, setAppliedJobs] = useState([
    { jobId: 2, status: 'In Review', date: 'Oct 08, 2023' },
    { jobId: 5, status: 'Interviewing', date: 'Oct 12, 2023' }
  ]);

  // Actions
  const saveJob = (jobId) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const unsaveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(id => id !== jobId));
  };

  const applyJob = (jobId) => {
    if (!appliedJobs.some(app => app.jobId === jobId)) {
      const newApp = {
        jobId,
        status: 'Application Submitted',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };
      setAppliedJobs([...appliedJobs, newApp]);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, savedJobs, appliedJobs, saveJob, unsaveJob, applyJob }}>
      {children}
    </JobContext.Provider>
  );
};
