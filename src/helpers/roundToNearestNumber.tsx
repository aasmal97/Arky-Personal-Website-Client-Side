const round = (number: number, decimalPlaces: number) => {
  const factorOfTen = Math.pow(10, decimalPlaces);
  const num = Math.round(number / factorOfTen) * factorOfTen;
  return num;
};
export function roundToNearest({
  number,
  toString,
  decimalPlaces = 1,
}: {
  number: number;
  toString?: boolean;
  decimalPlaces?: number;
}) {
  let num: string | number;
  if (number > 1000000) {
    num = round(number, 6 - decimalPlaces);
    if (toString) num = (num / 1000000).toString() + "mil+";
  } else if (number > 1000) {
    num = round(number, 3 - decimalPlaces);
    if (toString) num = (num / 1000).toString() + "k+";
  } else if (number > 100) {
    num = round(number, decimalPlaces);
    if (toString) num = num.toString() + (num < number ? "+" : "");
  } else {
    num = number;
  }
  return num;
}
