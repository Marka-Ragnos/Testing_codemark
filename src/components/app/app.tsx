import React, { useState } from "react";
import { getResource } from "../../api";
import { pushElement } from "../../utils";
import Modal from "../modal/modal";

const App: React.FC = () => {
  const [state, setState] = useState<Array<string>>([]);
  const [inputTeg, setInputTeg] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setbuttonDisabled(true);
    getResource(inputTeg).then(({ data: { data } }) => {
      data.length === 0
        ? setLoadError(true)
        : setState(pushElement(state, data.image_url));
      setbuttonDisabled(false);

      console.log(state);
    });
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
              {`${buttonDisabled ? 'Загрузка...' : 'Загрузить'}`}
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
            <button type="button" className="btn btn-primary mb-3">
              Группировать
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
