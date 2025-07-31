"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
  FileImage,
  FileSpreadsheet,
  Download,
  Eye,
  Search,
  Upload,
  Plus,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample document structure
const documentStructure = {
  internal: {
    name: "Internal",
    type: "folder",
    children: {
      "phase-1-site-preparation": {
        name: "Phase 1: Site Preparation & Foundation",
        type: "folder",
        children: {
          "foundation-masters-llc": {
            name: "Foundation Masters LLC",
            type: "folder",
            children: {
              "contract-pc-2024-001.pdf": {
                name: "Contract PC-2024-001.pdf",
                type: "file",
                size: "2.4 MB",
                modified: "2024-01-15",
                fileType: "pdf",
              },
              "site-survey-report.pdf": {
                name: "Site Survey Report.pdf",
                type: "file",
                size: "1.8 MB",
                modified: "2024-01-20",
                fileType: "pdf",
              },
              "foundation-drawings.dwg": {
                name: "Foundation Drawings.dwg",
                type: "file",
                size: "5.2 MB",
                modified: "2024-01-25",
                fileType: "dwg",
              },
            },
          },
          "project-documents": {
            name: "Project Documents",
            type: "folder",
            children: {
              "permits-approvals.pdf": {
                name: "Permits & Approvals.pdf",
                type: "file",
                size: "3.1 MB",
                modified: "2024-01-18",
                fileType: "pdf",
              },
              "environmental-report.pdf": {
                name: "Environmental Report.pdf",
                type: "file",
                size: "4.7 MB",
                modified: "2024-01-22",
                fileType: "pdf",
              },
            },
          },
        },
      },
      "phase-2-structure-envelope": {
        name: "Phase 2: Structure & Envelope",
        type: "folder",
        children: {
          "steel-frame-construction": {
            name: "Steel & Frame Construction",
            type: "folder",
            children: {
              "structural-steel-contract.pdf": {
                name: "Structural Steel Contract.pdf",
                type: "file",
                size: "2.8 MB",
                modified: "2024-03-15",
                fileType: "pdf",
              },
              "steel-shop-drawings.pdf": {
                name: "Steel Shop Drawings.pdf",
                type: "file",
                size: "8.4 MB",
                modified: "2024-03-20",
                fileType: "pdf",
              },
            },
          },
        },
      },
    },
  },
  share: {
    name: "Share",
    type: "folder",
    children: {
      "by-subcontractor": {
        name: "By Subcontractor",
        type: "folder",
        children: {
          "foundation-masters-llc": {
            name: "Foundation Masters LLC",
            type: "folder",
            children: {
              "daily-reports": {
                name: "Daily Reports",
                type: "folder",
                children: {
                  "daily-report-2024-01-15.pdf": {
                    name: "Daily Report 2024-01-15.pdf",
                    type: "file",
                    size: "0.8 MB",
                    modified: "2024-01-15",
                    fileType: "pdf",
                  },
                  "daily-report-2024-01-16.pdf": {
                    name: "Daily Report 2024-01-16.pdf",
                    type: "file",
                    size: "0.9 MB",
                    modified: "2024-01-16",
                    fileType: "pdf",
                  },
                },
              },
              "progress-photos": {
                name: "Progress Photos",
                type: "folder",
                children: {
                  "foundation-pour-01.jpg": {
                    name: "Foundation Pour 01.jpg",
                    type: "file",
                    size: "2.1 MB",
                    modified: "2024-02-20",
                    fileType: "image",
                  },
                  "foundation-pour-02.jpg": {
                    name: "Foundation Pour 02.jpg",
                    type: "file",
                    size: "1.9 MB",
                    modified: "2024-02-20",
                    fileType: "image",
                  },
                },
              },
            },
          },
          "steel-frame-construction": {
            name: "Steel & Frame Construction",
            type: "folder",
            children: {
              "material-certifications": {
                name: "Material Certifications",
                type: "folder",
                children: {
                  "steel-mill-certs.pdf": {
                    name: "Steel Mill Certificates.pdf",
                    type: "file",
                    size: "3.2 MB",
                    modified: "2024-03-25",
                    fileType: "pdf",
                  },
                },
              },
            },
          },
        },
      },
      "by-phase": {
        name: "By Phase",
        type: "folder",
        children: {
          "phase-1-shared": {
            name: "Phase 1: Site Preparation",
            type: "folder",
            children: {
              "client-submissions": {
                name: "Client Submissions",
                type: "folder",
                children: {
                  "phase-1-completion-report.pdf": {
                    name: "Phase 1 Completion Report.pdf",
                    type: "file",
                    size: "4.5 MB",
                    modified: "2024-03-28",
                    fileType: "pdf",
                  },
                },
              },
            },
          },
          "phase-2-shared": {
            name: "Phase 2: Structure & Envelope",
            type: "folder",
            children: {
              "progress-updates": {
                name: "Progress Updates",
                type: "folder",
                children: {
                  "weekly-progress-report.xlsx": {
                    name: "Weekly Progress Report.xlsx",
                    type: "file",
                    size: "1.2 MB",
                    modified: "2024-04-01",
                    fileType: "spreadsheet",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

type DocumentNode = {
  name: string
  type: "file" | "folder"
  size?: string
  modified?: string
  fileType?: string
  children?: Record<string, DocumentNode>
}

interface FolderTreeProps {
  node: DocumentNode
  path: string
  level: number
  expandedFolders: Set<string>
  onToggleFolder: (path: string) => void
  onSelectFile: (path: string, file: DocumentNode) => void
}

function FolderTree({ node, path, level, expandedFolders, onToggleFolder, onSelectFile }: FolderTreeProps) {
  const isExpanded = expandedFolders.has(path)
  const indent = level * 20

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case "image":
        return <FileImage className="h-4 w-4 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "pdf":
      default:
        return <FileText className="h-4 w-4 text-red-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (node.type === "file") {
    return (
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer group"
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={() => onSelectFile(path, node)}
      >
        {getFileIcon(node.fileType)}
        <span className="flex-1 text-sm">{node.name}</span>
        <span className="text-xs text-muted-foreground">{node.size}</span>
        <span className="text-xs text-muted-foreground">{node.modified && formatDate(node.modified)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => onToggleFolder(path)}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        {isExpanded ? <FolderOpen className="h-4 w-4 text-blue-500" /> : <Folder className="h-4 w-4 text-blue-500" />}
        <span className="flex-1 text-sm font-medium">{node.name}</span>
        {node.children && (
          <Badge variant="outline" className="text-xs">
            {Object.keys(node.children).length}
          </Badge>
        )}
      </div>
      {isExpanded && node.children && (
        <div>
          {Object.entries(node.children).map(([key, childNode]) => (
            <FolderTree
              key={key}
              node={childNode}
              path={`${path}/${key}`}
              level={level + 1}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function DocumentViewer() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["internal", "share"]))
  const [selectedFile, setSelectedFile] = useState<{ path: string; file: DocumentNode } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const handleSelectFile = (path: string, file: DocumentNode) => {
    setSelectedFile({ path, file })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Project Documents
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* File Tree */}
            <div className="lg:col-span-2">
              <div className="border rounded-lg p-4 bg-muted/20 max-h-[600px] overflow-auto">
                <div className="space-y-1">
                  {Object.entries(documentStructure).map(([key, node]) => (
                    <FolderTree
                      key={key}
                      node={node}
                      path={key}
                      level={0}
                      expandedFolders={expandedFolders}
                      onToggleFolder={handleToggleFolder}
                      onSelectFile={handleSelectFile}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* File Preview/Details */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4 bg-muted/20 min-h-[400px]">
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">{selectedFile.file.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{selectedFile.file.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modified:</span>
                        <span>
                          {selectedFile.file.modified &&
                            new Date(selectedFile.file.modified).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="capitalize">{selectedFile.file.fileType || "Document"}</span>
                      </div>
                    </div>
                    <div className="pt-4 space-y-2">
                      <Button className="w-full" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">File Path</h4>
                      <p className="text-xs text-muted-foreground break-all">{selectedFile.path}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4" />
                    <p className="text-sm">Select a file to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across all phases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156 MB</div>
            <p className="text-xs text-muted-foreground">Of 5 GB available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shared Folders</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active collaborations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
