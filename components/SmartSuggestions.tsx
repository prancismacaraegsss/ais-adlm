import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, FileText } from "lucide-react";

interface SmartSuggestionsProps {
  studentGrades?: Record<string, number>;
  studentName?: string;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  studentGrades = {
    Math: 65,
    English: 82,
    Filipino: 78,
    TLE: 85,
    Science: 68,
    MAPEH: 90,
    ESP: 88,
    AP: 75,
  },
  studentName = "John Doe",
}) => {
  // Find subjects with low grades (below 75)
  const lowGradeSubjects = Object.entries(studentGrades)
    .filter(([_, grade]) => grade < 75)
    .sort(([_, gradeA], [__, gradeB]) => gradeA - gradeB);

  // Find subjects that need improvement (75-80)
  const improvementSubjects = Object.entries(studentGrades)
    .filter(([_, grade]) => grade >= 75 && grade < 80)
    .sort(([_, gradeA], [__, gradeB]) => gradeA - gradeB);

  // Resources for each subject
  const subjectResources: Record<
    string,
    Array<{ type: string; title: string; link: string; icon: React.ReactNode }>
  > = {
    Math: [
      {
        type: "video",
        title: "Khan Academy Math Tutorials",
        link: "https://www.khanacademy.org/math",
        icon: <Video className="h-4 w-4" />,
      },
      {
        type: "practice",
        title: "Math Practice Problems",
        link: "https://www.mathsisfun.com/",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        type: "document",
        title: "Math Formula Sheet",
        link: "#",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
    Science: [
      {
        type: "video",
        title: "Crash Course Science Videos",
        link: "https://www.youtube.com/user/crashcourse",
        icon: <Video className="h-4 w-4" />,
      },
      {
        type: "practice",
        title: "Science Quiz Practice",
        link: "https://quizizz.com/",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        type: "document",
        title: "Science Study Guide",
        link: "#",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
    English: [
      {
        type: "video",
        title: "English Grammar Tutorials",
        link: "https://www.englishclub.com/",
        icon: <Video className="h-4 w-4" />,
      },
      {
        type: "practice",
        title: "Reading Comprehension Practice",
        link: "https://www.readtheory.org/",
        icon: <BookOpen className="h-4 w-4" />,
      },
    ],
    Filipino: [
      {
        type: "video",
        title: "Filipino Language Lessons",
        link: "https://www.youtube.com/results?search_query=filipino+language+lessons",
        icon: <Video className="h-4 w-4" />,
      },
      {
        type: "document",
        title: "Filipino Grammar Guide",
        link: "#",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
    TLE: [
      {
        type: "video",
        title: "TLE Skills Tutorials",
        link: "https://www.youtube.com/results?search_query=TLE+tutorials",
        icon: <Video className="h-4 w-4" />,
      },
    ],
    MAPEH: [
      {
        type: "video",
        title: "MAPEH Lessons",
        link: "https://www.youtube.com/results?search_query=MAPEH+lessons",
        icon: <Video className="h-4 w-4" />,
      },
    ],
    ESP: [
      {
        type: "document",
        title: "ESP Study Materials",
        link: "#",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
    AP: [
      {
        type: "video",
        title: "Araling Panlipunan Lessons",
        link: "https://www.youtube.com/results?search_query=araling+panlipunan+lessons",
        icon: <Video className="h-4 w-4" />,
      },
      {
        type: "document",
        title: "AP History Timeline",
        link: "#",
        icon: <FileText className="h-4 w-4" />,
      },
    ],
  };

  // General study tips
  const generalTips = [
    "Create a regular study schedule and stick to it",
    "Take short breaks every 25-30 minutes of studying",
    "Review your notes within 24 hours after class",
    "Use flashcards for memorizing important concepts",
    "Join or form a study group with classmates",
  ];

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          Smart Suggestions & Study Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowGradeSubjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-red-500">
              Priority Focus Areas
            </h3>
            <div className="space-y-4">
              {lowGradeSubjects.map(([subject, grade]) => (
                <div
                  key={subject}
                  className="border rounded-lg p-3 bg-red-600/10"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{subject}</h4>
                    <span className="text-sm bg-red-600 text-white px-2 py-0.5 rounded">
                      Grade: {grade}
                    </span>
                  </div>
                  <p className="text-sm mb-2">
                    Your {subject} grade needs immediate attention. Here are
                    some resources to help you improve:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subjectResources[subject]?.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        asChild
                      >
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.icon}
                          <span className="ml-1">{resource.title}</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {improvementSubjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-500">
              Areas for Improvement
            </h3>
            <div className="space-y-4">
              {improvementSubjects.map(([subject, grade]) => (
                <div
                  key={subject}
                  className="border rounded-lg p-3 bg-yellow-500/10"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{subject}</h4>
                    <span className="text-sm bg-yellow-500 text-white px-2 py-0.5 rounded">
                      Grade: {grade}
                    </span>
                  </div>
                  <p className="text-sm mb-2">
                    You're doing okay in {subject}, but there's room for
                    improvement. Check out these resources:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subjectResources[subject]?.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        asChild
                      >
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.icon}
                          <span className="ml-1">{resource.title}</span>
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-500">
            General Study Tips
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {generalTips.map((tip, index) => (
              <li key={index} className="text-sm">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
