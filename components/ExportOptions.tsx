import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Mail, FileSpreadsheet, FileText } from "lucide-react";

interface ExportOptionsProps {
  studentData?: {
    id: string;
    name: string;
    email: string;
    parentEmail: string;
  }[];
  isAdmin?: boolean;
}

const ExportOptions = ({
  studentData = [],
  isAdmin = false,
}: ExportOptionsProps) => {
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState("Grade Report");
  const [emailMessage, setEmailMessage] = useState(
    "Please find attached the grade report.",
  );

  // Mock data for when no student data is provided
  const mockStudentData = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      parentEmail: "parent.doe@example.com",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      parentEmail: "parent.smith@example.com",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      parentEmail: "parent.johnson@example.com",
    },
  ];

  const displayData = studentData.length > 0 ? studentData : mockStudentData;

  const handleExportClick = () => {
    // In a real implementation, this would trigger the actual export
    console.log(`Exporting as ${exportFormat}`);
    // Mock download functionality
    alert(`Grade report would be downloaded as ${exportFormat.toUpperCase()}`);
  };

  const handleEmailSend = () => {
    // In a real implementation, this would send emails to selected students/parents
    console.log("Sending emails to:", selectedStudents);
    console.log("Subject:", emailSubject);
    console.log("Message:", emailMessage);
    setEmailDialogOpen(false);
    alert("Emails would be sent to selected recipients");
  };

  const toggleStudentSelection = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id],
    );
  };

  const selectAllStudents = () => {
    if (selectedStudents.length === displayData.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(displayData.map((student) => student.id));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background border-red-600">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Export Options</CardTitle>
        <CardDescription>Download or email grade reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="export-format">Export Format</Label>
          <Select
            value={exportFormat}
            onValueChange={(value) => setExportFormat(value as "pdf" | "excel")}
          >
            <SelectTrigger id="export-format" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF Document
                </div>
              </SelectItem>
              <SelectItem value="excel">
                <div className="flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel Spreadsheet
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            onClick={handleExportClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>

          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-red-600 hover:bg-red-600/10"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Send Grade Reports</DialogTitle>
                <DialogDescription>
                  Select recipients and customize your email message.
                </DialogDescription>
              </DialogHeader>

              {isAdmin && (
                <div className="max-h-60 overflow-y-auto border rounded-md p-2 my-2">
                  <div className="flex items-center space-x-2 p-2 border-b">
                    <Checkbox
                      id="select-all"
                      checked={
                        selectedStudents.length === displayData.length &&
                        displayData.length > 0
                      }
                      onCheckedChange={selectAllStudents}
                    />
                    <Label htmlFor="select-all" className="font-bold">
                      Select All
                    </Label>
                  </div>
                  {displayData.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-2 p-2 hover:bg-muted/50"
                    >
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() =>
                          toggleStudentSelection(student.id)
                        }
                      />
                      <Label
                        htmlFor={`student-${student.id}`}
                        className="flex-1"
                      >
                        <div>{student.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {student.email}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Input
                    id="email-subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-message">Message</Label>
                  <textarea
                    id="email-message"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Email message"
                  />
                </div>
              </div>

              <DialogFooter className="sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEmailDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleEmailSend}
                  disabled={isAdmin ? selectedStudents.length === 0 : false}
                >
                  Send Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Reports include all current grade data</p>
      </CardFooter>
    </Card>
  );
};

export default ExportOptions;
