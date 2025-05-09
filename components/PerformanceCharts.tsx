import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PerformanceChartsProps {
  studentId?: string;
  studentName?: string;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  studentId = "1",
  studentName = "John Doe",
}) => {
  // Mock data for demonstration
  const quarterlyData = {
    math: [85, 87, 89, 91],
    english: [90, 92, 91, 93],
    filipino: [88, 90, 87, 89],
    tle: [92, 94, 93, 95],
    science: [87, 89, 90, 92],
    mapeh: [94, 95, 92, 94],
    esp: [89, 91, 88, 90],
    ap: [91, 93, 94, 96],
  };

  const subjects = Object.keys(quarterlyData);
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  // Calculate subject averages for pie chart
  const subjectAverages = subjects.map((subject) => {
    const grades = quarterlyData[subject as keyof typeof quarterlyData];
    return {
      subject: subject.toUpperCase(),
      average: grades.reduce((sum, grade) => sum + grade, 0) / grades.length,
    };
  });

  // Sort by average for better visualization
  subjectAverages.sort((a, b) => b.average - a.average);

  // Calculate max value for bar chart scaling
  const maxGrade = Math.max(
    ...Object.values(quarterlyData).flatMap((grades) => grades),
  );

  return (
    <Card className="w-full bg-background border-red-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {studentName}'s Performance Charts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger
              value="line"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Grade Trends
            </TabsTrigger>
            <TabsTrigger
              value="bar"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Subject Comparison
            </TabsTrigger>
            <TabsTrigger
              value="pie"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Performance Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="line" className="pt-4">
            <div className="h-[300px] w-full relative">
              {/* Line Chart - Using SVG for visualization */}
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <g transform="translate(50, 20)">
                  {/* Y-axis */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="250"
                    stroke="#666"
                    strokeWidth="1"
                  />
                  {/* X-axis */}
                  <line
                    x1="0"
                    y1="250"
                    x2="700"
                    y2="250"
                    stroke="#666"
                    strokeWidth="1"
                  />

                  {/* Y-axis labels */}
                  {[0, 25, 50, 75, 100].map((value, index) => (
                    <g key={index}>
                      <text
                        x="-25"
                        y={250 - (value / 100) * 250}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#888"
                      >
                        {value}
                      </text>
                      <line
                        x1="-5"
                        y1={250 - (value / 100) * 250}
                        x2="700"
                        y2={250 - (value / 100) * 250}
                        stroke="#444"
                        strokeWidth="0.5"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* X-axis labels (quarters) */}
                  {quarters.map((quarter, index) => (
                    <text
                      key={index}
                      x={index * 230 + 115}
                      y="270"
                      fontSize="12"
                      textAnchor="middle"
                      fill="#888"
                    >
                      {quarter}
                    </text>
                  ))}

                  {/* Lines for each subject */}
                  {subjects.map((subject, subjectIndex) => {
                    const grades =
                      quarterlyData[subject as keyof typeof quarterlyData];
                    const points = grades
                      .map(
                        (grade, index) =>
                          `${index * 230 + 115},${250 - (grade / 100) * 250}`,
                      )
                      .join(" ");

                    const colors = [
                      "#ef4444",
                      "#3b82f6",
                      "#22c55e",
                      "#eab308",
                      "#8b5cf6",
                      "#ec4899",
                      "#14b8a6",
                      "#f97316",
                    ];

                    return (
                      <g key={subject}>
                        <polyline
                          points={points}
                          fill="none"
                          stroke={colors[subjectIndex % colors.length]}
                          strokeWidth="2"
                        />
                        {grades.map((grade, index) => (
                          <circle
                            key={index}
                            cx={index * 230 + 115}
                            cy={250 - (grade / 100) * 250}
                            r="4"
                            fill={colors[subjectIndex % colors.length]}
                          />
                        ))}
                        <text
                          x="720"
                          y={250 - (grades[3] / 100) * 250}
                          fontSize="12"
                          fill={colors[subjectIndex % colors.length]}
                          dominantBaseline="middle"
                        >
                          {subject.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </TabsContent>

          <TabsContent value="bar" className="pt-4">
            <div className="h-[300px] w-full relative">
              {/* Bar Chart - Using SVG for visualization */}
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <g transform="translate(50, 20)">
                  {/* Y-axis */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="250"
                    stroke="#666"
                    strokeWidth="1"
                  />
                  {/* X-axis */}
                  <line
                    x1="0"
                    y1="250"
                    x2="700"
                    y2="250"
                    stroke="#666"
                    strokeWidth="1"
                  />

                  {/* Y-axis labels */}
                  {[0, 25, 50, 75, 100].map((value, index) => (
                    <g key={index}>
                      <text
                        x="-25"
                        y={250 - (value / 100) * 250}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#888"
                      >
                        {value}
                      </text>
                      <line
                        x1="-5"
                        y1={250 - (value / 100) * 250}
                        x2="700"
                        y2={250 - (value / 100) * 250}
                        stroke="#444"
                        strokeWidth="0.5"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Bars for each subject's average */}
                  {subjectAverages.map((item, index) => {
                    const barWidth = 60;
                    const gap = 25;
                    const totalWidth = barWidth + gap;
                    const x = index * totalWidth;

                    // Calculate color based on average
                    let color = "#ef4444"; // red
                    if (item.average >= 90)
                      color = "#22c55e"; // green
                    else if (item.average >= 80)
                      color = "#3b82f6"; // blue
                    else if (item.average >= 75) color = "#eab308"; // yellow

                    return (
                      <g key={item.subject}>
                        <rect
                          x={x}
                          y={250 - (item.average / 100) * 250}
                          width={barWidth}
                          height={(item.average / 100) * 250}
                          fill={color}
                          rx="2"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={250 - (item.average / 100) * 250 - 10}
                          fontSize="12"
                          textAnchor="middle"
                          fill="#fff"
                        >
                          {Math.round(item.average)}
                        </text>
                        <text
                          x={x + barWidth / 2}
                          y="270"
                          fontSize="12"
                          textAnchor="middle"
                          fill="#888"
                        >
                          {item.subject}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </TabsContent>

          <TabsContent value="pie" className="pt-4">
            <div className="h-[300px] w-full relative flex justify-center">
              {/* Pie Chart - Using SVG for visualization */}
              <svg className="w-[300px] h-[300px]" viewBox="0 0 100 100">
                <g transform="translate(50, 50)">
                  {/* Create pie segments */}
                  {(() => {
                    const total = subjectAverages.reduce(
                      (sum, item) => sum + item.average,
                      0,
                    );
                    let startAngle = 0;

                    const colors = [
                      "#ef4444",
                      "#3b82f6",
                      "#22c55e",
                      "#eab308",
                      "#8b5cf6",
                      "#ec4899",
                      "#14b8a6",
                      "#f97316",
                    ];

                    return subjectAverages.map((item, index) => {
                      const percentage = (item.average / total) * 100;
                      const angle = (percentage / 100) * 360;
                      const endAngle = startAngle + angle;

                      // Convert angles to radians for SVG arc
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;

                      // Calculate arc points
                      const x1 = 40 * Math.cos(startRad);
                      const y1 = 40 * Math.sin(startRad);
                      const x2 = 40 * Math.cos(endRad);
                      const y2 = 40 * Math.sin(endRad);

                      // Determine if the arc should be drawn as a large arc
                      const largeArcFlag = angle > 180 ? 1 : 0;

                      // Create SVG arc path
                      const pathData = [
                        `M ${x1} ${y1}`, // Move to start point
                        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Draw arc
                        "L 0 0", // Line to center
                        "Z", // Close path
                      ].join(" ");

                      // Calculate label position
                      const labelRad = (startRad + endRad) / 2;
                      const labelX = 20 * Math.cos(labelRad);
                      const labelY = 20 * Math.sin(labelRad);

                      const result = (
                        <g key={item.subject}>
                          <path
                            d={pathData}
                            fill={colors[index % colors.length]}
                          />
                          {percentage > 5 && (
                            <text
                              x={labelX}
                              y={labelY}
                              fontSize="3"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                            >
                              {Math.round(percentage)}%
                            </text>
                          )}
                        </g>
                      );

                      // Update start angle for next segment
                      startAngle = endAngle;
                      return result;
                    });
                  })()}
                </g>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 p-2">
                {subjectAverages.map((item, index) => {
                  const colors = [
                    "#ef4444",
                    "#3b82f6",
                    "#22c55e",
                    "#eab308",
                    "#8b5cf6",
                    "#ec4899",
                    "#14b8a6",
                    "#f97316",
                  ];

                  return (
                    <div
                      key={item.subject}
                      className="flex items-center text-xs"
                    >
                      <div
                        className="w-3 h-3 mr-1 rounded-sm"
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      ></div>
                      <span>
                        {item.subject}: {Math.round(item.average)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceCharts;
