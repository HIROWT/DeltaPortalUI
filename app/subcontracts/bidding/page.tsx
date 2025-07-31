"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Users,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Extended bidding data
const biddingPackages = [
  {
    id: 1,
    trade: "Flooring",
    csiDivision: "09 - Finishes",
    description: "Hardwood, tile, and carpet installation for all floors",
    bidDeadline: "2024-02-15",
    bidCount: 5,
    estimatedValue: "$180,000",
    status: "Open",
    publishDate: "2024-01-20",
    prequalified: 8,
    downloaded: 12,
  },
  {
    id: 2,
    trade: "Painting",
    csiDivision: "09 - Finishes",
    description: "Interior and exterior painting, all surfaces",
    bidDeadline: "2024-02-20",
    bidCount: 3,
    estimatedValue: "$95,000",
    status: "Open",
    publishDate: "2024-01-25",
    prequalified: 6,
    downloaded: 9,
  },
  {
    id: 3,
    trade: "Landscaping",
    csiDivision: "32 - Exterior Improvements",
    description: "Site landscaping, irrigation, and hardscaping",
    bidDeadline: "2024-02-10",
    bidCount: 7,
    estimatedValue: "$125,000",
    status: "Evaluation",
    publishDate: "2024-01-15",
    prequalified: 10,
    downloaded: 15,
  },
  {
    id: 4,
    trade: "Fire Protection",
    csiDivision: "21 - Fire Suppression",
    description: "Sprinkler system installation and testing",
    bidDeadline: "2024-03-01",
    bidCount: 2,
    estimatedValue: "$220,000",
    status: "Open",
    publishDate: "2024-02-01",
    prequalified: 5,
    downloaded: 7,
  },
  {
    id: 5,
    trade: "Elevator Installation",
    csiDivision: "14 - Conveying Equipment",
    description: "Passenger and freight elevator systems",
    bidDeadline: "2024-01-30",
    bidCount: 4,
    estimatedValue: "$350,000",
    status: "Awarded",
    publishDate: "2024-01-05",
    prequalified: 4,
    downloaded: 6,
  },
]

export default function BiddingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPackages = biddingPackages.filter((pkg) => {
    const matchesSearch =
      pkg.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.csiDivision.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || pkg.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200"
      case "evaluation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "awarded":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
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

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-lg font-semibold">Subcontract Bidding</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Bid Package
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container py-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Bids</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Accepting submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Evaluation</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Under review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$970K</div>
              <p className="text-xs text-muted-foreground">Estimated bid value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-xs text-muted-foreground">Bids per package</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bid packages..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="evaluation">Evaluation</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredPackages.length} of {biddingPackages.length} packages
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade / Description</TableHead>
                <TableHead>CSI Division</TableHead>
                <TableHead>Estimated Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Bids Received</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{pkg.trade}</div>
                      <div className="text-sm text-muted-foreground">{pkg.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{pkg.csiDivision}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{pkg.estimatedValue}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(pkg.status)} text-xs`}>{pkg.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {formatDate(pkg.bidDeadline)}
                      </div>
                      {pkg.status === "Open" && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {getDaysUntilDeadline(pkg.bidDeadline)} days left
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-bold">{pkg.bidCount}</div>
                      <div className="text-xs text-muted-foreground">submissions</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prequalified:</span>
                        <span className="font-medium">{pkg.prequalified}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Downloaded:</span>
                        <span className="font-medium">{pkg.downloaded}</span>
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
                          Edit Package
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Submissions
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
