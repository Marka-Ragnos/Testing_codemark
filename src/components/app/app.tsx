import React, { useState } from "react";
// import { getResource } from "../../api";
import { pushElement, groupBy, objectIsEmpty } from "../../utils";
import Modal from "../modal";
import CardsList from "../cards-list";
import { connect } from "react-redux";
import { InitialProps, Actions } from "../../types/state";
import { getData, getdataGrouped, getInputTeg, getLoadError, getButtonDisabled } from '../../store/selectors';
import { Dispatch } from "redux";
import { Operation } from "../../store/reducer";




const App: React.FC<InitialProps> = ({
  data,
  dataGrouped,
  inputTeg,
  loadError,
  buttonDisabled,
}) => {
  
  // const [state, setState] = useState<Array<any>>([]);
  // const [stateGrouped, setStateGrouped] = useState<Object>({});
  // const [inputTeg, setInputTeg] = useState("");
  // const [loadError, setLoadError] = useState(false);
  // const [buttonDisabled, setbuttonDisabled] = useState(false);

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
  //   evt.preventDefault();
  //   setbuttonDisabled(true);
  //   const brokenText = inputTeg.split(/,\s*/);
  //   brokenText.forEach((request) => {
  //     getResource(request).then(({ data: { data } }) => {
  //       const imageData: {
  //         id: number;
  //         imageUrl: string;
  //         category: string;
  //       } = {
  //         id: state.length + 1,
  //         imageUrl: data.image_url,
  //         category: request,
  //       };
  //       data.length === 0
  //         ? setLoadError(true)
  //         : setState(pushElement(state, imageData));
  //       setbuttonDisabled(false);
  //     });
  //   });
  // };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setbuttonDisabled(true);
    const brokenText = inputTeg.split(/,\s*/);
    brokenText.forEach((request) => {
      getResource(request).then(({ data: { data } }) => {
        const imageData: {
          id: number;
          imageUrl: string;
          category: string;
        } = {
          id: state.length + 1,
          imageUrl: data.image_url,
          category: request,
        };
        data.length === 0
          ? setLoadError(true)
          : setState(pushElement(state, imageData));
        setbuttonDisabled(false);
      });
    });
  };

  const handleGrouping = (state: Array<any>): void => {
    const key: string = "category";
    const stateFinished = groupBy(key)(state);

    if (state.length === 0) {
      return;
    }
    if (!objectIsEmpty(stateGrouped)) {
      setStateGrouped("");
      return;
    }

    setStateGrouped(stateFinished);
  };

  const handleTakeCategory = (evt: React.SyntheticEvent): void => {
    const category = evt.currentTarget.getAttribute("alt");
    setInputTeg(String(category));
  };

  const handleModalClose = (): void => {
    setLoadError(false);
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = evt.target.value.replace(/[^A-Za-z,\s]/g, "");
    setInputTeg(target);
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

const mapStateToProps = (state: InitialProps) => ({
  data: getData(state),
  dataGrouped: getdataGrouped(state),
  inputTeg: getInputTeg(state),
  loadError: getLoadError(state),
  buttonDisabled: getButtonDisabled(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  getResource: () => dispatch(Operation.getResource(inputTeg, data)),
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
