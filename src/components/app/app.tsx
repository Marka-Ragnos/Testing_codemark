import React, { useState } from "react";
import { getResource } from "../../api";
import { pushElement, groupBy, objectIsEmpty } from "../../utils";
import Modal from "../modal";
import CardsList from "../cards-list";


const App: React.FC = () => {
  const [state, setState] = useState<Array<any>>([]);
  const [stateGrouped, setStateGrouped] = useState<Object>({});
  const [inputTeg, setInputTeg] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setbuttonDisabled(true);
    getResource(inputTeg).then(({ data: { data } }) => {
      const imageData: { id: number; imageUrl: string; category: string } = {
        id: state.length + 1,
        imageUrl: data.image_url,
        category: inputTeg,
      };
      data.length === 0
        ? setLoadError(true)
        : setState(pushElement(state, imageData));
      setbuttonDisabled(false);
      console.log(state);
    });
  };

  const handleGrouping = (state: Array<any>): void => {
    if (state.length === 0) {
      return;
    }
    if (!objectIsEmpty(stateGrouped)) {
      setStateGrouped("");
      return;
    }

    const key: string = "category";
    const stateFinished = groupBy(key)(state);
    setStateGrouped(stateFinished);
    console.log(stateFinished, state);
  };

  const handleTakeCategory = (evt: React.SyntheticEvent): void => {
    const category = evt.currentTarget.getAttribute('alt');
    setInputTeg(String(category));
  };

  const handleModalClose = (): void => {
    setLoadError(false);
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputTeg(evt.target.value);
  };

  const handleInputReset = (): void => {
    setInputTeg("");
    setState([]);
    setStateGrouped("");
  };

  return (
    <>
      <Modal error={loadError} handleModalClose={handleModalClose} />
      <div className="container w-75 my-3">
        <form className="row" onSubmit={(evt) => handleSubmit(evt)}>
          <div className="col-5 position-relative">
            <input
              className="form-control"
              type="text"
              required
              value={inputTeg}
              onChange={(evt) => handleInputChange(evt)}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-success mb-3"
              disabled={buttonDisabled}
            >
              {`${buttonDisabled ? "Загрузка..." : "Загрузить"}`}
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-danger mb-3"
              onClick={() => handleInputReset()}
            >
              Очистить
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => handleGrouping(state)}
            >
              {!objectIsEmpty(stateGrouped)
                ? "Разгруппировать"
                : "Группировать"}
            </button>
          </div>
        </form>
        <CardsList
          state={objectIsEmpty(stateGrouped) ? state : stateGrouped}
          handleTakeCategory={handleTakeCategory}
        />
      </div>
    </>
  );
};

export default App;
