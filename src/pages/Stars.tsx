import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 10,
  starCount = 5,
}) => {
  const starsToFill = (rating / maxRating) * starCount;

  const renderStar = (index: number) => {
    const fillLevel = Math.min(Math.max(starsToFill - index, 0), 1); 

    return (
      <svg
        key={index}
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        style={{ marginRight: 4 }}
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="#ccc"
        />
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="gold"
          style={{ clipPath: `inset(0 ${100 - fillLevel * 100}% 0 0)` }}
        />
      </svg>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(starCount)].map((_, i) => renderStar(i))}
      <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 18 , color:"white" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
