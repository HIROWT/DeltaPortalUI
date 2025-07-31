"use client"

import { useState } from "react"
import { Building2, Check, Search, Grid3X3 } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample project data (excluding the current project)
const projects = [
  {
    id: 2,
    name: "Riverside Apartments",
    company: "XYZ Developers",
    status: "Planning",
  },
  {
    id: 3,
    name: "City Hospital Expansion",
    company: "Healthcare Builders",
    status: "Active",
  },
  {
    id: 4,
    name: "Tech Campus Phase 2",
    company: "Innovation Construction",
    status: "On Hold",
  },
  {
    id: 5,
    name: "Waterfront Hotel",
    company: "Luxury Developments",
    status: "Completed",
  },
  {
    id: 6,
    name: "Shopping Mall Renovation",
    company: "Retail Builders Inc",
    status: "Active",
  },
]

export function ProjectSelector() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-blue-100 text-blue-800"
      case "on hold":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-3">
      <div className="relative mb-3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-48">
        <div className="space-y-1">
          {filteredProjects.map((project) => (
            <Button
              key={project.id}
              variant="ghost"
              className={`w-full justify-start ${
                selectedProject === project.id ? "bg-accent border border-primary/20" : "hover:bg-accent/50"
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="flex w-full items-center">
                <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{project.name}</p>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.company}</p>
                </div>
                {selectedProject === project.id && <Check className="h-4 w-4 text-primary ml-2" />}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {filteredProjects.length} available
          </Badge>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Add Project
          </Button>
        </div>

        {/* View All Projects Button */}
        <Link href="/projects" className="block">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Grid3X3 className="mr-2 h-4 w-4" />
            View All Projects
          </Button>
        </Link>

        {selectedProject && (
          <Button className="w-full" size="sm">
            Switch to Selected Project
          </Button>
        )}
      </div>
    </div>
  )
}
