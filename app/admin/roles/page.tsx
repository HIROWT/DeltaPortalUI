"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Users, Search, Plus, Edit, Trash2, Eye, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample roles data
const roles = [
  {
    id: 1,
    name: "Project Manager",
    description: "Full project management access",
    permissions: [
      "View all projects",
      "Edit project details",
      "Manage team members",
      "Create/Edit RFIs",
      "Approve contracts",
      "View financial data",
    ],
    userCount: 8,
    isSystemRole: false,
    createdDate: "2024-01-15",
    lastModified: "2024-01-20",
  },
  {
    id: 2,
    name: "Site Supervisor",
    description: "On-site management and oversight",
    permissions: [
      "View assigned projects",
      "Update task progress",
      "Create RFIs",
      "View schedules",
      "Manage field reports",
    ],
    userCount: 15,
    isSystemRole: false,
    createdDate: "2024-01-15",
    lastModified: "2024-01-18",
  },
  {
    id: 3,
    name: "Administrator",
    description: "System administration and user management",
    permissions: [
      "Full system access",
      "User management",
      "Role management",
      "System configuration",
      "Audit logs",
      "Data export",
    ],
    userCount: 3,
    isSystemRole: true,
    createdDate: "2024-01-01",
    lastModified: "2024-01-01",
  },
  {
    id: 4,
    name: "Field Worker",
    description: "Basic field access for task updates",
    permissions: ["View assigned tasks", "Update task status", "Upload photos", "View project documents"],
    userCount: 42,
    isSystemRole: false,
    createdDate: "2024-01-15",
    lastModified: "2024-01-22",
  },
  {
    id: 5,
    name: "Client",
    description: "Client access to project information",
    permissions: ["View project progress", "View documents", "Create RFIs", "View reports"],
    userCount: 12,
    isSystemRole: false,
    createdDate: "2024-01-20",
    lastModified: "2024-01-25",
  },
  {
    id: 6,
    name: "Subcontractor",
    description: "Limited access for subcontractor teams",
    permissions: ["View assigned work", "Update progress", "Upload deliverables", "View schedules"],
    userCount: 28,
    isSystemRole: false,
    createdDate: "2024-01-18",
    lastModified: "2024-01-24",
  },
  {
    id: 7,
    name: "Viewer",
    description: "Read-only access to project information",
    permissions: ["View projects", "View documents", "View reports"],
    userCount: 6,
    isSystemRole: false,
    createdDate: "2024-01-22",
    lastModified: "2024-01-22",
  },
]

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[0] | null>(null)

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteRole = (roleId: number) => {
    // Handle role deletion
    console.log("Delete role:", roleId)
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
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-lg font-semibold">Role Management</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container py-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredRoles.length} of {roles.length} roles
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{role.name}</div>
                        {role.isSystemRole && (
                          <Badge variant="secondary" className="text-xs">
                            System
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{role.permissions.length} permissions</div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                            onClick={() => setSelectedRole(role)}
                          >
                            View details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{selectedRole?.name} Permissions</DialogTitle>
                            <DialogDescription>Complete list of permissions for this role</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2">
                            {selectedRole?.permissions.map((permission, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {permission}
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/roles/${role.id}/users`}>
                      <Button variant="ghost" className="h-auto p-0 font-medium text-primary hover:bg-transparent">
                        <Users className="mr-1 h-3 w-3" />
                        {role.userCount} users
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{formatDate(role.createdDate)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{formatDate(role.lastModified)}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={role.isSystemRole}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <Link href={`/admin/roles/${role.id}/users`}>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Users
                          </DropdownMenuItem>
                        </Link>
                        {!role.isSystemRole && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the "{role.name}" role? This action cannot be undone.
                                  All users with this role will lose their permissions.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteRole(role.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete Role
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No roles found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Role
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
