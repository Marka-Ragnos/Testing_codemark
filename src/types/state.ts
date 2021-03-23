export interface InitialProps {
  data: any[];
  dataGrouped: object;
  inputTeg: string;
  loadError: boolean;
  buttonDisabled: boolean;
}

export enum ActionType {
  SET_DATA = `SET_DATA`,
  SET_DATA_GROUPED = `SET_DATA_GROUPED`,
  SET_INPUT_TAG = `SET_INPUT_TAG`,
  SET_LOAD_ERROR = `SET_LOAD_ERROR`,
  SET_BUTTON_DISABLED = `SET_BUTTON_DISABLED`,
}

interface setData {
  type: ActionType.SET_DATA;
  payload: any[];
}

interface setDataGrouped {
  type: ActionType.SET_DATA_GROUPED;
  payload: object;
}

interface setInputTeg {
  type: ActionType.SET_INPUT_TAG;
  payload: string;
}

interface setLoadError {
  type: ActionType.SET_LOAD_ERROR;
  payload: boolean;
}

interface setButtonDisabled {
  type: ActionType.SET_BUTTON_DISABLED;
  payload: boolean;
}

export type Actions =
  | setData
  | setDataGrouped
  | setInputTeg
  | setLoadError
  | setButtonDisabled;
