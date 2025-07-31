"use client"

import { Button } from "@/components/ui/button"
import {
  CalendarClock,
  FolderClosed,
  Users,
  HelpCircle,
  AlertTriangle,
  DollarSign,
  FileCodeIcon as FileContract,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  Pause,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GanttChart } from "./gantt-chart"
import { DocumentViewer } from "./document-viewer"
import { DirectoryManager } from "./directory-manager"
import { RFIDetails } from "./rfi-details"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PhaseDetails } from "./phase-details"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"

interface ModuleContentProps {
  module: "GANTT" | "Scheduling" | "RFIs" | "Subcontracts" | "Financials" | "Directory" | "Phases" | "Documents"
}

// Sample phase data based on the entity model
const phases = [
  {
    id: 1,
    name: "Site Preparation & Foundation",
    description: "Initial site work, excavation, and foundation construction",
    status: "COMPLETED",
    plannedStart: "2024-01-15",
    plannedEnd: "2024-03-30",
    actualStart: "2024-01-15",
    actualEnd: "2024-03-28",
    budget: 850000,
    currency: "USD",
    locationStreet: "123 Downtown Ave",
    locationRegion: "New York, NY",
    primeContract: {
      id: 1,
      contractNumber: "PC-2024-001",
      contractor: "Foundation Masters LLC",
      value: 850000,
    },
    phaseDivisions: [
      { id: 1, division: "01", name: "General Requirements" },
      { id: 2, division: "02", name: "Existing Conditions" },
      { id: 3, division: "03", name: "Concrete" },
    ],
    teamMembers: 12,
    subcontractors: 3,
    workPackages: 8,
    locked: false,
  },
  {
    id: 2,
    name: "Structure & Envelope",
    description: "Structural steel, framing, and building envelope",
    status: "IN_PROGRESS",
    plannedStart: "2024-03-15",
    plannedEnd: "2024-07-15",
    actualStart: "2024-03-20",
    actualEnd: null,
    budget: 1250000,
    currency: "USD",
    locationStreet: "123 Downtown Ave",
    locationRegion: "New York, NY",
    primeContract: {
      id: 2,
      contractNumber: "PC-2024-002",
      contractor: "Steel & Frame Construction",
      value: 1250000,
    },
    phaseDivisions: [
      { id: 4, division: "05", name: "Metals" },
      { id: 5, division: "06", name: "Wood, Plastics & Composites" },
      { id: 6, division: "07", name: "Thermal & Moisture Protection" },
      { id: 7, division: "08", name: "Openings" },
    ],
    teamMembers: 18,
    subcontractors: 5,
    workPackages: 12,
    locked: false,
  },
  {
    id: 3,
    name: "MEP Systems",
    description: "Mechanical, electrical, and plumbing systems installation",
    status: "SCHEDULED",
    plannedStart: "2024-06-01",
    plannedEnd: "2024-10-30",
    actualStart: null,
    actualEnd: null,
    budget: 980000,
    currency: "USD",
    locationStreet: "123 Downtown Ave",
    locationRegion: "New York, NY",
    primeContract: {
      id: 3,
      contractNumber: "PC-2024-003",
      contractor: "Integrated MEP Solutions",
      value: 980000,
    },
    phaseDivisions: [
      { id: 8, division: "15", name: "Mechanical" },
      { id: 9, division: "16", name: "Electrical" },
      { id: 10, division: "21", name: "Fire Suppression" },
      { id: 11, division: "22", name: "Plumbing" },
    ],
    teamMembers: 15,
    subcontractors: 8,
    workPackages: 15,
    locked: false,
  },
  {
    id: 4,
    name: "Interior Finishes",
    description: "Interior finishes, fixtures, and final systems",
    status: "PLANNED",
    plannedStart: "2024-09-01",
    plannedEnd: "2024-12-30",
    actualStart: null,
    actualEnd: null,
    budget: 720000,
    currency: "USD",
    locationStreet: "123 Downtown Ave",
    locationRegion: "New York, NY",
    primeContract: {
      id: 4,
      contractNumber: "PC-2024-004",
      contractor: "Premium Finishes Inc",
      value: 720000,
    },
    phaseDivisions: [
      { id: 12, division: "09", name: "Finishes" },
      { id: 13, division: "10", name: "Specialties" },
      { id: 14, division: "11", name: "Equipment" },
      { id: 15, division: "12", name: "Furnishings" },
    ],
    teamMembers: 10,
    subcontractors: 6,
    workPackages: 10,
    locked: false,
  },
]

