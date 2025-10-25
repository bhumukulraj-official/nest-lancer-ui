/**
 * PortfolioView Component
 * Main portfolio display component
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Rating,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material'
import {
  Language,
  GitHub,
  LinkedIn,
  Twitter,
  School,
  Work,
  Star,
  Code,
  Palette,
  Psychology,
  Translate,
  EmojiEvents,
  ThumbUp,
  Edit,
  Settings
} from '@mui/icons-material'
import FeaturedProjects from './FeaturedProjects'
import { PortfolioApiService } from '../../../services/portfolio'
import type {
  Portfolio,
  PortfolioProject,
  PortfolioSkill,
  PortfolioExperience,
  PortfolioEducation,
  PortfolioTestimonial,
  PortfolioAchievement,
  PortfolioStats
} from '../../../types/models/portfolio.types'
import { SkillCategory, SkillLevel } from '../../../types/models/portfolio.types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

interface PortfolioViewProps {
  portfolioId?: string
  isOwn?: boolean
  onEdit?: () => void
  onSettings?: () => void
  showActions?: boolean
}

const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolioId,
  isOwn = false,
  onEdit,
  onSettings,
  showActions = true
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Portfolio data
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [skills, setSkills] = useState<PortfolioSkill[]>([])
  const [experience] = useState<PortfolioExperience[]>([])
  const [education] = useState<PortfolioEducation[]>([])
  const [testimonials, setTestimonials] = useState<PortfolioTestimonial[]>([])
  const [achievements, setAchievements] = useState<PortfolioAchievement[]>([])
  const [stats, setStats] = useState<PortfolioStats | null>(null)

  useEffect(() => {
    loadPortfolioData()
  }, [portfolioId])

  const loadPortfolioData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [
        portfolioData,
        projectsData,
        skillsData,
        testimonialsData,
        achievementsData,
        statsData
      ] = await Promise.all([
        PortfolioApiService.getPortfolioOverview(),
        PortfolioApiService.getFeaturedProjects(),
        PortfolioApiService.getTechStack(),
        PortfolioApiService.getTestimonials(),
        PortfolioApiService.getAchievements(),
        PortfolioApiService.getPortfolioStats()
      ])

      setPortfolio(portfolioData)
      setProjects(projectsData)
      setSkills(skillsData)
      setTestimonials(testimonialsData)
      setAchievements(achievementsData)
      setStats(statsData)
    } catch (err) {
      setError('Failed to load portfolio data')
      console.error('Error loading portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const getSkillCategoryIcon = (category: SkillCategory) => {
    switch (category) {
      case SkillCategory.PROGRAMMING_LANGUAGES:
        return <Code />
      case SkillCategory.FRAMEWORKS:
        return <Code />
      case SkillCategory.DATABASES:
        return <Code />
      case SkillCategory.TOOLS:
        return <Code />
      case SkillCategory.DESIGN:
        return <Palette />
      case SkillCategory.SOFT_SKILLS:
        return <Psychology />
      case SkillCategory.LANGUAGES:
        return <Translate />
      default:
        return <Code />
    }
  }

  const getSkillLevelColor = (level: SkillLevel): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (level) {
      case SkillLevel.BEGINNER:
        return 'error'
      case SkillLevel.INTERMEDIATE:
        return 'warning'
      case SkillLevel.ADVANCED:
        return 'info'
      case SkillLevel.EXPERT:
        return 'success'
      default:
        return 'default'
    }
  }

  const getSkillLevelValue = (level: SkillLevel): number => {
    switch (level) {
      case SkillLevel.BEGINNER:
        return 25
      case SkillLevel.INTERMEDIATE:
        return 50
      case SkillLevel.ADVANCED:
        return 75
      case SkillLevel.EXPERT:
        return 100
      default:
        return 0
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  }

  if (!portfolio) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Portfolio not found
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Portfolio Header */}
      <Paper elevation={2} sx={{ p: 4, mb: 3, position: 'relative' }}>
        {/* Cover Image */}
        {portfolio.coverImage && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 200,
              backgroundImage: `url(${portfolio.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
              zIndex: 0
            }}
          />
        )}

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={portfolio.avatar}
                  sx={{ width: 120, height: 120, border: 4, borderColor: 'background.paper' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h3" component="h1" gutterBottom>
                  {portfolio.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {portfolio.shortDescription || portfolio.description}
                </Typography>

                {/* Social Links */}
                <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, mt: 2 }}>
                  {portfolio.website && (
                    <Tooltip title="Website">
                      <IconButton href={portfolio.website} target="_blank" rel="noopener noreferrer">
                        <Language />
                      </IconButton>
                    </Tooltip>
                  )}
                  {portfolio.github && (
                    <Tooltip title="GitHub">
                      <IconButton href={portfolio.github} target="_blank" rel="noopener noreferrer">
                        <GitHub />
                      </IconButton>
                    </Tooltip>
                  )}
                  {portfolio.linkedin && (
                    <Tooltip title="LinkedIn">
                      <IconButton href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedIn />
                      </IconButton>
                    </Tooltip>
                  )}
                  {portfolio.twitter && (
                    <Tooltip title="Twitter">
                      <IconButton href={portfolio.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>

                {/* Stats */}
                {stats && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {stats.totalProjects}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Projects
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {stats.yearsOfExperience}+
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Years Exp
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {stats.totalClients}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Clients
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {stats.averageRating.toFixed(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Rating
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {showActions && isOwn && (
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Edit Portfolio">
                  <IconButton onClick={onEdit}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton onClick={onSettings}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Portfolio Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="portfolio tabs">
          <Tab label="Projects" icon={<Code />} iconPosition="start" />
          <Tab label="Skills" icon={<Star />} iconPosition="start" />
          <Tab label="Experience" icon={<Work />} iconPosition="start" />
          <Tab label="Education" icon={<School />} iconPosition="start" />
          <Tab label="Testimonials" icon={<ThumbUp />} iconPosition="start" />
          <Tab label="Achievements" icon={<EmojiEvents />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Projects Tab */}
      <TabPanel value={activeTab} index={0}>
        <FeaturedProjects
          projects={projects}
          onViewProject={(project) => console.log('View project:', project.id)}
          showActions={isOwn}
          variant="grid"
        />
      </TabPanel>

      {/* Skills Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Technical Skills
          </Typography>
          <Grid container spacing={3}>
            {Object.values(SkillCategory).map((category) => {
              const categorySkills = skills.filter(skill => skill.category === category)
              if (categorySkills.length === 0) return null

              return (
                <Grid item xs={12} md={6} key={category}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {getSkillCategoryIcon(category)}
                        <Typography variant="h6">
                          {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                      </Box>
                      <Stack spacing={2}>
                        {categorySkills.map((skill) => (
                          <Box key={skill.id}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {skill.name}
                              </Typography>
                              <Chip
                                label={skill.level}
                                color={getSkillLevelColor(skill.level)}
                                size="small"
                              />
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={getSkillLevelValue(skill.level)}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                            {skill.description && (
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {skill.description}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </TabPanel>

      {/* Experience Tab */}
      <TabPanel value={activeTab} index={2}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Work Experience
          </Typography>
          <Stack spacing={3}>
            {experience.map((exp) => (
              <Card key={exp.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h3">
                        {exp.position}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {exp.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate || '')}
                      </Typography>
                    </Box>
                    {exp.companyLogo && (
                      <Avatar src={exp.companyLogo} sx={{ width: 48, height: 48 }} />
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {exp.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Technologies:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {exp.technologies.map((tech) => (
                        <Chip key={tech} label={tech} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                  {exp.achievements.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Key Achievements:
                      </Typography>
                      <ul>
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>
                            <Typography variant="body2">{achievement}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </TabPanel>

      {/* Education Tab */}
      <TabPanel value={activeTab} index={3}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Education
          </Typography>
          <Stack spacing={3}>
            {education.map((edu) => (
              <Card key={edu.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h3">
                        {edu.degree} in {edu.field}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {edu.institution}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate || '')}
                      </Typography>
                    </Box>
                    {edu.institutionLogo && (
                      <Avatar src={edu.institutionLogo} sx={{ width: 48, height: 48 }} />
                    )}
                  </Box>
                  {edu.description && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {edu.description}
                    </Typography>
                  )}
                  {edu.gpa && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      GPA: {edu.gpa}
                    </Typography>
                  )}
                  {edu.achievements.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Achievements:
                      </Typography>
                      <ul>
                        {edu.achievements.map((achievement, index) => (
                          <li key={index}>
                            <Typography variant="body2">{achievement}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </TabPanel>

      {/* Testimonials Tab */}
      <TabPanel value={activeTab} index={4}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Client Testimonials
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={testimonial.clientAvatar} sx={{ mr: 2 }}>
                        {testimonial.clientName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {testimonial.clientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.clientRole} at {testimonial.clientCompany}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    {testimonial.projectTitle && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Project: {testimonial.projectTitle}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={activeTab} index={5}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Achievements & Certifications
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement) => (
              <Grid item xs={12} md={6} key={achievement.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <EmojiEvents color="primary" sx={{ mr: 2, mt: 0.5 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3">
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.issuer} • {formatDate(achievement.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {achievement.description}
                    </Typography>
                    <Chip
                      label={achievement.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      size="small"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  )
}

export default PortfolioView
