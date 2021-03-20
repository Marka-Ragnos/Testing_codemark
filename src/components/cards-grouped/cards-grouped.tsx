import React from "react";
import Card from "../card";

type stateProps = {
  state: Object;
  handleTakeCategory: Function;
};

type itemProps = {
  id: number;
  imageUrl: string;
  category: string;
};

const CardsGrouped: React.FC<stateProps> = ({ state, handleTakeCategory }) => {
  return (
    <>
      {Object.entries(state).map(([key, value]) => (
        <React.Fragment key={key + Math.random()}>
          <h1>{key}</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {value.map((item: itemProps) => (
              <Card
                key={item.id}
                card={item}
                handleTakeCategory={handleTakeCategory}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default CardsGrouped;
