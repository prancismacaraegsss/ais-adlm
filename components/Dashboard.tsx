import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Settings,
  User,
  Users,
  BookOpen,
  FileText,
  Search,
} from "lucide-react";
import GradeTable from "./GradeTable";
import ExportOptions from "./ExportOptions";
import SpreadsheetView from "./SpreadsheetView";
import QuarterlyGradeView from "./QuarterlyGradeView";
import StudentProfileCard from "./StudentProfileCard";
import StudentPhotoUpload from "./StudentPhotoUpload";
import StudentSearch from "./StudentSearch";

interface DashboardProps {
  userRole?: "student" | "admin";
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const Dashboard = ({
  userRole = "student",
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  onLogout = () => console.log("Logout clicked"),
}: DashboardProps) => {
  // Get username from localStorage
  const username = localStorage.getItem("username") || userName;

  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<
    "table" | "spreadsheet" | "quarterly"
  >("table");
  const [activeGradeLevel, setActiveGradeLevel] = useState("7");

  // Mock student data for profile view
  const mockStudentData = {
    "1": {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      parentEmail: "parent.doe@example.com",
      parentPhone: "555-123-4567",
      address: "123 School St, Education City, 12345",
      guardianName: "Jane Doe",
      gradeLevel: "7",
      section: "A",
      photoUrl: "",
      attendance: {
        present: 45,
        absent: 2,
        late: 3,
      },
    },
  };

  // State for student photos
  const [studentPhotos, setStudentPhotos] = useState<Record<string, string>>(
    {},
  );

  // State for selected student
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudentData, setSelectedStudentData] = useState<any>(null);

  // Handle student selection
  const handleViewStudent = (studentId: string) => {
    setSelectedStudent(studentId);
    const studentData =
      mockStudentData[studentId as keyof typeof mockStudentData] || null;
    if (studentData && studentPhotos[studentId]) {
      studentData.photoUrl = studentPhotos[studentId];
    }
    setSelectedStudentData(studentData);
    setActiveTab("student-profile");
  };

  // Handle student edit
  const handleEditStudent = (studentId: string) => {
    setSelectedStudent(studentId);
    const studentData =
      mockStudentData[studentId as keyof typeof mockStudentData] || null;
    if (studentData && studentPhotos[studentId]) {
      studentData.photoUrl = studentPhotos[studentId];
    }
    setSelectedStudentData(studentData);
    setActiveTab("student-profile");
  };

