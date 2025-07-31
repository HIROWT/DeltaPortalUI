"use client"

import { Building2, MapPin, Users, Calendar } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Current project data
const currentProject = {
  id: 1,
  name: "Downtown Office Tower",
  company: "ABC Construction",
  status: "Active",
  progress: 75,
  location: "New York, NY",
  teamSize: 42,
  dueDate: "Dec 30, 2024",
}

export function CurrentProject() {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Current Project</span>
          </div>
          <Badge variant="default" className="text-xs">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-primary">{currentProject.name}</h3>
          <p className="text-xs text-muted-foreground">{currentProject.company}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{currentProject.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${currentProject.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="truncate text-muted-foreground">{currentProject.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{currentProject.teamSize} members</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Due: {currentProject.dueDate}</span>
          </div>
        </div>

        <Link href="/projects" className="block">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            View Project Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
