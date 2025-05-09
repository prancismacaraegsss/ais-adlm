import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, AlertTriangle, Info, BookOpen } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "grade" | "assignment" | "message" | "system";
  timestamp: Date;
  isRead: boolean;
}

interface NotificationSystemProps {
  userRole?: "student" | "admin";
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  userRole = "student",
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Math Grade Updated",
      message: "Your Math grade for Q2 has been updated to 87.",
      type: "grade",
      timestamp: new Date(2023, 9, 18, 10, 30),
      isRead: false,
    },
    {
      id: "2",
      title: "Missing Assignment",
      message: "You have not submitted your Science project due yesterday.",
      type: "assignment",
      timestamp: new Date(2023, 9, 17, 14, 45),
      isRead: false,
    },
    {
      id: "3",
      title: "Message from Teacher",
      message:
        "Please prepare for the upcoming Math quiz on Friday covering chapters 5-7.",
      type: "message",
      timestamp: new Date(2023, 9, 16, 9, 15),
      isRead: true,
    },
    {
      id: "4",
      title: "System Maintenance",
      message:
        "The grade system will be under maintenance this Saturday from 10 PM to 2 AM.",
      type: "system",
      timestamp: new Date(2023, 9, 15, 11, 0),
      isRead: true,
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grade":
        return <BookOpen className="h-4 w-4" />;
      case "assignment":
        return <AlertTriangle className="h-4 w-4" />;
      case "message":
        return <Info className="h-4 w-4" />;
      case "system":
        return <Bell className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "grade":
        return "bg-green-600";
      case "assignment":
        return "bg-yellow-500";
      case "message":
        return "bg-blue-500";
      case "system":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) {
      return (
        "Today, " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else if (diffInDays === 1) {
      return (
        "Yesterday, " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center">
          Notifications
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-red-600">{unreadCount}</Badge>
          )}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="text-xs"
        >
          <Check className="mr-1 h-3 w-3" /> Mark all as read
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-red-600" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={filter === "unread" ? "bg-red-600" : ""}
          >
            Unread
          </Button>
          <Button
            variant={filter === "grade" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("grade")}
            className={filter === "grade" ? "bg-red-600" : ""}
          >
            Grades
          </Button>
          <Button
            variant={filter === "assignment" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("assignment")}
            className={filter === "assignment" ? "bg-red-600" : ""}
          >
            Assignments
          </Button>
          <Button
            variant={filter === "message" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("message")}
            className={filter === "message" ? "bg-red-600" : ""}
          >
            Messages
          </Button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${notification.isRead ? "bg-background" : "bg-muted"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`${getTypeColor(notification.type)} p-2 rounded-full mr-3`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                  {!notification.isRead && (
                    <Badge className="ml-2 bg-red-600 h-2 w-2 rounded-full p-0" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No notifications found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSystem;
