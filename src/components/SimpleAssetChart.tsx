import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// 자산 구성 데이터
const assetAllocationData = [
  { name: "주식", value: 597, percent: 62.01, color: "#0088FE" },
  { name: "어음", value: 286, percent: 29.77, color: "#00C49F" },
  { name: "채권", value: 150, percent: 15.57, color: "#FFBB28" },
  { name: "장내 파생상품", value: 65, percent: 6.71, color: "#FF8042" },
  { name: "장외 파생상품", value: -135, percent: -14.06, color: "#FF0000" },
];

// 주식 세부 구성 데이터
const stockDetailsData = [
  { name: "Apple", value: 7.2, sector: "IT", color: "#8884d8" },
  { name: "Microsoft", value: 6.5, sector: "IT", color: "#83a6ed" },
  { name: "Amazon", value: 3.5, sector: "소비재", color: "#8dd1e1" },
  { name: "NVIDIA", value: 3.3, sector: "IT", color: "#82ca9d" },
  { name: "Alphabet", value: 4.1, sector: "커뮤니케이션", color: "#a4de6c" },
];

const SimpleAssetChart: React.FC = () => {
  const [showStockDetails, setShowStockDetails] = useState(false);
  
  // 주식 섹션 클릭 핸들러
  const handlePieClick = (data: any, index: number) => {
    // 클릭한 항목이 주식인지 확인
    if (data && data.name === "주식") {
      setShowStockDetails(true);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">모투자신탁 자산 구성</h2>
      
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={handlePieClick}
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend onClick={(e) => {
                  if (e && e.dataKey === "주식") {
                    setShowStockDetails(true);
                  }
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">자산 항목</th>
                  <th className="border p-2 text-right">금액 (억원)</th>
                  <th className="border p-2 text-right">자산 비중 (%)</th>
                </tr>
              </thead>
              <tbody>
                {assetAllocationData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${item.name === "주식" ? "cursor-pointer hover:bg-blue-50" : ""}`}
                    onClick={() => {
                      if (item.name === "주식") {
                        setShowStockDetails(true);
                      }
                    }}
                  >
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 text-right">{item.value}</td>
                    <td className="border p-2 text-right">{item.percent}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border p-2">총계</td>
                  <td className="border p-2 text-right">962</td>
                  <td className="border p-2 text-right">100.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {showStockDetails && (
          <div className="w-full lg:w-1/2 lg:pl-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">주식 세부 구성</h3>
              <button 
                onClick={() => setShowStockDetails(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm">닫기</span>
              </button>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockDetailsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stockDetailsData.map((entry, index) => (
                      <Cell key={`cell-stock-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-auto mt-4">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">종목명</th>
                    <th className="border p-2 text-right">비중 (%)</th>
                    <th className="border p-2 text-left">섹터</th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetailsData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2 text-right">{item.value}</td>
                      <td className="border p-2">{item.sector}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAssetChart; 