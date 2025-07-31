"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, MapPin, Calendar, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

interface PhaseEditPageProps {
  params: {
    id: string
  }
}

// Sample phase data (would be fetched from API)
const initialPhaseData = {
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
  coordinatesLong: -74.006,
  coordinatesLat: 40.7128,
  locked: false,
  primeContract: {
    id: 1,
    contractNumber: "PC-2024-001",
    contractor: "Foundation Masters LLC",
    value: 850000,
  },
  phaseDivisions: [
    { id: 1, division: "01", name: "General Requirements", selected: true },
    { id: 2, division: "02", name: "Existing Conditions", selected: true },
    { id: 3, division: "03", name: "Concrete", selected: true },
  ],
}

// All available CSI divisions
const allCSIDivisions = [
  { division: "01", name: "General Requirements" },
  { division: "02", name: "Existing Conditions" },
  { division: "03", name: "Concrete" },
  { division: "04", name: "Masonry" },
  { division: "05", name: "Metals" },
  { division: "06", name: "Wood, Plastics & Composites" },
  { division: "07", name: "Thermal & Moisture Protection" },
  { division: "08", name: "Openings" },
  { division: "09", name: "Finishes" },
  { division: "10", name: "Specialties" },
  { division: "11", name: "Equipment" },
  { division: "12", name: "Furnishings" },
  { division: "13", name: "Special Construction" },
  { division: "14", name: "Conveying Equipment" },
  { division: "15", name: "Mechanical" },
  { division: "16", name: "Electrical" },
  { division: "21", name: "Fire Suppression" },
  { division: "22", name: "Plumbing" },
  { division: "23", name: "HVAC" },
  { division: "25", name: "Integrated Automation" },
  { division: "26", name: "Electrical" },
  { division: "27", name: "Communications" },
  { division: "28", name: "Electronic Safety & Security" },
  { division: "31", name: "Earthwork" },
  { division: "32", name: "Exterior Improvements" },
  { division: "33", name: "Utilities" },
  { division: "34", name: "Transportation" },
  { division: "35", name: "Waterway & Marine Construction" },
]

export default function PhaseEditPage({ params }: PhaseEditPageProps) {
  const [phaseData, setPhaseData] = useState(initialPhaseData)
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(
    initialPhaseData.phaseDivisions.map((d) => d.division),
  )

  const handleSave = () => {
    // Handle phase update
    toast({
      title: "Phase updated",
      description: "Phase information has been successfully updated.",
    })
  }

  const handleDivisionToggle = (division: string, checked: boolean) => {
    if (checked) {
      setSelectedDivisions([...selectedDivisions, division])
    } else {
      setSelectedDivisions(selectedDivisions.filter((d) => d !== division))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to phases</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Edit Phase</h1>
            <p className="text-sm text-muted-foreground">{phaseData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="container max-w-6xl py-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="timeline">Timeline & Budget</TabsTrigger>
            <TabsTrigger value="divisions">CSI Divisions</TabsTrigger>
            <TabsTrigger value="contract">Prime Contract</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Phase Name</Label>
                    <Input
                      id="name"
                      value={phaseData.name}
                      onChange={(e) => setPhaseData({ ...phaseData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={phaseData.status}
                      onValueChange={(value) => setPhaseData({ ...phaseData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLANNED">Planned</SelectItem>
                        <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="ON_HOLD">On Hold</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={phaseData.description}
                    onChange={(e) => setPhaseData({ ...phaseData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plannedStart">Planned Start Date</Label>
                      <Input
                        id="plannedStart"
                        type="date"
                        value={formatDate(phaseData.plannedStart)}
                        onChange={(e) => setPhaseData({ ...phaseData, plannedStart: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plannedEnd">Planned End Date</Label>
                      <Input
                        id="plannedEnd"
                        type="date"
                        value={formatDate(phaseData.plannedEnd)}
                        onChange={(e) => setPhaseData({ ...phaseData, plannedEnd: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="actualStart">Actual Start Date</Label>
                      <Input
                        id="actualStart"
                        type="date"
                        value={phaseData.actualStart ? formatDate(phaseData.actualStart) : ""}
                        onChange={(e) => setPhaseData({ ...phaseData, actualStart: e.target.value || null })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualEnd">Actual End Date</Label>
                      <Input
                        id="actualEnd"
                        type="date"
                        value={phaseData.actualEnd ? formatDate(phaseData.actualEnd) : ""}
                        onChange={(e) => setPhaseData({ ...phaseData, actualEnd: e.target.value || null })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Phase Budget</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={phaseData.budget}
                        onChange={(e) => setPhaseData({ ...phaseData, budget: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={phaseData.currency}
                        onValueChange={(value) => setPhaseData({ ...phaseData, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="divisions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CSI Divisions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the Construction Specification Institute (CSI) divisions that apply to this phase.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {allCSIDivisions.map((division) => (
                    <div key={division.division} className="flex items-center space-x-2 p-2 border rounded">
                      <Checkbox
                        id={`division-${division.division}`}
                        checked={selectedDivisions.includes(division.division)}
                        onCheckedChange={(checked) => handleDivisionToggle(division.division, checked as boolean)}
                      />
                      <Label htmlFor={`division-${division.division}`} className="flex-1 text-sm cursor-pointer">
                        <Badge variant="outline" className="mr-2">
                          {division.division}
                        </Badge>
                        {division.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-2">Selected Divisions ({selectedDivisions.length})</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedDivisions.map((divisionCode) => {
                      const division = allCSIDivisions.find((d) => d.division === divisionCode)
                      return (
                        <Badge key={divisionCode} variant="default" className="text-xs">
                          {divisionCode} - {division?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contract" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prime Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contractNumber">Contract Number</Label>
                    <Input
                      id="contractNumber"
                      value={phaseData.primeContract.contractNumber}
                      onChange={(e) =>
                        setPhaseData({
                          ...phaseData,
                          primeContract: { ...phaseData.primeContract, contractNumber: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contractor">Prime Contractor</Label>
                    <Input
                      id="contractor"
                      value={phaseData.primeContract.contractor}
                      onChange={(e) =>
                        setPhaseData({
                          ...phaseData,
                          primeContract: { ...phaseData.primeContract, contractor: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractValue">Contract Value</Label>
                  <Input
                    id="contractValue"
                    type="number"
                    value={phaseData.primeContract.value}
                    onChange={(e) =>
                      setPhaseData({
                        ...phaseData,
                        primeContract: { ...phaseData.primeContract, value: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="locationStreet">Street Address</Label>
                  <Input
                    id="locationStreet"
                    value={phaseData.locationStreet}
                    onChange={(e) => setPhaseData({ ...phaseData, locationStreet: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationRegion">City, State/Region</Label>
                  <Input
                    id="locationRegion"
                    value={phaseData.locationRegion}
                    onChange={(e) => setPhaseData({ ...phaseData, locationRegion: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="coordinatesLat">Latitude</Label>
                    <Input
                      id="coordinatesLat"
                      type="number"
                      step="any"
                      value={phaseData.coordinatesLat}
                      onChange={(e) => setPhaseData({ ...phaseData, coordinatesLat: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coordinatesLong">Longitude</Label>
                    <Input
                      id="coordinatesLong"
                      type="number"
                      step="any"
                      value={phaseData.coordinatesLong}
                      onChange={(e) => setPhaseData({ ...phaseData, coordinatesLong: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
