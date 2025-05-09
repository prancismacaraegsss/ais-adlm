import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Reply } from "lucide-react";

interface FeedbackMessage {
  id: string;
  sender: {
    name: string;
    role: "student" | "admin";
    avatar?: string;
  };
  message: string;
  timestamp: Date;
  subject?: string;
  isRead: boolean;
}

interface StudentFeedbackProps {
  studentId?: string;
  studentName?: string;
  isAdmin?: boolean;
  userName?: string;
}

const StudentFeedback: React.FC<StudentFeedbackProps> = ({
  studentId = "1",
  studentName = "John Doe",
  isAdmin = false,
  userName = "Admin User",
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<FeedbackMessage[]>([
    {
      id: "1",
      sender: {
        name: studentName,
        role: "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentName}`,
      },
      message:
        "I'm having trouble understanding why my Math grade dropped this quarter. Could you please explain?",
      timestamp: new Date(2023, 9, 15, 10, 30),
      subject: "Math",
      isRead: true,
    },
    {
      id: "2",
      sender: {
        name: "Admin User",
        role: "admin",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`,
      },
      message:
        "Hi John, your performance in the last quiz affected your overall grade. Let's schedule a meeting to discuss how you can improve.",
      timestamp: new Date(2023, 9, 15, 14, 45),
      isRead: true,
    },
    {
      id: "3",
      sender: {
        name: studentName,
        role: "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentName}`,
      },
      message: "Thank you for the explanation. When can we meet?",
      timestamp: new Date(2023, 9, 16, 9, 15),
      isRead: true,
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMessageObj: FeedbackMessage = {
      id: Date.now().toString(),
      sender: {
        name: isAdmin ? userName : studentName,
        role: isAdmin ? "admin" : "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${isAdmin ? userName : studentName}`,
      },
      message: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {isAdmin ? `Feedback with ${studentName}` : "My Feedback"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender.role === (isAdmin ? "admin" : "student")
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    msg.sender.role === (isAdmin ? "admin" : "student")
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage
                      src={msg.sender.avatar}
                      alt={msg.sender.name}
                    />
                    <AvatarFallback>
                      {msg.sender.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      msg.sender.role === "admin"
                        ? "bg-red-600 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-xs">
                        {msg.sender.name}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                    {msg.subject && (
                      <Badge
                        className="mb-1"
                        variant={
                          msg.sender.role === "admin" ? "outline" : "default"
                        }
                      >
                        {msg.subject}
                      </Badge>
                    )}
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 min-h-[80px] resize-none border-red-600 focus:ring-red-600"
              />
              <Button
                onClick={handleSendMessage}
                className="self-end bg-red-600 hover:bg-red-700"
              >
                {isAdmin ? (
                  <Reply className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentFeedback;
