import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Search, Filter, UserPlus, Edit, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Student {
  id: string;
  name: string;
  email: string;
  parentEmail: string;
  gradeLevel: string;
  section: string;
  status: "active" | "inactive";
  average: number;
  remarks: "passed" | "failed" | "incomplete";
}

interface StudentSearchProps {
  onViewStudent?: (studentId: string) => void;
  onEditStudent?: (studentId: string) => void;
  isAdmin?: boolean;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  onViewStudent = () => {},
  onEditStudent = () => {},
  isAdmin = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [remarksFilter, setRemarksFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock student data
  const students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      parentEmail: "parent.doe@example.com",
      gradeLevel: "7",
      section: "A",
      status: "active",
      average: 88.5,
      remarks: "passed",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      parentEmail: "parent.smith@example.com",
      gradeLevel: "7",
      section: "B",
      status: "active",
      average: 92.3,
      remarks: "passed",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      parentEmail: "parent.johnson@example.com",
      gradeLevel: "8",
      section: "A",
      status: "active",
      average: 78.6,
      remarks: "passed",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      parentEmail: "parent.davis@example.com",
      gradeLevel: "9",
      section: "C",
      status: "inactive",
      average: 65.2,
      remarks: "failed",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      parentEmail: "parent.wilson@example.com",
      gradeLevel: "10",
      section: "A",
      status: "active",
      average: 90.8,
      remarks: "passed",
    },
    {
      id: "6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      parentEmail: "parent.brown@example.com",
      gradeLevel: "8",
      section: "B",
      status: "active",
      average: 85.4,
      remarks: "passed",
    },
    {
      id: "7",
      name: "David Garcia",
      email: "david.garcia@example.com",
      parentEmail: "parent.garcia@example.com",
      gradeLevel: "9",
      section: "A",
      status: "active",
      average: 72.1,
      remarks: "incomplete",
    },
    {
      id: "8",
      name: "Lisa Martinez",
      email: "lisa.martinez@example.com",
      parentEmail: "parent.martinez@example.com",
      gradeLevel: "10",
      section: "B",
      status: "inactive",
      average: 68.9,
      remarks: "failed",
    },
  ];

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    // Search term filter
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Grade level filter
    const matchesGrade =
      gradeFilter === "all" || student.gradeLevel === gradeFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    // Remarks filter
    const matchesRemarks =
      remarksFilter === "all" || student.remarks === remarksFilter;

    return matchesSearch && matchesGrade && matchesStatus && matchesRemarks;
  });

  const getRemarksBadgeColor = (remarks: string) => {
    switch (remarks) {
      case "passed":
        return "bg-green-600";
      case "failed":
        return "bg-red-600";
      case "incomplete":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Student Directory</span>
          {isAdmin && (
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student's information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Enter student name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        placeholder="Enter student email"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="parentEmail"
                      className="text-sm font-medium"
                    >
                      Parent Email
                    </label>
                    <Input
                      id="parentEmail"
                      placeholder="Enter parent email"
                      type="email"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="gradeLevel"
                        className="text-sm font-medium"
                      >
                        Grade Level
                      </label>
                      <Select>
                        <SelectTrigger id="gradeLevel">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="section" className="text-sm font-medium">
                        Section
                      </label>
                      <Select>
                        <SelectTrigger id="section">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // In a real app, this would add the student to the database
                      alert("Student added successfully!");
                      setShowAddDialog(false);
                    }}
                  >
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 border rounded-md bg-muted/20">
              <div>
                <label className="text-xs font-medium mb-1 block">
                  Grade Level
                </label>
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All Grades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">
                  Remarks
                </label>
                <Select value={remarksFilter} onValueChange={setRemarksFilter}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="All Remarks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Remarks</SelectItem>
                    <SelectItem value="passed">Passed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2 text-xs font-medium">Name</th>
                    <th className="text-left p-2 text-xs font-medium">Email</th>
                    <th className="text-left p-2 text-xs font-medium">Grade</th>
                    <th className="text-left p-2 text-xs font-medium">
                      Average
                    </th>
                    <th className="text-left p-2 text-xs font-medium">
                      Status
                    </th>
                    <th className="text-left p-2 text-xs font-medium">
                      Remarks
                    </th>
                    <th className="text-right p-2 text-xs font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-muted/30">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 text-sm">{student.email}</td>
                        <td className="p-2 text-sm">
                          {student.gradeLevel}-{student.section}
                        </td>
                        <td className="p-2 text-sm font-medium">
                          {student.average.toFixed(1)}
                        </td>
                        <td className="p-2">
                          <Badge
                            variant={
                              student.status === "active"
                                ? "default"
                                : "outline"
                            }
                            className={
                              student.status === "active" ? "bg-green-600" : ""
                            }
                          >
                            {student.status.charAt(0).toUpperCase() +
                              student.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge
                            className={getRemarksBadgeColor(student.remarks)}
                          >
                            {student.remarks.charAt(0).toUpperCase() +
                              student.remarks.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onViewStudent(student.id)}
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onEditStudent(student.id)}
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-4 text-center text-muted-foreground"
                      >
                        No students found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSearch;
