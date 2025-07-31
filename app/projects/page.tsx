"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, MapPin, Search, Users, Filter, Plus, MoreHorizontal, Star, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Extended project data
const allProjects = [
  {
    id: 1,
    name: "Downtown Office Tower",
    company: "ABC Construction",
    status: "Active",
    progress: 75,
    location: "New York, NY",
    startDate: "2024-01-15",
    endDate: "2024-12-30",
    teamSize: 42,
    budget: "$2.5M",
    isActive: true,
    isFavorite: true,
    lastActivity: "2 hours ago",
    phase: "Phase 2",
  },
  {
    id: 2,
    name: "Riverside Apartments",
    company: "XYZ Developers",
    status: "Planning",
    progress: 15,
    location: "Portland, OR",
    startDate: "2024-03-01",
    endDate: "2025-08-15",
    teamSize: 28,
    budget: "$1.8M",
    isActive: false,
    isFavorite: false,
    lastActivity: "1 day ago",
    phase: "Phase 1",
  },
  {
    id: 3,
    name: "City Hospital Expansion",
    company: "Healthcare Builders",
    status: "Active",
    progress: 45,
    location: "Chicago, IL",
    startDate: "2023-09-01",
    endDate: "2024-11-30",
    teamSize: 65,
    budget: "$4.2M",
    isActive: false,
    isFavorite: true,
    lastActivity: "3 hours ago",
    phase: "Phase 3",
  },
  {
    id: 4,
    name: "Tech Campus Phase 2",
    company: "Innovation Construction",
    status: "On Hold",
    progress: 30,
    location: "Austin, TX",
    startDate: "2024-02-01",
    endDate: "2025-01-15",
    teamSize: 38,
    budget: "$3.1M",
    isActive: false,
    isFavorite: false,
    lastActivity: "1 week ago",
    phase: "Phase 2",
  },
  {
    id: 5,
    name: "Waterfront Hotel",
    company: "Luxury Developments",
    status: "Completed",
    progress: 100,
    location: "Miami, FL",
    startDate: "2023-01-01",
    endDate: "2023-12-15",
    teamSize: 52,
    budget: "$5.8M",
    isActive: false,
    isFavorite: false,
    lastActivity: "2 months ago",
    phase: "Complete",
  },
  {
    id: 6,
    name: "Shopping Mall Renovation",
    company: "Retail Builders Inc",
    status: "Active",
    progress: 60,
    location: "Los Angeles, CA",
    startDate: "2024-01-01",
    endDate: "2024-09-30",
    teamSize: 35,
    budget: "$2.9M",
    isActive: false,
    isFavorite: true,
    lastActivity: "5 hours ago",
    phase: "Phase 2",
  },
  {
    id: 7,
    name: "Industrial Warehouse Complex",
    company: "Industrial Builders Co",
    status: "Planning",
    progress: 5,
    location: "Phoenix, AZ",
    startDate: "2024-04-01",
    endDate: "2025-02-28",
    teamSize: 22,
    budget: "$1.2M",
    isActive: false,
    isFavorite: false,
    lastActivity: "2 days ago",
    phase: "Phase 1",
  },
  {
    id: 8,
    name: "University Library Extension",
    company: "Educational Builders",
    status: "Active",
    progress: 85,
    location: "Boston, MA",
    startDate: "2023-08-01",
    endDate: "2024-06-30",
    teamSize: 31,
    budget: "$3.7M",
    isActive: false,
    isFavorite: false,
    lastActivity: "1 hour ago",
    phase: "Phase 4",
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "on hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">All Projects</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, companies, or locations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="on hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} of {allProjects.length} projects
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow
                  key={project.id}
                  className={`hover:bg-muted/50 ${project.isActive ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          /* Toggle favorite */
                        }}
                      >
                        <Star
                          className={`h-3 w-3 ${project.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      </Button>
                      {project.isActive && (
                        <Badge variant="default" className="text-xs px-1 py-0">
                          Current
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(project.status)} text-xs`}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      <Progress value={project.progress} className="h-2 w-16" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {project.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{project.phase}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {project.teamSize}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{project.budget}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>{formatDate(project.startDate)}</div>
                      <div>{formatDate(project.endDate)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground">{project.lastActivity}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Building2 className="mr-2 h-4 w-4" />
                          Switch to Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          {project.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
