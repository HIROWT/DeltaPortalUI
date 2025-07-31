"use client"

import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  FileCodeIcon as FileContract,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface PhaseDetailsProps {
  phase: {
    id: number
    name: string
    description: string
    status: string
    plannedStart: string
    plannedEnd: string
    actualStart: string | null
    actualEnd: string | null
    budget: number
    currency: string
    locationStreet: string
    locationRegion: string
    primeContract: {
      id: number
      contractNumber: string
      contractor: string
      value: number
    }
    phaseDivisions: Array<{
      id: number
      division: string
      name: string
    }>
    teamMembers: number
    subcontractors: number
    workPackages: number
    locked: boolean
  }
  onBack: () => void
}

// Sample detailed data that would come from the backend
const sampleWorkPackages = [
  {
    id: 1,
    name: "Site Survey & Permits",
    status: "COMPLETED",
    progress: 100,
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    assignedTo: "Survey Team Alpha",
  },
  {
    id: 2,
    name: "Excavation & Grading",
    status: "COMPLETED",
    progress: 100,
    startDate: "2024-02-01",
    endDate: "2024-02-20",
    assignedTo: "Earth Moving Specialists",
  },
  {
    id: 3,
    name: "Foundation Pour",
    status: "IN_PROGRESS",
    progress: 75,
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    assignedTo: "Foundation Masters LLC",
  },
]

const sampleTeamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Phase Manager",
    company: "Foundation Masters LLC",
    email: "john.smith@foundationmasters.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Site Supervisor",
    company: "Foundation Masters LLC",
    email: "sarah.j@foundationmasters.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Safety Coordinator",
    company: "ABC Construction",
    email: "mike.chen@abcconstruction.com",
    phone: "+1 (555) 345-6789",
  },
]

export function PhaseDetails({ phase, onBack }: PhaseDetailsProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
      case "planned":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "scheduled":
      case "planned":
        return <Target className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const calculateProgress = () => {
    if (phase.status === "COMPLETED") return 100
    if (phase.status === "PLANNED" || phase.status === "SCHEDULED") return 0
    if (phase.status === "IN_PROGRESS") {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{phase.name}</h1>
            <p className="text-muted-foreground">{phase.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/phases/${phase.id}/edit`}>
            <Button variant="outline">Edit Phase</Button>
          </Link>
          <Button>View Contract</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {getStatusIcon(phase.status)}
          </CardHeader>
          <CardContent>
            <Badge className={`${getStatusColor(phase.status)} text-sm`}>{phase.status.replace("_", " ")}</Badge>
            <div className="mt-2">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={calculateProgress()} className="flex-1" />
                <span className="text-sm font-medium">{calculateProgress()}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(phase.budget, phase.currency)}</div>
            <p className="text-xs text-muted-foreground">Phase allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Planned:</span>
                <div className="font-medium">
                  {formatDate(phase.plannedStart)} - {formatDate(phase.plannedEnd)}
                </div>
              </div>
              {(phase.actualStart || phase.actualEnd) && (
                <div>
                  <span className="text-muted-foreground">Actual:</span>
                  <div className="font-medium">
                    {formatDate(phase.actualStart)} - {formatDate(phase.actualEnd)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{phase.locationStreet}</div>
              <div className="text-muted-foreground">{phase.locationRegion}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prime Contract Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileContract className="h-4 w-4" />
            Prime Contract
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Contract:</span>
              <span className="ml-2 font-medium">{phase.primeContract.contractNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Contractor:</span>
              <span className="ml-2 font-medium">{phase.primeContract.contractor}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Value:</span>
              <span className="ml-2 font-medium">{formatCurrency(phase.primeContract.value, phase.currency)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSI Divisions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">CSI Divisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {phase.phaseDivisions.map((division) => (
              <Badge key={division.id} variant="outline" className="text-xs">
                {division.division} - {division.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.company}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{member.email}</div>
                          <div className="text-muted-foreground">{member.phone}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subcontractors">
          <Card>
            <CardHeader>
              <CardTitle>Phase Subcontractors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="mx-auto h-12 w-12 mb-4" />
                <p>Subcontractor assignments will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Phase Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileContract className="mx-auto h-12 w-12 mb-4" />
                <p>Phase-related documents will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