// Sample RFI data with chat messages
const rfis = [
  {
    id: 1,
    number: "RFI-001",
    subject: "Structural Steel Connection Details",
    description:
      "Need clarification on the connection details for the main beam to column connections on Level 3. The drawings show conflicting information between sheets S-301 and S-302.",
    status: "open",
    priority: "high",
    submittedBy: "Mike Johnson",
    submittedDate: "2024-01-20",
    assignedTo: "David Wilson",
    dueDate: "2024-01-27",
    phase: "Structure & Envelope",
    location: "Level 3, Grid A-C",
    trade: "Structural Steel",
    messages: [
      {
        id: 1,
        sender: "Mike Johnson",
        senderRole: "Site Supervisor",
        message:
          "Need clarification on the connection details for the main beam to column connections on Level 3. The drawings show conflicting information between sheets S-301 and S-302.",
        timestamp: "2024-01-20T09:30:00Z",
      },
      {
        id: 2,
        sender: "David Wilson",
        senderRole: "Structural Engineer",
        message:
          "Thanks for bringing this to our attention. I'm reviewing the drawings now and will coordinate with the design team to provide clarification.",
        timestamp: "2024-01-20T14:15:00Z",
      },
      {
        id: 3,
        sender: "David Wilson",
        senderRole: "Structural Engineer",
        message:
          "After reviewing with the design team, please use the details shown on sheet S-301. Sheet S-302 contains an outdated revision. I'll issue a revised drawing by end of week.",
        timestamp: "2024-01-22T11:45:00Z",
      },
    ],
  },
  {
    id: 2,
    number: "RFI-002",
    subject: "HVAC Equipment Access Requirements",
    description:
      "The mechanical room layout shows equipment placement that may not provide adequate access for maintenance. Need confirmation on minimum clearance requirements.",
    status: "in_review",
    priority: "medium",
    submittedBy: "Sarah Chen",
    submittedDate: "2024-01-22",
    assignedTo: "Robert Martinez",
    dueDate: "2024-01-29",
    phase: "MEP Systems",
    location: "Mechanical Room B2-01",
    trade: "HVAC",
    messages: [
      {
        id: 1,
        sender: "Sarah Chen",
        senderRole: "MEP Coordinator",
        message:
          "The mechanical room layout shows equipment placement that may not provide adequate access for maintenance. Need confirmation on minimum clearance requirements per manufacturer specs.",
        timestamp: "2024-01-22T10:20:00Z",
      },
      {
        id: 2,
        sender: "Robert Martinez",
        senderRole: "MEP Engineer",
        message:
          "I'll review the equipment specifications and coordinate with the mechanical contractor to ensure proper clearances are maintained.",
        timestamp: "2024-01-22T16:30:00Z",
      },
    ],
  },
  {
    id: 3,
    number: "RFI-003",
    subject: "Electrical Panel Location Conflict",
    description:
      "The electrical panel EP-3A location conflicts with the plumbing riser shown on the plumbing drawings. Need resolution for final placement.",
    status: "answered",
    priority: "high",
    submittedBy: "Tom Wilson",
    submittedDate: "2024-01-18",
    assignedTo: "Lisa Rodriguez",
    dueDate: "2024-01-25",
    responseDate: "2024-01-24",
    phase: "MEP Systems",
    location: "Level 2, Electrical Room",
    trade: "Electrical",
    messages: [
      {
        id: 1,
        sender: "Tom Wilson",
        senderRole: "Electrical Foreman",
        message:
          "The electrical panel EP-3A location conflicts with the plumbing riser shown on the plumbing drawings. Need resolution for final placement.",
        timestamp: "2024-01-18T08:45:00Z",
      },
      {
        id: 2,
        sender: "Lisa Rodriguez",
        senderRole: "Project Manager",
        message:
          "I'll coordinate with both the electrical and plumbing teams to resolve this conflict. Setting up a coordination meeting for tomorrow.",
        timestamp: "2024-01-18T13:20:00Z",
      },
      {
        id: 3,
        sender: "Lisa Rodriguez",
        senderRole: "Project Manager",
        message:
          "After coordination meeting, we've decided to relocate the electrical panel to the north wall. Updated drawings will be issued by COB today.",
        timestamp: "2024-01-24T15:30:00Z",
        attachments: ["Updated_Electrical_Layout_Rev3.pdf"],
      },
    ],
  },
  {
    id: 4,
    number: "RFI-004",
    subject: "Concrete Mix Design Approval",
    description:
      "Requesting approval for the proposed concrete mix design for the foundation pours. Mix design attached for review.",
    status: "overdue",
    priority: "high",
    submittedBy: "Carlos Rodriguez",
    submittedDate: "2024-01-15",
    assignedTo: "Jennifer Lopez",
    dueDate: "2024-01-22",
    phase: "Site Preparation & Foundation",
    location: "Foundation Areas A-D",
    trade: "Concrete",
    messages: [
      {
        id: 1,
        sender: "Carlos Rodriguez",
        senderRole: "Concrete Foreman",
        message:
          "Requesting approval for the proposed concrete mix design for the foundation pours. Mix design attached for review.",
        timestamp: "2024-01-15T07:30:00Z",
        attachments: ["Concrete_Mix_Design_Foundation.pdf"],
      },
      {
        id: 2,
        sender: "Jennifer Lopez",
        senderRole: "Owner Representative",
        message:
          "Received the mix design. I'm having our materials engineer review it. Will provide feedback by end of week.",
        timestamp: "2024-01-16T11:15:00Z",
      },
    ],
  },
  {
    id: 5,
    number: "RFI-005",
    subject: "Window Installation Sequence",
    description:
      "Need clarification on the preferred sequence for window installation in relation to exterior wall completion.",
    status: "closed",
    priority: "low",
    submittedBy: "Mark Thompson",
    submittedDate: "2024-01-10",
    assignedTo: "David Wilson",
    dueDate: "2024-01-17",
    responseDate: "2024-01-16",
    phase: "Structure & Envelope",
    location: "Levels 2-4, All Elevations",
    trade: "Windows & Glazing",
    messages: [
      {
        id: 1,
        sender: "Mark Thompson",
        senderRole: "Glazing Contractor",
        message:
          "Need clarification on the preferred sequence for window installation in relation to exterior wall completion. Should we wait for full wall completion or can we proceed with rough opening preparation?",
        timestamp: "2024-01-10T14:20:00Z",
      },
      {
        id: 2,
        sender: "David Wilson",
        senderRole: "Structural Engineer",
        message:
          "You can proceed with rough opening preparation once the structural frame is complete. Full wall completion is not required before window installation.",
        timestamp: "2024-01-16T09:45:00Z",
      },
      {
        id: 3,
        sender: "Mark Thompson",
        senderRole: "Glazing Contractor",
        message:
          "Perfect, that helps with our scheduling. We'll coordinate with the framing crew for the installation sequence.",
        timestamp: "2024-01-16T10:30:00Z",
      },
    ],
  },
]

