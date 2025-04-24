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
      description: String,
      techStack: [String]
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: String,
      endDate: String,
      location: String,
      description: String
    }
  ],
  skills: [
    {
      key: String,
      values: [String]
    }
  ],
  projects: [
    {
      title: String,
      techStack: [String],
      link: String,
      description: String
    }
  ],
  awards: [
    {
      title: String,
      date: String,
      awardedBy: String,
      description: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
