import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, Printer, Mail } from "lucide-react";

interface SpreadsheetViewProps {
  isAdmin?: boolean;
  studentId?: string;
}

const SpreadsheetView: React.FC<SpreadsheetViewProps> = ({
  isAdmin = false,
  studentId = "",
}) => {
  const [activeQuarter, setActiveQuarter] = useState("q1");
  const [activeGradeLevel, setActiveGradeLevel] = useState("7");
  const [editMode, setEditMode] = useState(false);
  const [grades, setGrades] = useState<
    Record<string, Record<string, Record<string, number>>>
  >({
    "7": {
      q1: {
        "John Doe": 85,
        "Jane Smith": 78,
        "Robert Johnson": 92,
        "Emily Davis": 65,
        "Michael Wilson": 88,
      },
      q2: {
        "John Doe": 87,
        "Jane Smith": 80,
        "Robert Johnson": 90,
        "Emily Davis": 68,
        "Michael Wilson": 91,
      },
      q3: {
        "John Doe": 89,
        "Jane Smith": 82,
        "Robert Johnson": 88,
        "Emily Davis": 70,
        "Michael Wilson": 93,
      },
      q4: {
        "John Doe": 90,
        "Jane Smith": 85,
        "Robert Johnson": 91,
        "Emily Davis": 72,
        "Michael Wilson": 95,
      },
    },
    "8": {
      q1: {
        "Alex Brown": 79,
        "Sarah Miller": 88,
        "David Garcia": 92,
        "Lisa Martinez": 85,
        "Kevin Taylor": 76,
      },
      q2: {
        "Alex Brown": 81,
        "Sarah Miller": 90,
        "David Garcia": 89,
        "Lisa Martinez": 87,
        "Kevin Taylor": 78,
      },
      q3: {
        "Alex Brown": 83,
        "Sarah Miller": 91,
        "David Garcia": 87,
        "Lisa Martinez": 89,
        "Kevin Taylor": 80,
      },
      q4: {
        "Alex Brown": 85,
        "Sarah Miller": 93,
        "David Garcia": 90,
        "Lisa Martinez": 91,
        "Kevin Taylor": 82,
      },
    },
    "9": {
      q1: {
        "Thomas Anderson": 91,
        "Olivia White": 87,
        "James Lee": 79,
        "Sophia Clark": 94,
        "Daniel Lewis": 82,
      },
      q2: {
        "Thomas Anderson": 89,
        "Olivia White": 90,
        "James Lee": 81,
        "Sophia Clark": 92,
        "Daniel Lewis": 84,
      },
      q3: {
        "Thomas Anderson": 92,
        "Olivia White": 88,
        "James Lee": 83,
        "Sophia Clark": 90,
        "Daniel Lewis": 86,
      },
      q4: {
        "Thomas Anderson": 94,
        "Olivia White": 91,
        "James Lee": 85,
        "Sophia Clark": 93,
        "Daniel Lewis": 88,
      },
    },
    "10": {
      q1: {
        "Emma Harris": 88,
        "Noah Martin": 92,
        "Ava Thompson": 85,
        "William Rodriguez": 79,
        "Isabella Walker": 94,
      },
      q2: {
        "Emma Harris": 90,
        "Noah Martin": 89,
        "Ava Thompson": 87,
        "William Rodriguez": 81,
        "Isabella Walker": 92,
      },
      q3: {
        "Emma Harris": 91,
        "Noah Martin": 87,
        "Ava Thompson": 89,
        "William Rodriguez": 83,
        "Isabella Walker": 90,
      },
      q4: {
        "Emma Harris": 93,
        "Noah Martin": 90,
        "Ava Thompson": 91,
        "William Rodriguez": 85,
        "Isabella Walker": 93,
      },
    },
  });

  const subjects = [
    "Math",
    "English",
    "Filipino",
    "TLE",
    "Science",
    "MAPEH",
    "ESP",
    "AP",
  ];

  const students = Object.keys(grades[activeGradeLevel][activeQuarter]);

  const handleGradeChange = (
    student: string,
    subject: string,
    value: string,
  ) => {
    if (isAdmin && editMode) {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        // In a real app, this would update the database
        console.log(`Updated ${student}'s ${subject} grade to ${numValue}`);
      }
    }
  };

  const handleSaveChanges = () => {
    setEditMode(false);
    // In a real app, this would save changes to the database
    console.log("Saving changes to database");
    alert("Grades saved successfully!");
  };

  const handleExport = (format: string) => {
    // In a real app, this would generate and download the file
    console.log(`Exporting grades as ${format}`);
    alert(`Grades would be exported as ${format.toUpperCase()}`);
  };

  const handlePrint = () => {
    // In a real app, this would open the print dialog
    console.log("Printing grades");
    window.print();
  };

  const handleEmailReports = () => {
    // In a real app, this would send email reports
    console.log("Sending email reports");
    alert("Email reports would be sent to students/parents");
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "bg-green-500";
    if (grade >= 80) return "bg-blue-500";
    if (grade >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          {isAdmin ? "Grade Spreadsheet View" : "My Grades Spreadsheet"}
        </CardTitle>
        <div className="flex space-x-2">
          {isAdmin && (
            <Button
              variant={editMode ? "destructive" : "outline"}
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel Editing" : "Edit Grades"}
            </Button>
          )}
          {isAdmin && editMode && (
            <Button size="sm" onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("excel")}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          {isAdmin && (
            <Button variant="outline" size="sm" onClick={handleEmailReports}>
              <Mail className="mr-2 h-4 w-4" /> Email Reports
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Tabs
            value={activeQuarter}
            onValueChange={setActiveQuarter}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger
                value="q1"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                1st Quarter
              </TabsTrigger>
              <TabsTrigger
                value="q2"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                2nd Quarter
              </TabsTrigger>
              <TabsTrigger
                value="q3"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                3rd Quarter
              </TabsTrigger>
              <TabsTrigger
                value="q4"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                4th Quarter
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {isAdmin && (
            <Tabs
              value={activeGradeLevel}
              onValueChange={setActiveGradeLevel}
              className="w-full max-w-xs ml-4"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger
                  value="7"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Grade 7
                </TabsTrigger>
                <TabsTrigger
                  value="8"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Grade 8
                </TabsTrigger>
                <TabsTrigger
                  value="9"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Grade 9
                </TabsTrigger>
                <TabsTrigger
                  value="10"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Grade 10
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Student</TableHead>
                {subjects.map((subject) => (
                  <TableHead key={subject} className="font-bold text-center">
                    {subject}
                  </TableHead>
                ))}
                <TableHead className="font-bold text-center">Average</TableHead>
                <TableHead className="font-bold text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                // Generate random grades for each subject for demo purposes
                const studentGrades = subjects.map(
                  () => Math.floor(Math.random() * 26) + 75, // Random grade between 75-100
                );

                const average =
                  studentGrades.reduce((sum, grade) => sum + grade, 0) /
                  studentGrades.length;
                const status = average >= 75 ? "PASS" : "FAIL";

                return (
                  <TableRow key={student}>
                    <TableCell className="font-medium">{student}</TableCell>
                    {studentGrades.map((grade, index) => (
                      <TableCell key={index} className="p-0 text-center">
                        {isAdmin && editMode ? (
                          <Input
                            type="number"
                            defaultValue={grade}
                            min="0"
                            max="100"
                            className="h-8 text-center"
                            onChange={(e) =>
                              handleGradeChange(
                                student,
                                subjects[index],
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          <div
                            className={`py-2 ${getGradeColor(grade)} text-white font-medium rounded-sm mx-1`}
                          >
                            {grade}
                          </div>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold">
                      {average.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          status === "PASS" ? "bg-green-500" : "bg-red-500"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpreadsheetView;
