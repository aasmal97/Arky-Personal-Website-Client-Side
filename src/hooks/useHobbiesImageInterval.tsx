import { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { HobbiesDocument } from "../utilities/types/RestApiTypes";
import { fetchHobbiesData } from "../utilities/asyncActions/HobbiesActions";
import shuffleArray from "../utilities/helpers/shuffleArray";
import { generateRandomNumber } from "../utilities/helpers/generateRandomNum";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
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
  setImgsKey: React.Dispatch<React.SetStateAction<string | null>>;
  durationTimerInterval: [number, number];
};
const hobbiesImagesGetNew = async ({
  setStatus,
  orientation,
  setImgs,
  setImgsKey,
  durationTimerInterval,
}: HobbiesImagesGetNewProps) => {
  setStatus("loading");
  //fetch new documents
  const res = await fetchHobbiesData({
    query: {
      orientation: orientation,
    },
  });
  //shuffle array
  const shuffledItems = res ? shuffleArray(res.result.Items) : [];
  unstable_batchedUpdates(() => {
    setStatus("success");
    setImgs((e) => {
      //assign duration timers
      const addTimers = shuffledItems.map((e) => ({
        ...e,
        duration: generateRandomNumber(
          durationTimerInterval[0],
          durationTimerInterval[1]
        ),
      }));
      // remove duplicates
      const newArr = removeDuplicates([...e, ...addTimers]);
      return newArr;
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
    if (!imgsKey) return;
    // {
    //   return setCurrIdx(0);
    // }
    //fetch new images
    await hobbiesImagesGetNew({
      setStatus,
      orientation,
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
  const [imgsKey, setImgsKey] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const initialImgsInterval = imgs.slice(0, intervalCount);
  useEffect(() => {
    unstable_batchedUpdates(() => {
      hobbiesImgsLookAhead({
        orientation,
        items: [],
        currIdx: 0,
        setStatus,
        setImgs,
        setImgsKey,
        durationTimerInterval: durationInterval,
      });
      setCurrIdx(intervalCount);
    });
  }, [durationInterval, orientation, intervalCount]);
  const nextItem = () => {
    //we loop back when we reach
    //the definitive end
    if (!imgsKey) {
      setCurrIdx(0);
      return imgs?.[0];
    }
    setCurrIdx((idx) => idx + 1);
    hobbiesImgsLookAhead({
      orientation,
      items: imgs,
      currIdx: currIdx + 1,
      imgsKey,
      setStatus,
      setImgs,
      setImgsKey,
      durationTimerInterval: durationInterval,
    });
    //we know we aren't at the definitive end
    //but this allows us to return a value if we have colliding
    //interval values, and the new images we need havent finished
    //fetching yet
    if (currIdx + 1 >= imgs.length) return imgs?.[0];
    return imgs[currIdx + 1];
  };
  return {
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
