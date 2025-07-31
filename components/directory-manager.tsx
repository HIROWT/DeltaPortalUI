"use client"

import { useState } from "react"
import {
  Users,
  Building2,
  Plus,
  Trash2,
  Edit,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Settings,
  Mail,
  Phone,
  MapPin,
  Shield,
  Search,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data
const roles = [
  "PROJECT_MANAGER",
  "ESTIMATOR",
  "SUPERINTENDENT",
  "FOREMAN",
  "ENGINEER",
  "ARCHITECT",
  "OWNER_REP",
  "ACCOUNTANT",
  "ADMIN",
]

const organizationTypes = [
  "GENERAL_CONTRACTOR",
  "SUBCONTRACTOR",
  "CONSULTANT",
  "OWNER",
  "ARCHITECT_FIRM",
  "ENGINEERING_FIRM",
  "SUPPLIER",
]

const organizations = [
  {
    id: 1,
    name: "ABC Construction",
    type: "GENERAL_CONTRACTOR",
    address: "123 Main St, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@abcconstruction.com",
    users: [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@abcconstruction.com",
        phone: "+1 (555) 123-4567",
        role: "PROJECT_MANAGER",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@abcconstruction.com",
        phone: "+1 (555) 234-5678",
        role: "SUPERINTENDENT",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    name: "Foundation Masters LLC",
    type: "SUBCONTRACTOR",
    address: "456 Oak Ave, Brooklyn, NY 11201",
    phone: "+1 (555) 345-6789",
    email: "contact@foundationmasters.com",
    users: [
      {
        id: 5,
        name: "Mike Chen",
        email: "mike.chen@foundationmasters.com",
        phone: "+1 (555) 345-6789",
        role: "FOREMAN",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 3,
    name: "Structural Engineering Associates",
    type: "ENGINEERING_FIRM",
    address: "789 Pine St, Manhattan, NY 10002",
    phone: "+1 (555) 456-7890",
    email: "info@structuraleng.com",
    users: [
      {
        id: 3,
        name: "David Wilson",
        email: "david.wilson@structuraleng.com",
        phone: "+1 (555) 456-7890",
        role: "ENGINEER",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 4,
    name: "Steel & Frame Construction",
    type: "SUBCONTRACTOR",
    address: "321 Steel Way, Queens, NY 11101",
    phone: "+1 (555) 567-8901",
    email: "info@steelframe.com",
    users: [
      {
        id: 6,
        name: "Lisa Rodriguez",
        email: "lisa.r@steelframe.com",
        phone: "+1 (555) 567-8901",
        role: "SUPERINTENDENT",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 5,
    name: "MEP Engineering Solutions",
    type: "ENGINEERING_FIRM",
    address: "654 Electric Blvd, Bronx, NY 10451",
    phone: "+1 (555) 678-9012",
    email: "contact@mepeng.com",
    users: [
      {
        id: 7,
        name: "Robert Martinez",
        email: "robert.m@mepeng.com",
        phone: "+1 (555) 678-9012",
        role: "ENGINEER",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 6,
    name: "Downtown Development Corp",
    type: "OWNER",
    address: "100 Corporate Plaza, New York, NY 10005",
    phone: "+1 (555) 789-0123",
    email: "projects@downtowndev.com",
    users: [
      {
        id: 8,
        name: "Jennifer Lopez",
        email: "jennifer.lopez@downtowndev.com",
        phone: "+1 (555) 789-0123",
        role: "OWNER_REP",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
]

const phases = [
  {
    id: 1,
    name: "Site Preparation & Foundation",
    status: "COMPLETED",
    individualMembers: [
      { id: 1, name: "John Smith", role: "PROJECT_MANAGER", organizationId: 1 },
      { id: 2, name: "Sarah Johnson", role: "SUPERINTENDENT", organizationId: 1 },
    ],
    organizationMembers: [{ id: 2, organizationId: 2, name: "Foundation Masters LLC", type: "SUBCONTRACTOR" }],
  },
  {
    id: 2,
    name: "Structure & Envelope",
    status: "IN_PROGRESS",
    individualMembers: [
      { id: 1, name: "John Smith", role: "PROJECT_MANAGER", organizationId: 1 },
      { id: 3, name: "David Wilson", role: "ENGINEER", organizationId: 3 },
    ],
    organizationMembers: [
      { id: 4, organizationId: 4, name: "Steel & Frame Construction", type: "SUBCONTRACTOR" },
      { id: 3, organizationId: 3, name: "Structural Engineering Associates", type: "ENGINEERING_FIRM" },
    ],
  },
  {
    id: 3,
    name: "MEP Systems",
    status: "SCHEDULED",
    individualMembers: [
      { id: 1, name: "John Smith", role: "PROJECT_MANAGER", organizationId: 1 },
      { id: 7, name: "Robert Martinez", role: "ENGINEER", organizationId: 5 },
    ],
    organizationMembers: [{ id: 5, organizationId: 5, name: "MEP Engineering Solutions", type: "ENGINEERING_FIRM" }],
  },
  {
    id: 4,
    name: "Interior Finishes",
    status: "PLANNED",
    individualMembers: [{ id: 1, name: "John Smith", role: "PROJECT_MANAGER", organizationId: 1 }],
    organizationMembers: [],
  },
]

export function DirectoryManager() {
  const [expandedOrgs, setExpandedOrgs] = useState<Set<number>>(new Set([1]))
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1, 2]))
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [orgTypeFilter, setOrgTypeFilter] = useState("all")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isAddOrgDialogOpen, setIsAddOrgDialogOpen] = useState(false)

  const toggleOrgExpansion = (orgId: number) => {
    const newExpanded = new Set(expandedOrgs)
    if (newExpanded.has(orgId)) {
      newExpanded.delete(orgId)
    } else {
      newExpanded.add(orgId)
    }
    setExpandedOrgs(newExpanded)
  }

  const togglePhaseExpansion = (phaseId: number) => {
    const newExpanded = new Set(expandedPhases)
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId)
    } else {
      newExpanded.add(phaseId)
    }
    setExpandedPhases(newExpanded)
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      PROJECT_MANAGER: "bg-blue-100 text-blue-800 border-blue-200",
      ESTIMATOR: "bg-green-100 text-green-800 border-green-200",
      SUPERINTENDENT: "bg-purple-100 text-purple-800 border-purple-200",
      FOREMAN: "bg-orange-100 text-orange-800 border-orange-200",
      ENGINEER: "bg-cyan-100 text-cyan-800 border-cyan-200",
      ARCHITECT: "bg-pink-100 text-pink-800 border-pink-200",
      OWNER_REP: "bg-yellow-100 text-yellow-800 border-yellow-200",
      ACCOUNTANT: "bg-indigo-100 text-indigo-800 border-indigo-200",
      ADMIN: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getOrgTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      GENERAL_CONTRACTOR: "bg-blue-100 text-blue-800 border-blue-200",
      SUBCONTRACTOR: "bg-green-100 text-green-800 border-green-200",
      CONSULTANT: "bg-purple-100 text-purple-800 border-purple-200",
      OWNER: "bg-yellow-100 text-yellow-800 border-yellow-200",
      ARCHITECT_FIRM: "bg-pink-100 text-pink-800 border-pink-200",
      ENGINEERING_FIRM: "bg-cyan-100 text-cyan-800 border-cyan-200",
      SUPPLIER: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatRole = (role: string) => {
    return role
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const formatOrgType = (type: string) => {
    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.users.some((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = orgTypeFilter === "all" || org.type === orgTypeFilter

    return matchesSearch && matchesType
  })

  const getOrganizationById = (orgId: number) => {
    return organizations.find((org) => org.id === orgId)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce((total, org) => total + org.users.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across {organizations.length} organizations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">Active on project</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Managers</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce(
                (total, org) => total + org.users.filter((user) => user.role === "PROJECT_MANAGER").length,
                0,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Managing phases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Phases</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{phases.length}</div>
            <p className="text-xs text-muted-foreground">With assigned teams</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="phases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="phases">Phase Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="phases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Phase Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phases.map((phase) => (
                  <div key={phase.id} className="border rounded-lg">
                    {/* Phase Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => togglePhaseExpansion(phase.id)}
                        >
                          {expandedPhases.has(phase.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <h3 className="font-medium">{phase.name}</h3>
                        <Badge className={`text-xs ${getRoleColor(phase.status)}`}>{phase.status}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{phase.individualMembers.length} users</span>
                          <Building2 className="h-3 w-3" />
                          <span>{phase.organizationMembers.length} orgs</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Member
                        </Button>
                        <Button size="sm" variant="outline">
                          <Building2 className="mr-2 h-4 w-4" />
                          Add Organization
                        </Button>
                      </div>
                    </div>

                    {/* Phase Content */}
                    {expandedPhases.has(phase.id) && (
                      <div className="p-4 space-y-4">
                        {/* Individual Members */}
                        {phase.individualMembers.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Individual Members ({phase.individualMembers.length})
                            </h4>
                            <div className="space-y-2">
                              {phase.individualMembers.map((member) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium text-sm">{member.name}</div>
                                      <div className="flex items-center gap-2">
                                        <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                                          {formatRole(member.role)}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          {getOrganizationById(member.organizationId)?.name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Organization Members */}
                        {phase.organizationMembers.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Organization Members ({phase.organizationMembers.length})
                            </h4>
                            <div className="space-y-2">
                              {phase.organizationMembers.map((orgMember) => {
                                const org = getOrganizationById(orgMember.organizationId)
                                return (
                                  <div key={orgMember.id} className="border rounded p-3 bg-muted/30">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                          <div className="font-medium">{orgMember.name}</div>
                                          <Badge className={`text-xs ${getOrgTypeColor(orgMember.type)}`}>
                                            {formatOrgType(orgMember.type)}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                          {org?.users.length || 0} users
                                        </span>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    {/* Organization Users */}
                                    {org && org.users.length > 0 && (
                                      <div className="ml-8 space-y-1">
                                        {org.users.map((user) => (
                                          <div key={user.id} className="flex items-center gap-2 text-sm">
                                            <Avatar className="h-6 w-6">
                                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                              <AvatarFallback className="text-xs">
                                                {user.name
                                                  .split(" ")
                                                  .map((n) => n[0])
                                                  .join("")}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                            <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                                              {formatRole(user.role)}
                                            </Badge>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Empty State */}
                        {phase.individualMembers.length === 0 && phase.organizationMembers.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Users className="mx-auto h-8 w-8 mb-2" />
                            <p className="text-sm">No team members or organizations assigned to this phase</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Project-Level Permissions
                  </CardTitle>
                  <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add User to Project</DialogTitle>
                        <DialogDescription>Add a new user or assign an existing user to the project.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="userName">Full Name</Label>
                            <Input id="userName" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userEmail">Email</Label>
                            <Input id="userEmail" type="email" placeholder="john@company.com" />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="userPhone">Phone</Label>
                            <Input id="userPhone" placeholder="+1 (555) 123-4567" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userRole">Role</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {formatRole(role)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userOrg">Organization</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organization" />
                            </SelectTrigger>
                            <SelectContent>
                              {organizations.map((org) => (
                                <SelectItem key={org.id} value={org.id.toString()}>
                                  {org.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Assign to Phases</Label>
                          <div className="space-y-2">
                            {phases.map((phase) => (
                              <div key={phase.id} className="flex items-center space-x-2">
                                <Checkbox id={`phase-${phase.id}`} />
                                <Label htmlFor={`phase-${phase.id}`} className="text-sm">
                                  {phase.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsAddUserDialogOpen(false)}>Add User</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {organizations
                    .flatMap((org) => org.users)
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <Badge className={`text-xs ${getRoleColor(user.role)}`}>{formatRole(user.role)}</Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Phases
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove from Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Management
                  </CardTitle>
                  <Dialog open={isAddOrgDialogOpen} onOpenChange={setIsAddOrgDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Organization
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Organization</DialogTitle>
                        <DialogDescription>Add a new organization to the project.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="orgName">Organization Name</Label>
                          <Input id="orgName" placeholder="Company Name LLC" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="orgType">Organization Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {organizationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {formatOrgType(type)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="orgAddress">Address</Label>
                          <Textarea id="orgAddress" placeholder="123 Main St, City, State 12345" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="orgPhone">Phone</Label>
                            <Input id="orgPhone" placeholder="+1 (555) 123-4567" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="orgEmail">Email</Label>
                            <Input id="orgEmail" type="email" placeholder="info@company.com" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddOrgDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsAddOrgDialogOpen(false)}>Add Organization</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {organizations.map((org) => (
                    <div key={org.id} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{org.name}</div>
                          <Badge className={`text-xs ${getOrgTypeColor(org.type)}`}>{formatOrgType(org.type)}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{org.users.length} users</div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {org.address}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {org.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {org.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organizations & Users
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search organizations or users..."
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={orgTypeFilter} onValueChange={setOrgTypeFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {formatOrgType(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganizations.map((org) => (
                      <>
                        <TableRow key={org.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleOrgExpansion(org.id)}
                            >
                              {expandedOrgs.has(org.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{org.name}</div>
                                <Badge className={`text-xs ${getOrgTypeColor(org.type)}`}>
                                  {formatOrgType(org.type)}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getOrgTypeColor(org.type)}`}>{formatOrgType(org.type)}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                {org.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                {org.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{org.users.length}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {org.address}
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedOrgs.has(org.id) &&
                          org.users.map((user) => (
                            <TableRow key={`${org.id}-${user.id}`} className="bg-muted/20">
                              <TableCell></TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3 ml-4">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`text-xs ${getRoleColor(user.role)}`}>{formatRole(user.role)}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                    {user.phone}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                    {user.email}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  User
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <Settings className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Users className="mr-2 h-4 w-4" />
                                      Manage Phases
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Remove User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
