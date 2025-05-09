import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Calculator, RotateCcw } from "lucide-react";

interface QuarterlyGradeInputProps {
  studentId?: string;
  studentName?: string;
  isAdmin?: boolean;
}

const QuarterlyGradeInput: React.FC<QuarterlyGradeInputProps> = ({
  studentId = "1",
  studentName = "John Doe",
  isAdmin = true,
}) => {
  const [activeQuarter, setActiveQuarter] = useState("q1");
  const [isEditing, setIsEditing] = useState(false);

  // Initial grades data structure
  const initialGrades = {
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

  const [grades, setGrades] = useState(initialGrades);
  const [tempGrades, setTempGrades] = useState(initialGrades);

  const subjects = Object.keys(grades.q1);

  // Calculate average for a quarter
  const calculateQuarterAverage = (quarter: string) => {
    const quarterGrades = grades[quarter as keyof typeof grades];
    const sum = Object.values(quarterGrades).reduce(
      (acc, grade) => acc + grade,
      0
    );
    return sum / Object.values(quarterGrades).length;
  };

  // Calculate final grade (average of all quarters)
  const calculateFinalGrade = () => {
    const quarterAverages = Object.keys(grades).map((quarter) =>
      calculateQuarterAverage(quarter)
    );
    const sum = quarterAverages.reduce((acc, avg) => acc + avg, 0);
    return sum / quarterAverages.length;
  };

  // Calculate subject average across all quarters
  const calculateSubjectAverage = (subject: string) => {
    const subjectGrades = Object.keys(grades).map(
      (quarter) => grades[quarter as keyof typeof grades][subject]
    );
    const sum = subjectGrades.reduce((acc, grade) => acc + grade, 0);
    return sum / subjectGrades.length;
  };

  // Handle grade input change
  const handleGradeChange = (
    subject: string,
    value: string,
    quarter = activeQuarter
  ) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setTempGrades((prev) => ({
        ...prev,
        [quarter]: {
          ...prev[quarter as keyof typeof prev],
          [subject]: numValue,
        },
      }));
    }
  };

  // Save changes
  const handleSaveChanges = () => {
    setGrades(tempGrades);
    setIsEditing(false);
    // In a real app, this would save to the database
    alert("Grades saved successfully!");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setTempGrades(grades);
    setIsEditing(false);
  };

  // Get color based on grade
  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-500";
    if (grade >= 80) return "text-blue-500";
    if (grade >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  // Get status based on grade
  const getStatus = (grade: number) => {
    if (grade >= 75) return "PASSED";
    return "FAILED";
  };

  // Get status badge color
  const getStatusBadgeColor = (grade: number) => {
    return grade >= 75 ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">
          {isAdmin
            ? `${studentName}'s Quarterly Grades`
            : "My Quarterly Grades"}
        </CardTitle>
        {isAdmin && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Grades
              </Button>
            )}
          </div>
        )}
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
