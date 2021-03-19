import React from "react";
import Card from "../card";

type cardsListProps = {
  state: Array<{
    imageUrl: string;
    category: string;
  }>;
};

const CardsList: React.FC<cardsListProps> = ({ state }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {state.map((item, index) => (
        <Card key={index + item.imageUrl} card={item} />
      ))}
    </div>
  );
};

export default CardsList;
