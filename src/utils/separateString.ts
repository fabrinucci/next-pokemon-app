export const separateString = (str: string) => {
  const isNotSeparate = str.includes('-');
  if (isNotSeparate) {
    return str.split('-').join(' ');
  }
  return str;
};
