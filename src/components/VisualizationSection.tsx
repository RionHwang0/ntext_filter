import React from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

interface VisualizationSectionProps {
  documentData: {
    title: string;
    keyPoints: string[];
    sections: {
      title: string;
      count: number;
    }[];
    importanceData: {
      name: string;
      value: number;
    }[];
    trendsData: {
      name: string;
      value: number;
    }[];
  };
}

const COLORS = ['#3182f6', '#4dabf7', '#74c0fc', '#a5d8ff', '#e7f0fe'];

const VisualizationSection: React.FC<VisualizationSectionProps> = ({ documentData }) => {
  return (
    <div className="space-y-8">
      {/* 주요 포인트 요약 */}
      <div className="bg-white rounded-xl shadow-toss p-6">
        <h2 className="text-lg font-bold text-toss-black mb-4">주요 포인트</h2>
        <div className="space-y-2">
          {documentData.keyPoints.map((point, idx) => (
            <div key={idx} className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-toss-blue text-white flex items-center justify-center mr-3 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-toss-gray-dark">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션별 분포 차트 */}
      <div className="bg-white rounded-xl shadow-toss p-6">
        <h2 className="text-lg font-bold text-toss-black mb-4">섹션별 분포</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={documentData.sections}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
              <Bar dataKey="count" fill="#3182f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 중요도 분포 차트 */}
      <div className="bg-white rounded-xl shadow-toss p-6">
        <h2 className="text-lg font-bold text-toss-black mb-4">핵심 개념 중요도</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={documentData.importanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {documentData.importanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 트렌드 차트 */}
      <div className="bg-white rounded-xl shadow-toss p-6">
        <h2 className="text-lg font-bold text-toss-black mb-4">시간에 따른 트렌드</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={documentData.trendsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3182f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VisualizationSection; 