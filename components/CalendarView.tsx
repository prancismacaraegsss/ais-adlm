import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "grade" | "meeting" | "exam" | "holiday";
  description?: string;
}

interface CalendarViewProps {
  events?: CalendarEvent[];
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [
    {
      id: "1",
      title: "Q2 Grades Release",
      date: new Date(2023, 10, 15),
      type: "grade",
      description: "Second quarter grades will be released",
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      date: new Date(2023, 10, 18),
      type: "meeting",
      description: "Discuss student progress with parents",
    },
    {
      id: "3",
      title: "Math Final Exam",
      date: new Date(2023, 10, 22),
      type: "exam",
      description: "Covers chapters 1-8",
    },
    {
      id: "4",
      title: "Science Final Exam",
      date: new Date(2023, 10, 24),
      type: "exam",
      description: "Covers all topics from the semester",
    },
    {
      id: "5",
      title: "Semester Break Begins",
      date: new Date(2023, 10, 30),
      type: "holiday",
      description: "No classes until January 8",
    },
  ],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month and total days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
  };

  // Next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
  };

  // Format date to YYYY-MM-DD for comparison
  const formatDateForComparison = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Check if a date has events
  const getEventsForDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return events.filter(
      (event) =>
        formatDateForComparison(event.date) === formatDateForComparison(date),
    );
  };

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "grade":
        return "bg-green-600";
      case "meeting":
        return "bg-blue-500";
      case "exam":
        return "bg-red-600";
      case "holiday":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  // Generate calendar days
  const calendarDays = [];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    const isSelected =
      selectedDate &&
      formatDateForComparison(date) === formatDateForComparison(selectedDate);

    const dayEvents = getEventsForDate(day);
    const hasEvents = dayEvents.length > 0;

    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`h-10 flex flex-col items-center justify-center relative cursor-pointer hover:bg-muted rounded-md ${isToday ? "border border-red-600" : ""} ${
          isSelected ? "bg-red-600/20" : ""
        }`}
        onClick={() => setSelectedDate(date)}
      >
        <span
          className={`text-sm ${isToday ? "font-bold text-red-600" : ""} ${
            isSelected ? "font-bold" : ""
          }`}
        >
          {day}
        </span>
        {hasEvents && (
          <div className="absolute bottom-1 flex space-x-1">
            {dayEvents.length <= 2
              ? dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(
                      event.type,
                    )}`}
                  ></div>
                ))
              : [
                  <div
                    key="dot-1"
                    className="w-1.5 h-1.5 rounded-full bg-red-600"
                  ></div>,
                  <div
                    key="dot-2"
                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  ></div>,
                  <div
                    key="dot-3"
                    className="w-1.5 h-1.5 rounded-full bg-green-600"
                  ></div>,
                ]}
          </div>
        )}
      </div>,
    );
  }

  // Get events for selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) =>
          formatDateForComparison(event.date) ===
          formatDateForComparison(selectedDate),
      )
    : [];

  // Get upcoming events (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingEvents = events
    .filter((event) => event.date >= today && event.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Calendar & Important Dates</span>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={nextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">{calendarDays}</div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">
              {selectedDate
                ? `Events on ${selectedDate.toLocaleDateString()}`
                : "Upcoming Events"}
            </h3>
            {selectedDate && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setSelectedDate(null)}
              >
                Show Upcoming
              </Button>
            )}
          </div>

          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {(selectedDate ? selectedDateEvents : upcomingEvents).length > 0 ? (
              (selectedDate ? selectedDateEvents : upcomingEvents).map(
                (event) => (
                  <div
                    key={event.id}
                    className="p-2 border rounded-md flex items-start"
                  >
                    <div
                      className={`${getEventTypeColor(
                        event.type,
                      )} w-1 self-stretch rounded-full mr-2`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {event.date.toLocaleDateString()}
                        </Badge>
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">
                {selectedDate
                  ? "No events scheduled for this date"
                  : "No upcoming events in the next 7 days"}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-2 border-t flex flex-wrap gap-2">
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-red-600 mr-1"></div>
            <span>Exams</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
            <span>Grades</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
            <span>Meetings</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
            <span>Holidays</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
