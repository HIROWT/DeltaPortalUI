"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  FolderClosed,
  LayoutGrid,
  Star,
  Users,
  BarChart3,
  Calendar,
  HelpCircle,
  Shield,
  User,
  Settings,
  LogOut,
  DollarSign,
  FileCodeIcon as FileContract,
  FileText,
} from "lucide-react"

import { ProjectSelector } from "./project-selector"
import { CurrentProject } from "./current-project"
import { ModuleContent } from "./module-content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Dashboard() {
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState("gantt")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-semibold">Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Help
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john.doe@abcconstruction.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          {/* Current Project Section */}
          <div className="p-4">
            <CurrentProject />
          </div>

          {/* Project Selector Section */}
          <div className="px-4 pb-4">
            <Card className="overflow-hidden">
              <div
                className="flex cursor-pointer items-center justify-between border-b p-3"
                onClick={() => setIsProjectSelectorOpen(!isProjectSelectorOpen)}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Switch Project</span>
                </div>
                {isProjectSelectorOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              {isProjectSelectorOpen && <ProjectSelector />}
            </Card>
          </div>

          {/* Quick Access Section */}
          <div className="flex-1 p-4">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">Quick Access</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Link href="/admin/roles">
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Roles
                </Button>
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <Tabs defaultValue="gantt" value={selectedModule} onValueChange={setSelectedModule}>
            <div className="border-b bg-background">
              <div className="container py-2">
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="gantt">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>GANTT</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="phases">
                    <div className="flex items-center">
                      <FolderClosed className="mr-2 h-4 w-4" />
                      <span>Phases</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Documents</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="scheduling">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Scheduling</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="rfis">
                    <div className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>RFIs</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="subcontracts">
                    <div className="flex items-center">
                      <FileContract className="mr-2 h-4 w-4" />
                      <span>Subcontracts</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="financials">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span>Financials</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="directory">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Directory</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="container py-6">
              <TabsContent value="gantt" className="m-0">
                <ModuleContent module="GANTT" />
              </TabsContent>
              <TabsContent value="phases" className="m-0">
                <ModuleContent module="Phases" />
              </TabsContent>
              <TabsContent value="documents" className="m-0">
                <ModuleContent module="Documents" />
              </TabsContent>
              <TabsContent value="scheduling" className="m-0">
                <ModuleContent module="Scheduling" />
              </TabsContent>
              <TabsContent value="rfis" className="m-0">
                <ModuleContent module="RFIs" />
              </TabsContent>
              <TabsContent value="subcontracts" className="m-0">
                <ModuleContent module="Subcontracts" />
              </TabsContent>
              <TabsContent value="financials" className="m-0">
                <ModuleContent module="Financials" />
              </TabsContent>
              <TabsContent value="directory" className="m-0">
                <ModuleContent module="Directory" />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
