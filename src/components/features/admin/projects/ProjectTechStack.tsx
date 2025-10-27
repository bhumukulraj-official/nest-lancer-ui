/**
 * Project Tech Stack Management Component
 * Manages technology stack for a project
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  IconButton,
  Autocomplete,
  Button,
} from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
// interface Technology {
//   id: string
//   name: string
//   category: string
//   level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
// }

interface ProjectTechStackProps {
  projectId?: string
  technologies: string[]
  onUpdate: (technologies: string[]) => void
}

// Common technology options
const commonTechnologies = [
  'React',
  'Next.js',
  'Vue.js',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'NestJS',
  'Python',
  'Django',
  'Flask',
  'Java',
  'Spring Boot',
  'PHP',
  'Laravel',
  'Ruby',
  'Rails',
  'Go',
  'Rust',
  'C#',
  '.NET',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Git',
  'CI/CD',
  'GraphQL',
  'REST API',
  'MongoDB',
  'Firebase',
  'Supabase',
]

const ProjectTechStack: React.FC<ProjectTechStackProps> = ({
  technologies = [],
  onUpdate,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [techList, setTechList] = useState<string[]>(technologies)

  useEffect(() => {
    setTechList(technologies)
  }, [technologies])

  const handleAddTechnology = (newTech: string) => {
    if (newTech && !techList.includes(newTech)) {
      const updatedList = [...techList, newTech]
      setTechList(updatedList)
      onUpdate(updatedList)
    }
    setInputValue('')
  }

  const handleRemoveTechnology = (techToRemove: string) => {
    const updatedList = techList.filter((tech) => tech !== techToRemove)
    setTechList(updatedList)
    onUpdate(updatedList)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue) {
      handleAddTechnology(inputValue)
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">
            Technology Stack
          </Typography>
          <IconButton size="small">
            <Edit />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Add technologies used in this project
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {techList.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              onDelete={() => handleRemoveTechnology(tech)}
              color="primary"
              variant="outlined"
              deleteIcon={<Delete />}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Autocomplete
            freeSolo
            options={commonTechnologies}
            value={inputValue}
            onChange={(_, newValue) => {
              if (typeof newValue === 'string') {
                handleAddTechnology(newValue)
              }
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Add technology"
                onKeyPress={handleKeyPress}
                sx={{ flex: 1 }}
              />
            )}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleAddTechnology(inputValue)}
            disabled={!inputValue}
          >
            Add
          </Button>
        </Box>

        {techList.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            No technologies added yet. Use the input above to add technologies.
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectTechStack

