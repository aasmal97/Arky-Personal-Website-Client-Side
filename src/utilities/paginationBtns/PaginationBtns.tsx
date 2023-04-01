import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
export const getBtnArray = (
  btnInterval: number,
  activeBtn: number,
  endBtn: number
) => {
  const arr = Array(btnInterval).fill(0);
  const btnArr: number[] = [activeBtn];
  let btnArrLeft = 0;
  let btnArrRight = 0;
  let currNum: number;

  const addRight = () => {
    btnArrRight++;
    currNum = btnArrRight + activeBtn;
    btnArr.push(currNum);
  };
  const addLeft = () => {
    btnArrLeft++;
    let currNum = activeBtn - btnArrLeft;
    btnArr.unshift(currNum);
  };
  const iter = arr.length - 1;
  for (let i = 0; i < iter; i++) {
    if (arr.length % 2 !== 0) {
      if (btnArr[btnArr.length - 1] + 1 <= endBtn) addRight();
      else if (btnArr[0] - 1 > 0) addLeft();
    } else {
      if (btnArr[0] - 1 > 0) addLeft();
      else if (btnArr[btnArr.length - 1] + 1 <= endBtn) addRight();
    }
    arr.pop();
  }
  return btnArr;
};
const PaginationBtns = ({
  namespace,
  onChange,
  endBtn,
  activeBtn,
  btnInterval,
}: {
  namespace: string;
  onChange?: (e: { prev: number; curr: number }) => void;
  btnInterval: number;
  endBtn: number;
  activeBtn?: number;
}) => {
  const [active, setActive] = useState(
    typeof activeBtn === "number" && activeBtn > 0 ? activeBtn : 1
  );
  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;

    const idx = target.dataset.idx ? parseInt(target.dataset.idx) : active;
    setActive(idx);
    if (onChange) onChange({ prev: active, curr: idx });
  };
  //this allows for an active number to be passed in from outside
  useEffect(() => {
    if (typeof activeBtn === "number") setActive(activeBtn);
  }, [activeBtn]);
  const btnArr = getBtnArray(btnInterval, active, endBtn);
  const ellipsis = (
    <span className={`${namespace}-pagination-ellipsis`}>...</span>
  );
  const smallWindowWidth = useWindowWidth(575);
  return (
    <div className={`${namespace}-pagination`}>
      {!(active - 1 < 1) && (
        <button
          className={`${namespace}-pagination-btns-prev`}
          onClick={onBtnClick}
          data-idx={active - 1}
          aria-label="previous"
        >
          {smallWindowWidth ? "Prev" : <FontAwesomeIcon icon={faChevronLeft} />}
        </button>
      )}

      {btnArr[0] !== 1 && (
        <>
          <button
            className={`${namespace}-pagination-btns`}
            onClick={onBtnClick}
            data-idx={1}
          >
            {1}
          </button>
          {btnArr[0] - 1 !== 1 && ellipsis}
        </>
      )}
      {btnArr.map((idx) => (
        <button
          key={idx}
          onClick={onBtnClick}
          data-idx={idx}
          className={`${namespace}-pagination-btns ${
            idx === active ? "active" : ""
          }`}
          aria-label={
            idx === active ? `go-to-${idx}-page` : `current-pg-${idx}`
          }
        >
          {idx}
        </button>
      ))}
      {btnArr[btnArr.length - 1] !== endBtn && (
        <>
          {btnArr[btnArr.length - 1] + 1 !== endBtn && ellipsis}
          <button
            className={`${namespace}-pagination-btns`}
            onClick={onBtnClick}
            data-idx={endBtn}
          >
            {endBtn}
          </button>
        </>
      )}
      {!(active + 1 > endBtn) && (
        <button
          className={`${namespace}-pagination-btns-next`}
          onClick={onBtnClick}
          data-idx={active + 1}
          aria-label="next"
        >
          {smallWindowWidth ? (
            "Next"
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </button>
      )}
    </div>
  );
};
export default PaginationBtns;
