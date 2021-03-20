import React from "react";
import Card from "../card";

type stateProps = {
  state: Array<{
    id: number;
    imageUrl: string;
    category: string;
  }>;
  handleTakeCategory: Function;
};

const CardsUnGrouped: React.FC<stateProps> = ({
  state,
  handleTakeCategory,
}) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {state.map((item) => (
          <Card
            key={item.id}
            card={item}
            handleTakeCategory={handleTakeCategory}
          />
        ))}
      </div>
    </>
  );
};

export default CardsUnGrouped;
