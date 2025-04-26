const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  basics: {
    name: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
    linkedin: String,
    github: String
  },
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      location: String,
      highlights: [String], // bullet points
      techStack: [String]
    }
  ],
  education: [
    {
      institution: String,
      studyType: String, // e.g., 'B.Tech', 'M.Sc.'
      area: String, // Major/Field
      startDate: String,
      endDate: String,
      location: String,
      gpa: String
    }
  ],
  skills: [
    {
      key: String, // e.g., 'Programming Languages', 'Frameworks', etc., or just skill name
      value: String // e.g., 'Advanced', 'Intermediate', etc. or description/level
    }
  ],
  projects: [
    {
      title: String,
      techStack: [String],
      link: String,
      description: String,
      highlights: [String] // bullet points
    }
  ],
  achievements: [
    {
      title: String,
      date: String,
      awarder: String,
      summary: String
    }
  ],
  publications: [
    {
      name: String,
      publisher: String,
      releaseDate: String
    }
  ],
  languages: [
    {
      key: String, // e.g., 'English'
      value: String // e.g., 'Fluent', 'Native'
    }
  ],
  volunteer: [
    {
      organization: String,
      position: String,
      startDate: String,
      endDate: String,
      summary: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
