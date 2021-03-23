import React from "react";
import CardsGrouped from "../cards-grouped";
import CardsUnGrouped from "../cards-un-grouped";

type stateProps = {
  state:
    | Array<{
        id: number;
        imageUrl: string;
        category: string;
      }>
    | Object;
  handleTakeCategory: Function;
};

const CardsList: React.FC<stateProps> = ({ state, handleTakeCategory }) => {
  const state = useSelector(state => state)
  return (
    <>
      {Array.isArray(state) ? (
        <CardsUnGrouped state={state} handleTakeCategory={handleTakeCategory} />
      ) : (
        <CardsGrouped state={state} handleTakeCategory={handleTakeCategory} />
      )}
    </>
  );
};

export default CardsList;
