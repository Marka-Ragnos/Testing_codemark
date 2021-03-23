import { extend } from "../utils";
import { InitialProps, ActionType, Actions } from "../types/state";
import { pushElement } from "../utils";
import { AxiosInstance } from "axios";
import { Dispatch } from "redux";

const initialState: InitialProps = {
  data: [],
  dataGrouped: {},
  inputTeg: "",
  loadError: false,
  buttonDisabled: false,
};

export const ActionCreator = {
  setData: (data: object) => ({
    type: ActionType.SET_DATA,
    payload: data,
  }),
  setDataGrouped: (dataGrouped: object) => ({
    type: ActionType.SET_DATA_GROUPED,
    payload: dataGrouped,
  }),
  setInputTag: (text: string) => ({
    type: ActionType.SET_INPUT_TAG,
    payload: text,
  }),
  setLoadError: (isError: boolean) => ({
    type: ActionType.SET_LOAD_ERROR,
    payload: isError,
  }),
  setButtonDisabled: (isDisabled: boolean) => ({
    type: ActionType.SET_BUTTON_DISABLED,
    payload: isDisabled,
  }),
};

const reducer = (state = initialState, action: Actions): InitialProps => {
  switch (action.type) {
    case ActionType.SET_DATA:
      return extend(state, { data: action.payload });
    case ActionType.SET_DATA_GROUPED:
      return extend(state, { dataGrouped: action.payload });
    case ActionType.SET_INPUT_TAG:
      return extend(state, { inputTeg: action.payload });
    case ActionType.SET_LOAD_ERROR:
      return extend(state, { loadError: action.payload });
    case ActionType.SET_BUTTON_DISABLED:
      return extend(state, { buttonDisabled: action.payload });
    default:
      return state;
  }
};

export const Operation = {
  getResource: (tag: string) => (
    dispatch: Dispatch<Actions>,
    getState: () => InitialProps,
    api: AxiosInstance
  ) =>
    api
      .get(`${tag}`)
      .then(({ data: { data } }) => {
        dispatch(ActionCreator.setButtonDisabled(true));
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
          ? dispatch(ActionCreator.setLoadError(true))
          : dispatch(ActionCreator.setData(pushElement(state, imageData)));
        dispatch(ActionCreator.setButtonDisabled(false));
      })
      .catch(() => {
        throw new Error(`Произошла http ошибка`);
      }),
};

export default reducer;
