export const sortByName = (array: any[]) => {
  return array.sort((a, b) => a.name.localeCompare(b.name));
}
