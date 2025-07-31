"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Send,
  Paperclip,
  Edit,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface RFIDetailsProps {
  rfi: {
    id: number
    number: string
    subject: string
    description: string
    status: string
    priority: string
    submittedBy: string
    submittedDate: string
    assignedTo: string
    dueDate: string
    responseDate?: string
    phase: string
    location: string
    trade: string
    messages: Array<{
      id: number
      sender: string
      senderRole: string
      message: string
      timestamp: string
      attachments?: string[]
    }>
  }
  onBack: () => void
}

export function RFIDetails({ rfi, onBack }: RFIDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isChatExpanded, setIsChatExpanded] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [editedRFI, setEditedRFI] = useState({
    subject: rfi.subject,
    description: rfi.description,
    status: rfi.status,
    priority: rfi.priority,
    assignedTo: rfi.assignedTo,
    dueDate: rfi.dueDate,
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "answered":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
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
      case "answered":
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && !["closed", "answered"].includes(status.toLowerCase())
  }

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving RFI changes:", editedRFI)
    setIsEditing(false)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to RFIs
          </Button>
          <div>
            <h1 className="text-2xl font-bold">#{rfi.number}</h1>
            <p className="text-muted-foreground">
              {rfi.phase} • {rfi.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">{getStatusIcon(rfi.status)}</div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={`${getStatusColor(rfi.status)} text-xs mt-1`}>
                  {rfi.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priority</p>
                <Badge className={`${getPriorityColor(rfi.priority)} text-xs mt-1`}>{rfi.priority.toUpperCase()}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className={`text-sm font-medium mt-1 ${isOverdue(rfi.dueDate, rfi.status) ? "text-red-600" : ""}`}>
                  {formatDate(rfi.dueDate)}
                  {isOverdue(rfi.dueDate, rfi.status) && " (Overdue)"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages</p>
                <p className="text-sm font-medium mt-1">{rfi.messages.length} total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RFI Details */}
      <Card>
        <CardHeader>
          <CardTitle>RFI Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                {isEditing ? (
                  <Input
                    id="subject"
                    value={editedRFI.subject}
                    onChange={(e) => setEditedRFI({ ...editedRFI, subject: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm mt-1">{rfi.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={editedRFI.status}
                    onValueChange={(value) => setEditedRFI({ ...editedRFI, status: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="answered">Answered</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">
                    <Badge className={`${getStatusColor(rfi.status)} text-xs`}>
                      {rfi.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                {isEditing ? (
                  <Select
                    value={editedRFI.priority}
                    onValueChange={(value) => setEditedRFI({ ...editedRFI, priority: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">
                    <Badge className={`${getPriorityColor(rfi.priority)} text-xs`}>{rfi.priority.toUpperCase()}</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Submitted By</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{rfi.submittedBy}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                {isEditing ? (
                  <Input
                    id="assignedTo"
                    value={editedRFI.assignedTo}
                    onChange={(e) => setEditedRFI({ ...editedRFI, assignedTo: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{rfi.assignedTo}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                {isEditing ? (
                  <Input
                    id="dueDate"
                    type="date"
                    value={editedRFI.dueDate}
                    onChange={(e) => setEditedRFI({ ...editedRFI, dueDate: e.target.value })}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm ${isOverdue(rfi.dueDate, rfi.status) ? "text-red-600 font-medium" : ""}`}>
                      {formatDate(rfi.dueDate)}
                      {isOverdue(rfi.dueDate, rfi.status) && " (Overdue)"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={editedRFI.description}
                onChange={(e) => setEditedRFI({ ...editedRFI, description: e.target.value })}
                className="mt-1"
                rows={4}
              />
            ) : (
              <p className="text-sm mt-1 text-muted-foreground">{rfi.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phase</p>
                <p className="text-sm font-medium">{rfi.phase}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{rfi.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Trade</p>
                <p className="text-sm font-medium">{rfi.trade}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversation ({rfi.messages.length})
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsChatExpanded(!isChatExpanded)}>
              {isChatExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {isChatExpanded && (
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rfi.messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.senderRole}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDateTime(message.timestamp)}</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm">{message.message}</p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Paperclip className="h-3 w-3" />
                          <span>
                            {message.attachments.length} attachment(s): {message.attachments.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* New Message */}
            <div className="space-y-3">
              <Label htmlFor="newMessage">Add Response</Label>
              <Textarea
                id="newMessage"
                placeholder="Type your response here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
