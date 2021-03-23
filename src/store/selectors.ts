import { InitialProps } from "../types/state";

export const getData = (state: InitialProps) => state.data;
export const getdataGrouped = (state: InitialProps) => state.dataGrouped;
export const getInputTeg = (state: InitialProps) => state.inputTeg;
export const getLoadError = (state: InitialProps) => state.loadError;
export const getButtonDisabled = (state: InitialProps) => state.buttonDisabled;
