export const request = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const parsedRes = await res.json();
  return parsedRes;
};
