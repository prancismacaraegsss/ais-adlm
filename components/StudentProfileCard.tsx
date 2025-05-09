import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone } from "lucide-react";

interface StudentProfileCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    parentEmail: string;
    parentPhone?: string;
    address?: string;
    guardianName?: string;
    profileImage?: string;
    attendance?: {
      present: number;
      absent: number;
      late: number;
    };
    gradeLevel: string;
    section?: string;
  };
  onEdit?: (studentId: string) => void;
  isAdmin?: boolean;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  student,
  onEdit,
  isAdmin = false,
}) => {
  // Default values for missing properties
  const defaultStudent = {
    ...student,
    parentPhone: student.parentPhone || "N/A",
    address: student.address || "N/A",
    guardianName: student.guardianName || "N/A",
    section: student.section || "A",
    attendance: student.attendance || {
      present: 45,
      absent: 2,
      late: 3,
    },
  };

  const totalDays =
    defaultStudent.attendance.present +
    defaultStudent.attendance.absent +
    defaultStudent.attendance.late;

  const attendancePercentage = Math.round(
    (defaultStudent.attendance.present / totalDays) * 100,
  );

  return (
    <Card className="w-full bg-background border-red-600 overflow-hidden">
      <CardHeader className="pb-2 bg-red-600/10">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Student Profile</span>
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit && onEdit(student.id)}
              className="text-red-600 hover:text-red-800 hover:bg-red-600/10"
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24 border-2 border-red-600">
              <AvatarImage
                src={
                  defaultStudent.profileImage ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${defaultStudent.name}`
                }
                alt={defaultStudent.name}
              />
              <AvatarFallback className="text-lg">
                {defaultStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Badge className="bg-red-600">
              Grade {defaultStudent.gradeLevel} - {defaultStudent.section}
            </Badge>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-bold">{defaultStudent.name}</h3>
              <p className="text-sm text-muted-foreground">
                ID: {defaultStudent.id}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                <p className="font-medium">Contact Information:</p>
                <div className="flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>{defaultStudent.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>{defaultStudent.parentPhone}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Guardian Information:</p>
                <p>Guardian: {defaultStudent.guardianName}</p>
                <p>Parent Email: {defaultStudent.parentEmail}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-medium">Address:</p>
              <p className="text-sm">{defaultStudent.address}</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="font-medium">Attendance:</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    attendancePercentage > 90
                      ? "bg-green-600 text-white"
                      : attendancePercentage > 80
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                  }`}
                >
                  {attendancePercentage}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-600/20 p-1 rounded">
                  <p className="font-bold">
                    {defaultStudent.attendance.present}
                  </p>
                  <p>Present</p>
                </div>
                <div className="bg-red-600/20 p-1 rounded">
                  <p className="font-bold">
                    {defaultStudent.attendance.absent}
                  </p>
                  <p>Absent</p>
                </div>
                <div className="bg-yellow-500/20 p-1 rounded">
                  <p className="font-bold">{defaultStudent.attendance.late}</p>
                  <p>Late</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileCard;
