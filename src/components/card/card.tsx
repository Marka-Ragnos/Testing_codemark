import React from "react";

type cardProps = {
  card: {
    id: number;
    imageUrl: string;
    category: string;
  };
  handleTakeCategory: Function;
};

const Card: React.FC<cardProps> = ({ card, handleTakeCategory }) => {
  return (
    <div className="card">
      <img
        src={card.imageUrl}
        className="card-img-top"
        alt={card.category}
        onClick={(evt) => handleTakeCategory(evt)}
      ></img>
    </div>
  );
};

export default Card;
