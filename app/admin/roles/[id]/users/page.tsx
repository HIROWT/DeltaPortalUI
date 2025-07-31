"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Users, Search, UserPlus, Mail, Phone, Building2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample users data for a specific role
const roleUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@abcconstruction.com",
    phone: "+1 (555) 123-4567",
    company: "ABC Construction",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@abcconstruction.com",
    phone: "+1 (555) 234-5678",
    company: "ABC Construction",
    joinDate: "2024-01-20",
    lastActive: "1 day ago",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@abcconstruction.com",
    phone: "+1 (555) 345-6789",
    company: "ABC Construction",
    joinDate: "2024-02-01",
    lastActive: "3 hours ago",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    email: "lisa.r@abcconstruction.com",
    phone: "+1 (555) 456-7890",
    company: "ABC Construction",
    joinDate: "2024-01-25",
    lastActive: "1 week ago",
    status: "Inactive",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

interface RoleUsersPageProps {
  params: {
    id: string
  }
}

export default function RoleUsersPage({ params }: RoleUsersPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const roleId = params.id
  const roleName = "Project Manager" // This would be fetched based on roleId

  const filteredUsers = roleUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/roles">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to roles</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-lg font-semibold">{roleName} Users</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign Users
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
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} of {roleUsers.length} users
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
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
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                          {user.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      {user.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-xs`}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(user.joinDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">{user.lastActive}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Users to Role
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