// Sample subcontract data
const subcontracts = [
  {
    id: 1,
    contractor: "Elite Electrical Services",
    trade: "Electrical",
    contractValue: "$485,000",
    status: "Active",
    progress: 85,
    startDate: "2024-02-15",
    endDate: "2024-08-30",
    contact: "Mike Johnson",
    phone: "+1 (555) 234-5678",
    email: "mike@eliteelectrical.com",
    csiDivision: "16 - Electrical",
  },
  {
    id: 2,
    contractor: "Premium Plumbing Co.",
    trade: "Plumbing",
    contractValue: "$320,000",
    status: "Pending Approval",
    progress: 0,
    startDate: "2024-03-01",
    endDate: "2024-07-15",
    contact: "Sarah Wilson",
    phone: "+1 (555) 345-6789",
    email: "sarah@premiumplumbing.com",
    csiDivision: "15 - Mechanical",
  },
  {
    id: 3,
    contractor: "Superior Steel Works",
    trade: "Structural Steel",
    contractValue: "$750,000",
    status: "Active",
    progress: 95,
    startDate: "2024-01-20",
    endDate: "2024-05-30",
    contact: "David Chen",
    phone: "+1 (555) 456-7890",
    email: "david@superiorsteel.com",
    csiDivision: "05 - Metals",
  },
  {
    id: 4,
    contractor: "Apex HVAC Systems",
    trade: "HVAC",
    contractValue: "$425,000",
    status: "Active",
    progress: 60,
    startDate: "2024-03-15",
    endDate: "2024-09-15",
    contact: "Jennifer Lopez",
    phone: "+1 (555) 567-8901",
    email: "jennifer@apexhvac.com",
    csiDivision: "15 - Mechanical",
  },
  {
    id: 5,
    contractor: "Master Concrete Solutions",
    trade: "Concrete",
    contractValue: "$380,000",
    status: "Complete",
    progress: 100,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    contact: "Robert Martinez",
    phone: "+1 (555) 678-9012",
    email: "robert@masterconcrete.com",
    csiDivision: "03 - Concrete",
  },
  {
    id: 6,
    contractor: "Quality Roofing Inc.",
    trade: "Roofing",
    contractValue: "$285,000",
    status: "Scheduled",
    progress: 0,
    startDate: "2024-05-01",
    endDate: "2024-07-30",
    contact: "Lisa Thompson",
    phone: "+1 (555) 789-0123",
    email: "lisa@qualityroofing.com",
    csiDivision: "07 - Thermal & Moisture Protection",
  },
]

