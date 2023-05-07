import { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { HobbiesDocument } from "../utilities/types/RestApiTypes";
import { fetchHobbiesData } from "../utilities/asyncActions/HobbiesActions";
import shuffleArray from "../utilities/helpers/shuffleArray";
import { generateRandomNumber } from "../utilities/helpers/generateRandomNum";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
import { isNull } from "lodash";
export type HobbiesDocumentWithDuration = HobbiesDocument & {
  duration?: number;
};
type HobbiesImgInterval = HobbiesDocumentWithDuration[];
const generateImgMap = (newImages: HobbiesImgInterval) => {
  const newMap: {
    [key: string]: {
      orientation: string;
      img: HobbiesDocumentWithDuration;
    };
  } = {};
  newImages.forEach((e) => {
    newMap[e.id] = {
      orientation: e.orientation,
      img: e,
    };
  });
  return newMap;
};
export const matchElWithImage = (
  arr: { rect: JSX.Element }[],
  images: HobbiesImgInterval
) => {
  //this prevents any errors from two arrs of different lengths
  if (arr.length !== images.length) return [];
  const newArr = [...arr];
  const newImages = [...images];
  const onlyImagesArr = newImages;
  const map = generateImgMap(onlyImagesArr);
  const newRectArr: {
    rect: JSX.Element;
    img: HobbiesDocumentWithDuration;
    orientation: "vertical" | "horizontal";
  }[] = [];
  for (let i of newArr) {
    const remaining = Object.entries(map);
    const width =
      typeof i.rect.props.width === "string"
        ? parseFloat(i.rect.props.width)
        : i.rect.props.width;
    const height =
      typeof i.rect.props.height === "string"
        ? parseFloat(i.rect.props.height)
        : i.rect.props.height;
    const orientation = width / height > 1 ? "horizontal" : "vertical";
    for (let [key, value] of remaining) {
      if (value.orientation === orientation) {
        newRectArr.push({
          rect: i.rect,
          img: value.img,
          orientation,
        });
        delete map[key];
        break;
      }
    }
  }
  return newRectArr;
};
type HobbiesImagesGetNewProps = {
  setStatus: React.Dispatch<
    React.SetStateAction<"loading" | "error" | "success">
  >;
  orientation: "horizontal" | "vertical";
  setImgs: React.Dispatch<React.SetStateAction<HobbiesDocumentWithDuration[]>>;
  setImgsKey: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  durationTimerInterval: [number, number];
  imgsKey?: string;
};
const hobbiesImagesGetNew = async ({
  setStatus,
  orientation,
  setImgs,
  setImgsKey,
  durationTimerInterval,
  imgsKey,
}: HobbiesImagesGetNewProps) => {
  setStatus("loading");
  //fetch new documents
  // const res: HobbiesDocumentWithDuration[] = [];
  // setImgs(res);
  const res = await fetchHobbiesData({
    query: {
      orientation: orientation,
    },
    lastEvaluatedKey: imgsKey,
  });
  //shuffle array
  const shuffledItems = res ? shuffleArray(res.result.Items) : [];
  unstable_batchedUpdates(() => {
    setStatus("success");
    setImgs((imgWithDuration) => {
      //assign duration timers
      const newArrWithoutTimers = [
        ...imgWithDuration.map((imgDoc) => {
          const newImg = { ...imgDoc };
          delete newImg.duration;
          return newImg;
        }),
        ...shuffledItems,
      ];
      // remove duplicates
      const filteredArr = removeDuplicates(newArrWithoutTimers);
      const addTimers = filteredArr.map((imgDoc, idx) => ({
        ...imgDoc,
        duration:
          imgWithDuration.length > idx
            ? imgWithDuration[idx].duration
            : generateRandomNumber(
                durationTimerInterval[0],
                durationTimerInterval[1]
              ),
      }));
      return addTimers;
    });
    setImgsKey(
      res
        ? res.result.LastEvaluatedKey
          ? JSON.stringify(res.result.LastEvaluatedKey)
          : null
        : null
    );
  });
};
type HobbiesImgsLookAheadProps = {
  orientation: "horizontal" | "vertical";
  imgsKey?: string | null;
  items: HobbiesDocumentWithDuration[];
  currIdx: number;
};
const hobbiesImgsLookAhead = async ({
  orientation,
  items,
  imgsKey,
  durationTimerInterval,
  currIdx,
  setStatus,
  setImgs,
  setImgsKey,
}: HobbiesImgsLookAheadProps & HobbiesImagesGetNewProps) => {
  //do a lookahead
  const nextIdx = currIdx + 1;
  //check if next pointer requires more items
  if (nextIdx >= items.length) {
    //check if there's a definitive end to list
    if (isNull(imgsKey)) return;
    //fetch new images
    await hobbiesImagesGetNew({
      setStatus,
      orientation,
      imgsKey,
      setImgs,
      setImgsKey,
      durationTimerInterval,
    });
  }
};
const useHobbiesImagesType = ({
  intervalCount,
  orientation,
  durationInterval,
}: {
  intervalCount: number;
  orientation: "vertical" | "horizontal";
  durationInterval: [number, number];
}) => {
  const [currIdx, setCurrIdx] = useState(0);
  const [imgs, setImgs] = useState<HobbiesDocumentWithDuration[]>([]);
  const [imgsKey, setImgsKey] = useState<string | null | undefined>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [startDuration, endDuration] = durationInterval;
  const initialImgsInterval = imgs.slice(0, intervalCount).map((e) => {
    return {
      ...e,
      duration: generateRandomNumber(startDuration, endDuration),
    };
  });

  useEffect(() => {
    unstable_batchedUpdates(() => {
      hobbiesImgsLookAhead({
        orientation,
        items: [],
        currIdx: 0,
        setStatus,
        setImgs,
        setImgsKey,
        durationTimerInterval: [startDuration, endDuration],
      });
      setCurrIdx(intervalCount);
    });
  }, [startDuration, endDuration, orientation, intervalCount]);
  const nextItem = async () => {
    //we loop back when we reach
    //the definitive end
    const setCurrentIdxPromise: Promise<number> = new Promise((resolve) => {
      setCurrIdx((idx) => {
        let newIdx: number = idx + 1;
        if (newIdx >= imgs.length) newIdx = 0;
        resolve(newIdx);
        return newIdx;
      });
    });
    const newIdx = await setCurrentIdxPromise;
    if (!imgsKey) return imgs?.[newIdx];
    hobbiesImgsLookAhead({
      orientation,
      items: imgs,
      currIdx: newIdx,
      imgsKey,
      setStatus,
      setImgs,
      setImgsKey,
      durationTimerInterval: durationInterval,
    });
    return imgs?.[newIdx];
  };
  return {
    currIdx,
    nextItem,
    status,
    initialImgsInterval,
  };
};
const useHobbiesImages = ({
  vertical,
  horizontal,
}: {
  vertical: {
    durationInterval: [number, number];
    count: number;
  };
  horizontal: {
    durationInterval: [number, number];
    count: number;
  };
}) => {
  const {
    nextItem: horizontalNextItem,
    initialImgsInterval: horizontalInitialImgs,
  } = useHobbiesImagesType({
    orientation: "horizontal",
    durationInterval: horizontal.durationInterval,
    intervalCount: horizontal.count,
  });
  const {
    nextItem: verticalNextItem,
    initialImgsInterval: verticalInitialImgs,
  } = useHobbiesImagesType({
    orientation: "vertical",
    durationInterval: vertical.durationInterval,
    intervalCount: vertical.count,
  });
  return {
    horizontalNextItem,
    verticalNextItem,
    horizontalInitialImgs,
    verticalInitialImgs,
  };
};
export default useHobbiesImages;
