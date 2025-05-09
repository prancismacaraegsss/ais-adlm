import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail } from "lucide-react";

interface QuarterlyGradeViewProps {
  studentId?: string;
  studentName?: string;
}

const QuarterlyGradeView: React.FC<QuarterlyGradeViewProps> = ({
  studentId = "1",
  studentName = "John Doe",
}) => {
  const [activeQuarter, setActiveQuarter] = useState("q1");

  // Mock data for demonstration
  const quarterlyGrades = {
    q1: {
      Math: 85,
      English: 90,
      Filipino: 88,
      TLE: 92,
      Science: 87,
      MAPEH: 94,
      ESP: 89,
      AP: 91,
    },
    q2: {
      Math: 87,
      English: 92,
      Filipino: 90,
      TLE: 94,
      Science: 89,
      MAPEH: 95,
      ESP: 91,
      AP: 93,
    },
    q3: {
      Math: 89,
      English: 91,
      Filipino: 87,
      TLE: 93,
      Science: 90,
      MAPEH: 92,
      ESP: 88,
      AP: 94,
    },
    q4: {
      Math: 91,
      English: 93,
      Filipino: 89,
      TLE: 95,
      Science: 92,
      MAPEH: 94,
      ESP: 90,
      AP: 96,
    },
  };

  const currentGrades =
    quarterlyGrades[activeQuarter as keyof typeof quarterlyGrades];
  const subjects = Object.keys(currentGrades);
  const average =
    Object.values(currentGrades).reduce((sum, grade) => sum + grade, 0) /
    subjects.length;

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

  const handleEmailReport = () => {
    // In a real app, this would send an email report
    console.log("Sending email report");
    alert("Email report would be sent");
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
          {studentName}'s Quarterly Grades
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("pdf")}
          >
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleEmailReport}>
            <Mail className="mr-2 h-4 w-4" /> Email Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeQuarter}
          onValueChange={setActiveQuarter}
          className="w-full mb-4"
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

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => {
                const grade =
                  currentGrades[subject as keyof typeof currentGrades];
                const status = grade >= 75 ? "PASS" : "FAIL";

                return (
                  <TableRow key={subject}>
                    <TableCell className="font-medium">{subject}</TableCell>
                    <TableCell>
                      <div
                        className={`py-1 px-3 ${getGradeColor(grade)} text-white font-medium rounded-md inline-block w-16 text-center`}
                      >
                        {grade}
                      </div>
                    </TableCell>
                    <TableCell>
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
              <TableRow className="font-bold">
                <TableCell>Average</TableCell>
                <TableCell>
                  <div
                    className={`py-1 px-3 ${getGradeColor(average)} text-white font-medium rounded-md inline-block w-16 text-center`}
                  >
                    {average.toFixed(1)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={average >= 75 ? "bg-green-500" : "bg-red-500"}
                  >
                    {average >= 75 ? "PASS" : "FAIL"}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 border rounded-md bg-muted/20">
          <h3 className="font-semibold mb-2">Grading System</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">90-100: Excellent</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">80-89: Very Good</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm">75-79: Satisfactory</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Below 75: Failed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuarterlyGradeView;
