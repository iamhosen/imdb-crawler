export const isElementExist = ($div: JQuery<HTMLElement>, selector: string) =>
  !!$div.find(selector).length;

export const getElementText = ($div: JQuery<HTMLElement>, selector: string) =>
  $div.find(selector).length ? $div.find(selector).text() : "";

export const getElementSrc = ($div: JQuery<HTMLElement>, selector: string) =>
  $div.find(selector).length ? $div.find(selector).attr("src") : "";

export const getElementHref = ($div: JQuery<HTMLElement>, selector: string) =>
  $div.find(selector).length ? $div.find(selector).attr("href") : "";

export const getElement = ($div: JQuery<HTMLElement>, selector: string) =>
  $div.find(selector).length ? $div.find(selector) : "";
