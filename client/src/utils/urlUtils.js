export const buildUrl = (url) => {
  return url.includes('//') ? url : '//' + url
}
