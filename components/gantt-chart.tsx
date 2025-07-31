"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ZoomIn, ZoomOut, Calendar, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample GANTT data with phases and CSI divisions
const ganttData = [
  {
    id: 1,
    name: "Phase 1: Site Preparation & Foundation",
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    progress: 85,
    status: "In Progress",
    expanded: true,
    divisions: [
      {
        id: "01",
        name: "CSI 01 - General Requirements",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        progress: 100,
        status: "Complete",
        tasks: [
          { name: "Site Survey", duration: 5, progress: 100 },
          { name: "Permits & Approvals", duration: 15, progress: 100 },
          { name: "Temporary Facilities", duration: 10, progress: 100 },
        ],
      },
      {
        id: "02",
        name: "CSI 02 - Existing Conditions",
        startDate: "2024-01-20",
        endDate: "2024-02-28",
        progress: 90,
        status: "In Progress",
        tasks: [
          { name: "Demolition", duration: 12, progress: 100 },
          { name: "Site Clearing", duration: 8, progress: 100 },
          { name: "Hazmat Removal", duration: 15, progress: 70 },
        ],
      },
      {
        id: "03",
        name: "CSI 03 - Concrete",
        startDate: "2024-02-15",
        endDate: "2024-03-30",
        progress: 75,
        status: "In Progress",
        tasks: [
          { name: "Foundation Excavation", duration: 10, progress: 100 },
          { name: "Foundation Pour", duration: 5, progress: 100 },
          { name: "Basement Walls", duration: 20, progress: 60 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Phase 2: Structure & Envelope",
    startDate: "2024-03-15",
    endDate: "2024-07-15",
    progress: 45,
    status: "In Progress",
    expanded: false,
    divisions: [
      {
        id: "05",
        name: "CSI 05 - Metals",
        startDate: "2024-03-15",
        endDate: "2024-05-15",
        progress: 60,
        status: "In Progress",
        tasks: [
          { name: "Structural Steel", duration: 30, progress: 80 },
          { name: "Metal Decking", duration: 15, progress: 40 },
          { name: "Miscellaneous Metals", duration: 20, progress: 30 },
        ],
      },
      {
        id: "06",
        name: "CSI 06 - Wood, Plastics & Composites",
        startDate: "2024-04-01",
        endDate: "2024-06-15",
        progress: 30,
        status: "In Progress",
        tasks: [
          { name: "Rough Carpentry", duration: 25, progress: 50 },
          { name: "Finish Carpentry", duration: 20, progress: 10 },
          { name: "Architectural Woodwork", duration: 15, progress: 0 },
        ],
      },
      {
        id: "07",
        name: "CSI 07 - Thermal & Moisture Protection",
        startDate: "2024-05-01",
        endDate: "2024-07-15",
        progress: 20,
        status: "Scheduled",
        tasks: [
          { name: "Waterproofing", duration: 10, progress: 0 },
          { name: "Insulation", duration: 15, progress: 0 },
          { name: "Roofing", duration: 20, progress: 40 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Phase 3: MEP & Interior Systems",
    startDate: "2024-06-01",
    endDate: "2024-10-30",
    progress: 15,
    status: "Scheduled",
    expanded: false,
    divisions: [
      {
        id: "15",
        name: "CSI 15 - Mechanical",
        startDate: "2024-06-01",
        endDate: "2024-09-15",
        progress: 25,
        status: "In Progress",
        tasks: [
          { name: "HVAC Rough-in", duration: 30, progress: 40 },
          { name: "Plumbing Rough-in", duration: 25, progress: 20 },
          { name: "Fire Protection", duration: 20, progress: 0 },
        ],
      },
      {
        id: "16",
        name: "CSI 16 - Electrical",
        startDate: "2024-06-15",
        endDate: "2024-10-01",
        progress: 10,
        status: "In Progress",
        tasks: [
          { name: "Electrical Rough-in", duration: 35, progress: 15 },
          { name: "Low Voltage Systems", duration: 20, progress: 0 },
          { name: "Lighting", duration: 15, progress: 0 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Phase 4: Finishes & Closeout",
    startDate: "2024-09-01",
    endDate: "2024-12-30",
    progress: 5,
    status: "Scheduled",
    expanded: false,
    divisions: [
      {
        id: "09",
        name: "CSI 09 - Finishes",
        startDate: "2024-09-01",
        endDate: "2024-12-15",
        progress: 5,
        status: "Scheduled",
        tasks: [
          { name: "Drywall", duration: 20, progress: 0 },
          { name: "Flooring", duration: 25, progress: 0 },
          { name: "Painting", duration: 15, progress: 10 },
        ],
      },
    ],
  },
]

export function GanttChart() {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1])
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedTimeframe, setSelectedTimeframe] = useState("months")

  const togglePhase = (phaseId: number) => {
    setExpandedPhases((prev) => (prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-green-500"
      case "in progress":
        return "bg-blue-500"
      case "scheduled":
        return "bg-gray-400"
      case "delayed":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-green-100 text-green-800 border-green-200"
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const calculatePosition = (startDate: string, endDate: string) => {
    const projectStart = new Date("2024-01-15")
    const projectEnd = new Date("2024-12-30")
    const totalDuration = projectEnd.getTime() - projectStart.getTime()

    const taskStart = new Date(startDate)
    const taskEnd = new Date(endDate)

    const startOffset = ((taskStart.getTime() - projectStart.getTime()) / totalDuration) * 100
    const width = ((taskEnd.getTime() - taskStart.getTime()) / totalDuration) * 100

    return { left: `${Math.max(0, startOffset)}%`, width: `${Math.max(2, width)}%` }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Project GANTT Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {selectedTimeframe === "months" ? "Months" : "Weeks"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Timeline Header */}
          <div className="flex border-b pb-2 mb-4">
            <div className="w-80 text-sm font-medium text-muted-foreground">Task / Phase</div>
            <div className="flex-1 relative">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Jan 2024</span>
                <span>Mar 2024</span>
                <span>Jun 2024</span>
                <span>Sep 2024</span>
                <span>Dec 2024</span>
              </div>
              <div className="h-px bg-border"></div>
            </div>
          </div>

          {/* GANTT Rows */}
          {ganttData.map((phase) => (
            <div key={phase.id} className="space-y-1">
              {/* Phase Row */}
              <div className="flex items-center group hover:bg-muted/50 rounded p-2">
                <div className="w-80 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => togglePhase(phase.id)}>
                    {expandedPhases.includes(phase.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{phase.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getStatusBadgeColor(phase.status)}`}>{phase.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                      </span>
                      <span className="text-xs font-medium">{phase.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative h-8 bg-muted/30 rounded">
                  <div
                    className={`absolute top-1 bottom-1 ${getStatusColor(phase.status)} rounded flex items-center justify-center`}
                    style={calculatePosition(phase.startDate, phase.endDate)}
                  >
                    <div className="text-xs text-white font-medium px-2">{phase.progress}%</div>
                  </div>
                </div>
              </div>

              {/* CSI Division Rows */}
              {expandedPhases.includes(phase.id) &&
                phase.divisions.map((division) => (
                  <div key={division.id} className="flex items-center group hover:bg-muted/30 rounded p-2 ml-6">
                    <div className="w-74 flex items-center gap-2">
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-muted-foreground">{division.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getStatusBadgeColor(division.status)}`}>{division.status}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(division.startDate)} - {formatDate(division.endDate)}
                          </span>
                          <span className="text-xs font-medium">{division.progress}%</span>
                          {division.tasks.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              <Users className="inline h-3 w-3 mr-1" />
                              {division.tasks.length} tasks
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative h-6 bg-muted/20 rounded">
                      <div
                        className={`absolute top-0.5 bottom-0.5 ${getStatusColor(division.status)} rounded flex items-center`}
                        style={calculatePosition(division.startDate, division.endDate)}
                      >
                        <div className="w-full bg-black/20 rounded">
                          <div className="h-full bg-white/30 rounded" style={{ width: `${division.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
