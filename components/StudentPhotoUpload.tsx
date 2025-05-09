import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Camera } from "lucide-react";

interface StudentPhotoUploadProps {
  studentId: string;
  studentName: string;
  currentPhoto?: string;
  onPhotoUpdate?: (studentId: string, photoUrl: string) => void;
}

const StudentPhotoUpload: React.FC<StudentPhotoUploadProps> = ({
  studentId,
  studentName,
  currentPhoto,
  onPhotoUpdate,
}) => {
  const [photo, setPhoto] = useState<string | null>(currentPhoto || null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Create a FileReader to read the image file
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const photoUrl = event.target.result as string;
        setPhoto(photoUrl);
        if (onPhotoUpdate) {
          onPhotoUpdate(studentId, photoUrl);
        }
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove current photo
  const handleRemovePhoto = () => {
    setPhoto(null);
    if (onPhotoUpdate) {
      onPhotoUpdate(studentId, "");
    }
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Student Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-2 border-red-600">
              <AvatarImage
                src={
                  photo ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentName}`
                }
                alt={studentName}
              />
              <AvatarFallback className="text-2xl">
                {studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {photo && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemovePhoto}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="space-y-2 w-full max-w-xs">
            <Label htmlFor="photo-upload" className="text-sm font-medium">
              Upload Photo
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("photo-upload")?.click()}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Choose Image
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // This would trigger the device camera in a real app
                  alert("Camera functionality would open here");
                }}
                className="flex-shrink-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a clear photo of the student. JPG, PNG or GIF format.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentPhotoUpload;