// Sample bidding data
const activeBids = [
  {
    id: 1,
    trade: "Flooring",
    csiDivision: "09 - Finishes",
    bidDeadline: "2024-02-15",
    bidCount: 5,
    estimatedValue: "$180,000",
    status: "Open",
  },
  {
    id: 2,
    trade: "Painting",
    csiDivision: "09 - Finishes",
    bidDeadline: "2024-02-20",
    bidCount: 3,
    estimatedValue: "$95,000",
    status: "Open",
  },
  {
    id: 3,
    trade: "Landscaping",
    csiDivision: "32 - Exterior Improvements",
    bidDeadline: "2024-02-10",
    bidCount: 7,
    estimatedValue: "$125,000",
    status: "Evaluation",
  },
]

export function ModuleContent({ module }: ModuleContentProps) {
  const [selectedPhase, setSelectedPhase] = useState<(typeof phases)[0] | null>(null)
  const [selectedRFI, setSelectedRFI] = useState<(typeof rfis)[0] | null>(null)
  const [expandedRFIs, setExpandedRFIs] = useState<Set<number>>(new Set())

  const toggleRFIExpansion = (rfiId: number) => {
    const newExpanded = new Set(expandedRFIs)
    if (newExpanded.has(rfiId)) {
      newExpanded.delete(rfiId)
    } else {
      newExpanded.add(rfiId)
    }
    setExpandedRFIs(newExpanded)
  }

  if (module === "GANTT") {
    return <GanttChart />
  }

  if (module === "Documents") {
    return <DocumentViewer />
  }

  if (module === "Directory") {
    return <DirectoryManager />
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "in_progress":
      case "open":
        return "bg-green-100 text-green-800 border-green-200"
      case "complete":
      case "completed":
      case "answered":
      case "closed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending approval":
      case "in_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "scheduled":
      case "planned":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "evaluation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "answered":
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
      case "open":
      case "in_review":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "scheduled":
      case "planned":
        return <Target className="h-4 w-4 text-gray-600" />
      case "on_hold":
        return <Pause className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateProgress = (phase: (typeof phases)[0]) => {
    if (phase.status === "COMPLETED") return 100
    if (phase.status === "PLANNED" || phase.status === "SCHEDULED") return 0
    if (phase.status === "IN_PROGRESS") {
      // Calculate based on actual vs planned dates
      if (phase.actualStart && phase.plannedEnd) {
        const start = new Date(phase.actualStart).getTime()
        const end = new Date(phase.plannedEnd).getTime()
        const now = new Date().getTime()
        const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
        return Math.round(progress)
      }
    }
    return 0
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && !["closed", "answered"].includes(status.toLowerCase())
  }

  return (
    <div className="space-y-6">
      {module === "RFIs" && (
        <>
          {selectedRFI ? (
            <RFIDetails rfi={selectedRFI} onBack={() => setSelectedRFI(null)} />
          ) : (
            <>
              {/* RFI Overview Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open RFIs</CardTitle>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rfis.filter((rfi) => rfi.status === "open").length}</div>
                    <p className="text-xs text-muted-foreground">Awaiting response</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue RFIs</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {rfis.filter((rfi) => isOverdue(rfi.dueDate, rfi.status)).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Require immediate attention</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Review</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rfis.filter((rfi) => rfi.status === "in_review").length}</div>
                    <p className="text-xs text-muted-foreground">Being processed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2 days</div>
                    <p className="text-xs text-muted-foreground">Target: 2 days</p>
                  </CardContent>
                </Card>
              </div>

              {/* RFIs Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Request for Information (RFIs)
                    </CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create RFI
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>RFI Details</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Timeline</TableHead>
                          <TableHead>Messages</TableHead>
                          <TableHead className="w-[50px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rfis.map((rfi) => (
                          <>
                            <TableRow
                              key={rfi.id}
                              className="hover:bg-muted/50 cursor-pointer"
                              onClick={() => setSelectedRFI(rfi)}
                            >
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleRFIExpansion(rfi.id)
                                  }}
                                >
                                  {expandedRFIs.has(rfi.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">#{rfi.number}</span>
                                    {isOverdue(rfi.dueDate, rfi.status) && (
                                      <Badge variant="destructive" className="text-xs">
                                        OVERDUE
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="font-medium text-sm">{rfi.subject}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {rfi.phase} • {rfi.location}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(rfi.status)}
                                  <Badge className={`${getStatusColor(rfi.status)} text-xs`}>
                                    {rfi.status.replace("_", " ").toUpperCase()}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getPriorityColor(rfi.priority)} text-xs`}>
                                  {rfi.priority.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-sm">{rfi.assignedTo}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Due:</span>
                                    <span
                                      className={`font-medium ${
                                        isOverdue(rfi.dueDate, rfi.status) ? "text-red-600" : ""
                                      }`}
                                    >
                                      {formatDate(rfi.dueDate)}
                                    </span>
                                  </div>
                                  <div className="text-muted-foreground">
                                    Submitted: {formatDate(rfi.submittedDate)}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium">{rfi.messages.length}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit RFI
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                      <MessageSquare className="mr-2 h-4 w-4" />
                                      Add Response
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                            {/* Chat Preview Dropdown */}
                            {expandedRFIs.has(rfi.id) && (
                              <TableRow className="bg-muted/20">
                                <TableCell></TableCell>
                                <TableCell colSpan={7}>
                                  <div className="py-2">
                                    <div className="text-sm font-medium mb-2 flex items-center gap-2">
                                      <MessageSquare className="h-4 w-4" />
                                      Recent Messages ({rfi.messages.length})
                                    </div>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                      {rfi.messages.slice(-3).map((message) => (
                                        <div key={message.id} className="flex gap-2 text-sm">
                                          <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs">
                                              {message.sender
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="font-medium">{message.sender}</span>
                                              <Badge variant="outline" className="text-xs">
                                                {message.senderRole}
                                              </Badge>
                                              <span className="text-xs text-muted-foreground">
                                                {formatDateTime(message.timestamp)}
                                              </span>
                                            </div>
                                            <div className="text-muted-foreground bg-muted/50 rounded p-2">
                                              {message.message.length > 150
                                                ? `${message.message.substring(0, 150)}...`
                                                : message.message}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    {rfi.messages.length > 3 && (
                                      <div className="text-xs text-muted-foreground mt-2">
                                        Click RFI to view all {rfi.messages.length} messages
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}

      {module === "Phases" && (
        <>
          {selectedPhase ? (
            <PhaseDetails phase={selectedPhase} onBack={() => setSelectedPhase(null)} />
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FolderClosed className="h-5 w-5" />
                    Project Phases
                  </CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Phase
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Phase</TableHead>
                        <TableHead>Prime Contract</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>CSI Divisions</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="w-[50px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {phases.map((phase) => (
                        <TableRow
                          key={phase.id}
                          className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedPhase(phase)}
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{phase.name}</div>
                              <div className="text-sm text-muted-foreground">{phase.description}</div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {phase.locationRegion}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{phase.primeContract.contractNumber}</div>
                              <div className="text-sm text-muted-foreground">{phase.primeContract.contractor}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatCurrency(phase.primeContract.value, phase.currency)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Planned:</span>
                              </div>
                              <div className="ml-4">
                                {formatDate(phase.plannedStart)} - {formatDate(phase.plannedEnd)}
                              </div>
                              {(phase.actualStart || phase.actualEnd) && (
                                <>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Actual:</span>
                                  </div>
                                  <div className="ml-4">
                                    {formatDate(phase.actualStart)} - {formatDate(phase.actualEnd)}
                                  </div>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{formatCurrency(phase.budget, phase.currency)}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(phase.status)}
                              <Badge className={`${getStatusColor(phase.status)} text-xs`}>
                                {phase.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{calculateProgress(phase)}%</div>
                              <Progress value={calculateProgress(phase)} className="h-2 w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{phase.phaseDivisions.length} divisions</div>
                              <div className="flex flex-wrap gap-1">
                                {phase.phaseDivisions.slice(0, 3).map((division) => (
                                  <Badge key={division.id} variant="outline" className="text-xs">
                                    {division.division}
                                  </Badge>
                                ))}
                                {phase.phaseDivisions.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{phase.phaseDivisions.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span>{phase.teamMembers} members</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3 w-3 text-muted-foreground" />
                                <span>{phase.subcontractors} subs</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileContract className="h-3 w-3 text-muted-foreground" />
                                <span>{phase.workPackages} packages</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <Link href={`/phases/${phase.id}/edit`}>
                                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Phase
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  <FileContract className="mr-2 h-4 w-4" />
                                  View Contract
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {module === "Subcontracts" && (
        <>
          {/* Subcontract Bidding Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Active Bidding
                </CardTitle>
                <Link href="/subcontracts/bidding">
                  <Button variant="outline" size="sm">
                    View All Bids
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {activeBids.map((bid) => (
                  <div key={bid.id} className="rounded border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{bid.trade}</h4>
                      <Badge className={`text-xs ${getStatusColor(bid.status)}`}>{bid.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{bid.csiDivision}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. Value:</span>
                      <span className="font-medium">{bid.estimatedValue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bids:</span>
                      <span className="font-medium">{bid.bidCount} received</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{formatDate(bid.bidDeadline)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subcontracts Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileContract className="h-5 w-5" />
                  Subcontracts
                </CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subcontract
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Trade / CSI Division</TableHead>
                      <TableHead>Contract Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="w-[50px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subcontracts.map((contract) => (
                      <TableRow key={contract.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{contract.contractor}</div>
                            <div className="text-sm text-muted-foreground">{contract.trade}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{contract.csiDivision}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{contract.contractValue}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(contract.status)} text-xs`}>{contract.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{contract.progress}%</div>
                            <Progress value={contract.progress} className="h-2 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(contract.startDate)}
                            </div>
                            <div>{formatDate(contract.endDate)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{contract.contact}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <a href={`tel:${contract.phone}`} className="flex items-center gap-1 hover:text-primary">
                                <Phone className="h-3 w-3" />
                                {contract.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <a
                                href={`mailto:${contract.email}`}
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <Mail className="h-3 w-3" />
                                {contract.email}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Contract
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Building2 className="mr-2 h-4 w-4" />
                                View Company Profile
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Other modules remain the same */}
      {module !== "Subcontracts" &&
        module !== "Phases" &&
        module !== "Documents" &&
        module !== "Directory" &&
        module !== "RFIs" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {module === "Scheduling" && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">3 due today</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-1/2 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>50% Complete</span>
                        <span>24 Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Schedule Conflicts</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                    <div className="mt-4 space-y-2">
                      <div className="rounded border p-2 text-xs">
                        <p className="font-medium">Electrical vs. Plumbing</p>
                        <p className="text-muted-foreground">Floor 3, East Wing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">86%</div>
                    <p className="text-xs text-muted-foreground">On schedule</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[86%] rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Start: Jan 15</span>
                        <span>End: Dec 30</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {module === "Financials" && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Project Budget</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3.5M</div>
                    <p className="text-xs text-muted-foreground">Total approved budget</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-2/3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$2.3M Spent</span>
                        <span>$1.2M Remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Change Orders</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$125K</div>
                    <p className="text-xs text-muted-foreground">8 approved changes</p>
                    <div className="mt-4 space-y-2">
                      <div className="rounded border p-2 text-xs">
                        <p className="font-medium">CO #007 - HVAC Upgrade</p>
                        <p className="text-muted-foreground">+$45K approved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$285K</div>
                    <p className="text-xs text-muted-foreground">This month's expenses</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-4/5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>80% of monthly budget</span>
                        <span>$60K remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
    </div>
  )
}
