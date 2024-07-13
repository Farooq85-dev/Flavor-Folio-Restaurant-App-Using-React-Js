import "../index.scss";

const CircularProgressComp = ({ totalOrders, maxOrders }) => {
  const percent = (totalOrders / maxOrders) * 100;
  const radius = 65;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg
      className="circularPrpgressCircles"
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke="#bccbf6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#d8ac1d"
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
