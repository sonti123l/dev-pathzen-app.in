export const arrayToUrlString = (key: string, value: unknown[]) => {
  const arrayUrl = value.map((item: unknown) => {
    return `${key}=${item}`;
  });
  return arrayUrl.join("&");
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareURLEncodedParams = (url: string, params: Record<string, any>) => {
  const paramsArray = Object.keys(params)
    .map((key) => {
      const value = params[key];

      if (value && value.length) {
        if (Array.isArray(value)) {
          return arrayToUrlString(key, value);
        }
        return `${key}=${params[key]}`;
      } else if (value) {
        return `${key}=${params[key]}`;
      } else {
        return "";
      }
    })
    .filter((e) => e.length);

  const paramsURLs = paramsArray.filter((e) => e).join("&");

  if (paramsURLs) {
    return url + "?" + paramsURLs;
  }
  return url;
};

export default prepareURLEncodedParams;