  // Handle student photo update
  const handlePhotoUpdate = (studentId: string, photoUrl: string) => {
    setStudentPhotos((prev) => ({
      ...prev,
      [studentId]: photoUrl,
    }));

    if (selectedStudentData && selectedStudentData.id === studentId) {
      setSelectedStudentData({
        ...selectedStudentData,
        photoUrl: photoUrl,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-red-600 bg-background p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold">
              Alternative Delivery Mode Grade System
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                  alt={userName}
                />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-muted-foreground">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-background border border-red-600">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="grades"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Grades
              </TabsTrigger>
              <TabsTrigger
                value="export"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Export
              </TabsTrigger>
              {userRole === "admin" && (
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              )}
            </TabsList>

            {userRole === "admin" && activeTab === "grades" && (
              <div className="flex space-x-2">
                <TabsList className="bg-background border border-red-600">
                  {["7", "8", "9", "10"].map((level) => (
                    <TabsTrigger
                      key={level}
                      value={level}
                      onClick={() => setActiveGradeLevel(level)}
                      className={`${activeGradeLevel === level ? "bg-red-600 text-white" : ""}`}
                    >
                      Grade {level}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            )}
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-red-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                        alt={userName}
                      />
                      <AvatarFallback>
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-medium">{username}</h3>
                      <p className="text-sm text-muted-foreground">
                        {userEmail}
                      </p>
                      <p className="text-xs mt-1 bg-red-600 text-white px-2 py-0.5 rounded-full inline-block">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-600 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {userRole === "student" ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Overall Average:</span>
                        <span className="font-bold text-lg">88.5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-sm">
                          Passing
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Subjects Passed:</span>
                        <span>8/8</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <Users className="h-8 w-8 text-red-500 mb-2" />
                        <span className="text-2xl font-bold">248</span>
                        <span className="text-sm text-muted-foreground">
                          Total Students
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <FileText className="h-8 w-8 text-red-500 mb-2" />
                        <span className="text-2xl font-bold">1,984</span>
                        <span className="text-sm text-muted-foreground">
                          Total Grades
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {userRole === "student" && (
                <Card className="border-red-600 md:col-span-3 mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Find Your Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search your name to find your grades..."
                        className="pl-8"
                        onChange={(e) => {
                          if (
                            e.target.value
                              .toLowerCase()
                              .includes(username.toLowerCase())
                          ) {
                            setActiveTab("grades");
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="grades">
            {userRole === "admin" && (
              <div className="mb-6">
                <StudentSearch
                  onViewStudent={handleViewStudent}
                  onEditStudent={handleEditStudent}
                  isAdmin={true}
                />
              </div>
            )}

            <div className="mb-4 flex justify-end">
              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as "table" | "spreadsheet")}
                className="w-auto"
              >
                <TabsList className="bg-background border border-red-600">
                  <TabsTrigger
                    value="table"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    Table View
                  </TabsTrigger>
                  <TabsTrigger
                    value="spreadsheet"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    Spreadsheet View
                  </TabsTrigger>
                  <TabsTrigger
                    value="quarterly"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    Quarterly View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {viewMode === "table" ? (
              <Card className="border-red-600">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {userRole === "student"
                      ? "My Grades"
                      : `Grade ${activeGradeLevel} Students`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GradeTable
                    isAdmin={userRole === "admin"}
                    studentId={
                      userRole === "student"
                        ? localStorage.getItem("studentId") || "1"
                        : ""
                    }
                  />
                </CardContent>
              </Card>
            ) : viewMode === "spreadsheet" ? (
              <SpreadsheetView
                isAdmin={userRole === "admin"}
                studentId={
                  userRole === "student"
                    ? localStorage.getItem("studentId") || "1"
                    : ""
                }
              />
            ) : (
              <QuarterlyGradeView
                studentId={
                  userRole === "student"
                    ? localStorage.getItem("studentId") || "1"
                    : "1"
                }
                studentName={userName}
              />
            )}
          </TabsContent>

          <TabsContent value="student-profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedStudentData && (
                <>
                  <StudentProfileCard
                    student={selectedStudentData}
                    onEdit={handleEditStudent}
                    isAdmin={userRole === "admin"}
                  />
                  {userRole === "admin" && (
                    <StudentPhotoUpload
                      studentId={selectedStudent || ""}
                      studentName={selectedStudentData?.name || ""}
                      currentPhoto={selectedStudentData?.photoUrl}
                      onPhotoUpdate={handlePhotoUpdate}
                    />
                  )}
                </>
              )}
              <QuarterlyGradeView
                studentId={selectedStudent}
                studentName={selectedStudentData?.name || "Student"}
              />
            </div>
          </TabsContent>

          <TabsContent value="export">
            <Card className="border-red-600">
              <CardHeader className="pb-2">
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ExportOptions userRole={userRole} />
              </CardContent>
            </Card>
          </TabsContent>

          {userRole === "admin" && (
            <TabsContent value="settings">
              <Card className="border-red-600">
                <CardHeader className="pb-2">
                  <CardTitle>Admin Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <User className="mr-2 h-4 w-4" />
                        Manage Users
                      </Button>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-600 py-4 bg-background">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Alternative Delivery Mode Grade System © 2023</p>
          <p className="text-xs mt-1">
            Created by Francis Jon Andya, John Carlo Lobendino, Jeremy
            Lobendino, Jerwin Andaya, Carl John Benjay Siababa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
