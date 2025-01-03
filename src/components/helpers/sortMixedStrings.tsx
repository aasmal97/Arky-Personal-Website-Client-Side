export function sortMixedStrings<T>(array: T[], sortKey: string) {
  return array.sort(function (a, b) {
    const newA = a as Record<string, any>;
    const newB = b as Record<string, any>;
    const aKey = newA[sortKey];
    const bKey = newB[sortKey];
    var re = /([0-9]+)/g;
    var aNums = aKey.match(re);
    var bNums = bKey.match(re);
    var aLetters = aKey.replace(re, "");
    var bLetters = bKey.replace(re, "");
    if (aLetters < bLetters) return -1;
    if (aLetters > bLetters) return 1;
    if (aLetters === bLetters) {
      if (!aNums) return -1;
      if (!bNums) return 1;
      aNums = aNums.map(Number);
      bNums = bNums.map(Number);
      for (var i = 0; i < Math.min(aNums.length, bNums.length); i++) {
        if (aNums[i] < bNums[i]) return -1;
        if (aNums[i] > bNums[i]) return 1;
      }
      if (aNums.length < bNums.length) return -1;
      if (aNums.length > bNums.length) return 1;
    }
    return 0;
  });
}
