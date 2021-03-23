type initialProps = {
  data: Array<any>;
  dataGrouped: object;
  inputTeg: string;
  loadError: boolean;
  buttonDisabled: boolean;
};

export const pushElement = (
  array: Array<any>,
  element: Object
): Array<Object> => [...array, element];

export const groupBy = (key: string) => (array: Array<any>) => {
  return array.reduce((acc, obj) => {
    const property = obj[key];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

export const objectIsEmpty = (obj: {}) => {
  return Object.keys(obj).length === 0;
};

export const extend = (target: initialProps, update: object): initialProps =>
  Object.assign({}, target, update);
