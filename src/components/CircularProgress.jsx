import React from "react";

const CircularProgressComp = ({ totalOrders = 0, maxOrders = 1 }) => {
  // Ensure maxOrders is not zero to avoid division by zero
  const validMaxOrders = maxOrders === 0 ? 1 : maxOrders;
  
  const percent = (totalOrders / validMaxOrders) * 100;
  const radius = 65;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg className="circularProgress" height={radius * 2} width={radius * 2}>
      <circle
        stroke="#2d3250"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#d6ab33"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="#000"
        strokeWidth="1px"
        dy=".3em"
        fontSize="25px"
      >
        {totalOrders}
      </text>
    </svg>
  );
};

export default CircularProgressComp;
