function removeDuplicates<T>(arr: T[]): T[] {
  const hashTable: {
    [key: string]: any;
  } = {};
  return arr.filter(function (el) {
    
    const key = JSON.stringify(el);
    const match = Boolean(hashTable[key]);
    return match ? false : (hashTable[key] = true);
  });
}
export default removeDuplicates;
