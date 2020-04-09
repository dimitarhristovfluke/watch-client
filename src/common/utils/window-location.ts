export const getBrowserLanguage = () => window.navigator.language;
export const getWindowLocation = () => window.location;
export const getLocationOrigin = () => window.location.origin;
export const setLocationHref = (url: string): void => {
  window.location.href = url;
};

export const getUserAgent = () => window.navigator.userAgent;
