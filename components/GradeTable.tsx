import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/alert-dialog";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Send,
  Download,
  Filter,
} from "lucide-react";

interface Grade {
  id: string;
  studentName: string;
  studentEmail: string;
  parentEmail: string;
  math: number;
  english: number;
  filipino: number;
  tle: number;
  science: number;
  mapeh: number;
  esp: number;
  ap: number;
  average: number;
  status: "pass" | "fail";
  aldmStatus: string;
}

interface GradeTableProps {
  isAdmin?: boolean;
  studentId?: string;
}

const GradeTable: React.FC<GradeTableProps> = ({
  isAdmin = false,
  studentId = "",
}) => {
  const [activeTab, setActiveTab] = useState("grade7");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<Grade | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  const mockGrades: Record<string, Grade[]> = {
    grade7: [
      {
        id: "1",
        studentName: "John Doe",
        studentEmail: "john.doe@example.com",
        parentEmail: "parent.doe@example.com",
        math: 85,
        english: 90,
        filipino: 88,
        tle: 92,
        science: 87,
        mapeh: 94,
        esp: 89,
        ap: 91,
        average: 89.5,
        status: "pass",
        aldmStatus: "Active",
      },
      {
        id: "2",
        studentName: "Jane Smith",
        studentEmail: "jane.smith@example.com",
        parentEmail: "parent.smith@example.com",
        math: 78,
        english: 82,
        filipino: 80,
        tle: 85,
        science: 79,
        mapeh: 88,
        esp: 81,
        ap: 83,
        average: 82,
        status: "pass",
        aldmStatus: "Active",
      },
    ],
    grade8: [
      {
        id: "3",
        studentName: "Robert Johnson",
        studentEmail: "robert.johnson@example.com",
        parentEmail: "parent.johnson@example.com",
        math: 92,
        english: 88,
        filipino: 90,
        tle: 94,
        science: 91,
        mapeh: 89,
        esp: 93,
        ap: 87,
        average: 90.5,
        status: "pass",
        aldmStatus: "Active",
      },
    ],
    grade9: [
      {
        id: "4",
        studentName: "Emily Davis",
        studentEmail: "emily.davis@example.com",
        parentEmail: "parent.davis@example.com",
        math: 65,
        english: 70,
        filipino: 68,
        tle: 72,
        science: 67,
        mapeh: 74,
        esp: 69,
        ap: 71,
        average: 69.5,
        status: "fail",
        aldmStatus: "Inactive",
      },
    ],
    grade10: [
      {
        id: "5",
        studentName: "Michael Wilson",
        studentEmail: "michael.wilson@example.com",
        parentEmail: "parent.wilson@example.com",
        math: 88,
        english: 92,
        filipino: 90,
        tle: 94,
        science: 89,
        mapeh: 91,
        esp: 93,
        ap: 87,
        average: 90.5,
        status: "pass",
        aldmStatus: "Active",
      },
    ],
  };

  // Filter grades based on search term
  const filteredGrades = mockGrades[activeTab].filter(
    (grade) =>
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // For student view, filter to only show the student's grades
  const studentGrades = isAdmin
    ? filteredGrades
    : filteredGrades.filter((grade) => grade.id === studentId);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedStudents([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredGrades.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredGrades.map((grade) => grade.id));
    }
  };

  const handleAddGrade = () => {
    setIsEditing(false);
    setCurrentGrade(null);
    setShowAddEditDialog(true);
  };

  const handleEditGrade = (grade: Grade) => {
    setIsEditing(true);
    setCurrentGrade(grade);
    setShowAddEditDialog(true);
  };

  const handleDeleteGrade = (id: string) => {
    // In a real app, this would call an API to delete the grade
    console.log(`Deleting grade with ID: ${id}`);
  };

  const handleSendReports = () => {
    // In a real app, this would call an API to send reports
    console.log(`Sending reports to students: ${selectedStudents.join(", ")}`);
  };

  const calculateStatusClass = (status: string) => {
    return status === "pass" ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isAdmin ? "Student Grades Management" : "My Grades"}
        </CardTitle>
        <CardDescription>
          {isAdmin
            ? "Manage student grades across different grade levels"
            : "View your academic performance across all subjects"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAdmin ? (
          <Tabs
            defaultValue="grade7"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <TabsList className="mb-2 sm:mb-0">
                <TabsTrigger value="grade7">Grade 7</TabsTrigger>
                <TabsTrigger value="grade8">Grade 8</TabsTrigger>
                <TabsTrigger value="grade9">Grade 9</TabsTrigger>
                <TabsTrigger value="grade10">Grade 10</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-8"
                  />
                </div>

                <Button
                  onClick={handleAddGrade}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Student
                </Button>
              </div>
            </div>

            {Object.keys(mockGrades).map((gradeLevel) => (
              <TabsContent key={gradeLevel} value={gradeLevel} className="mt-0">
                <div className="rounded-md border">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="select-all"
                        checked={
                          selectedStudents.length === filteredGrades.length &&
                          filteredGrades.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                      <label
                        htmlFor="select-all"
                        className="text-sm font-medium"
                      >
                        Select All
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedStudents.length === 0}
                        onClick={handleSendReports}
                      >
                        <Send className="mr-2 h-4 w-4" /> Send Reports
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedStudents.length === 0}
                      >
                        <Download className="mr-2 h-4 w-4" /> Export
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Student Email</TableHead>
                          <TableHead>Math</TableHead>
                          <TableHead>English</TableHead>
                          <TableHead>Filipino</TableHead>
                          <TableHead>TLE</TableHead>
                          <TableHead>Science</TableHead>
                          <TableHead>MAPEH</TableHead>
                          <TableHead>ESP</TableHead>
                          <TableHead>AP</TableHead>
                          <TableHead>Average</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>ALDM Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrades.length > 0 ? (
                          filteredGrades.map((grade) => (
                            <TableRow key={grade.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedStudents.includes(grade.id)}
                                  onCheckedChange={() =>
                                    handleCheckboxChange(grade.id)
                                  }
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {grade.studentName}
                              </TableCell>
                              <TableCell>{grade.studentEmail}</TableCell>
                              <TableCell>{grade.math}</TableCell>
                              <TableCell>{grade.english}</TableCell>
                              <TableCell>{grade.filipino}</TableCell>
                              <TableCell>{grade.tle}</TableCell>
                              <TableCell>{grade.science}</TableCell>
                              <TableCell>{grade.mapeh}</TableCell>
                              <TableCell>{grade.esp}</TableCell>
                              <TableCell>{grade.ap}</TableCell>
                              <TableCell className="font-bold">
                                {grade.average.toFixed(1)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={calculateStatusClass(grade.status)}
                                >
                                  {grade.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    grade.aldmStatus === "Active"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {grade.aldmStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditGrade(grade)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This
                                          will permanently delete the student's
                                          grade record.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeleteGrade(grade.id)
                                          }
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={15}
                              className="text-center py-8"
                            >
                              No students found. Try a different search term or
                              add a new student.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          // Student view
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentGrades.length > 0 ? (
                    <>
                      <TableRow>
                        <TableCell className="font-medium">Math</TableCell>
                        <TableCell>{studentGrades[0].math}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].math >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].math >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">English</TableCell>
                        <TableCell>{studentGrades[0].english}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].english >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].english >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Filipino</TableCell>
                        <TableCell>{studentGrades[0].filipino}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].filipino >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].filipino >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TLE</TableCell>
                        <TableCell>{studentGrades[0].tle}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].tle >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].tle >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Science</TableCell>
                        <TableCell>{studentGrades[0].science}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].science >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].science >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MAPEH</TableCell>
                        <TableCell>{studentGrades[0].mapeh}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].mapeh >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].mapeh >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ESP</TableCell>
                        <TableCell>{studentGrades[0].esp}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].esp >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].esp >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AP</TableCell>
                        <TableCell>{studentGrades[0].ap}</TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].ap >= 75 ? "pass" : "fail",
                            )}
                          >
                            {studentGrades[0].ap >= 75 ? "PASS" : "FAIL"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-bold">
                        <TableCell>Average</TableCell>
                        <TableCell>
                          {studentGrades[0].average.toFixed(1)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={calculateStatusClass(
                              studentGrades[0].status,
                            )}
                          >
                            {studentGrades[0].status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        No grades found for this student.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>

      {/* Add/Edit Grade Dialog */}
      <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Student Grade" : "Add New Student"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="studentName" className="text-sm font-medium">
                  Student Name
                </label>
                <Input
                  id="studentName"
                  defaultValue={currentGrade?.studentName || ""}
                  placeholder="Enter student name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="studentEmail" className="text-sm font-medium">
                  Student Email
                </label>
                <Input
                  id="studentEmail"
                  defaultValue={currentGrade?.studentEmail || ""}
                  placeholder="Enter student email"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="parentEmail" className="text-sm font-medium">
                Parent Email
              </label>
              <Input
                id="parentEmail"
                defaultValue={currentGrade?.parentEmail || ""}
                placeholder="Enter parent email"
                type="email"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="math" className="text-sm font-medium">
                  Math
                </label>
                <Input
                  id="math"
                  defaultValue={currentGrade?.math || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="english" className="text-sm font-medium">
                  English
                </label>
                <Input
                  id="english"
                  defaultValue={currentGrade?.english || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="filipino" className="text-sm font-medium">
                  Filipino
                </label>
                <Input
                  id="filipino"
                  defaultValue={currentGrade?.filipino || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="tle" className="text-sm font-medium">
                  TLE
                </label>
                <Input
                  id="tle"
                  defaultValue={currentGrade?.tle || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="science" className="text-sm font-medium">
                  Science
                </label>
                <Input
                  id="science"
                  defaultValue={currentGrade?.science || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mapeh" className="text-sm font-medium">
                  MAPEH
                </label>
                <Input
                  id="mapeh"
                  defaultValue={currentGrade?.mapeh || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="esp" className="text-sm font-medium">
                  ESP
                </label>
                <Input
                  id="esp"
                  defaultValue={currentGrade?.esp || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ap" className="text-sm font-medium">
                  AP
                </label>
                <Input
                  id="ap"
                  defaultValue={currentGrade?.ap || ""}
                  placeholder="0-100"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="aldmStatus" className="text-sm font-medium">
                ALDM Status
              </label>
              <Select defaultValue={currentGrade?.aldmStatus || "Active"}>
                <SelectTrigger id="aldmStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddEditDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default GradeTable;
