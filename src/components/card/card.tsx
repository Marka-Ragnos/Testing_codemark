import React from "react";

type cardProps = {
	card: {
		imageUrl: string;
		category: string;
	}
};

const Card: React.FC<cardProps> = ({ card }) => {
  return (
    <div className="card">
      <img
				src={card.imageUrl}
				className="card-img-top"
				alt={card.category}
      ></img>
    </div>
  );
};

export default Card;
