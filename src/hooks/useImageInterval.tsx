import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";

export type Image = {
  id: string;
  placeholderSrc?: string;
  src: string;
  height: number | string;
  width: number | string;
  displayCount?: number | string;
};
export type ImageMap = {
  [key: string]: {
    displayCount: number;
    currActive: boolean;
    orientation: "vertical" | "horizontal";
    img: Image;
  };
};
export type UseImageIntervalProps = {
  fetchImgUrl: string;
  imgSet: number;
  verticalCount?: number;
  horizontalCount?: number;
  fetchParams?: { [key: string]: any };
};
export type ImageInterval = {
  interval: NodeJS.Timer | number | undefined;
  img: Image;
}[];
export const fetchImages = async (
  url: UseImageIntervalProps["fetchImgUrl"],
  params: UseImageIntervalProps["fetchParams"]
): Promise<
  | {
      images: Image[];
      collectionCount: number;
      numberPerFetch: number;
    }
  | undefined
> => {
  try {
    const { data } = await axios({ method: "get", url: url, params: params });
    return data;
  } catch (e) {
    console.error(e);
    return;
  }
};

const generateImgMap = (newImages: Image[]) => {
  const newMap: ImageMap = {};
  newImages.forEach((e) => {
    const imgWidth =
      typeof e.width === "string" ? parseFloat(e.width) : e.width;
    const imgHeight =
      typeof e.height === "string" ? parseFloat(e.height) : e.height;
    newMap[e.id] = {
      displayCount:
        typeof e.displayCount === "string"
          ? parseInt(e.displayCount)
          : e.displayCount
          ? e.displayCount
          : 0,
      currActive: false,
      orientation: imgWidth / imgHeight < 1 ? "vertical" : "horizontal",
      img: e,
    };
  });
  return newMap;
};
export const matchElWithImage = (
  arr: { rect: JSX.Element }[],
  images: ImageInterval
): { rect: JSX.Element; img: Image }[] => {
  //this prevents any errors from two arrs of different lengths
  if (arr.length !== images.length) return [];
  const newArr = [...arr];
  const newImages = [...images];
  const onlyImagesArr = newImages.map((e) => e.img);
  const map = generateImgMap(onlyImagesArr);
  const newRectArr: { rect: JSX.Element; img: Image }[] = [];
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
        });
        delete map[key];
        break;
      }
    }
  }
  return newRectArr;
};
const useImageInterval = ({
  fetchImgUrl,
  imgSet,
  verticalCount,
  horizontalCount,
  fetchParams,
}: UseImageIntervalProps) => {
  //we use to store params and url and use them in useEffect hooks, where
  //these don't change. If they change, all states should return to default
  const params = useRef(fetchParams ? fetchParams : {});
  const url = useRef(fetchImgUrl);
  const imagesMap = useRef<ImageMap>({});
  //store states
  const [imageInterval, setImgInterval] = useState<ImageInterval>([]);
  //this to prevent read the current interval, even in a use effect hook
  //and not trigger a re-render
  const imgIntervalRef = useRef<ImageInterval>([]);
  const [pageEnd, setPageEnd] = useState<number>(1);
  const [page, setPage] = useState<number>(0);
  //run when images change
  useEffect(() => {
    let imgCount = imgSet;
    let vertCount = verticalCount ? verticalCount : 0;
    let horizCount = horizontalCount ? horizontalCount : 0;
    const changeImg = (idx: number) => {
      //this is initially expensive but every image change it becomes faster
      //since images map get reduced in size
      const entries = Object.entries(imagesMap.current);
      if (entries.length <= 0) return setPage((r) => r + 1);
      const verticalEntries = entries.filter(
        ([key, value]) => value.orientation === "vertical"
      );
      const horizontalEntries = entries.filter(
        ([key, value]) => value.orientation === "horizontal"
      );
      let randomIdx: number;
      let item: Image;
      const newInterval = [...imgIntervalRef.current];
      if (vertCount && vertCount > 0 && verticalEntries.length > 0) {
        randomIdx = Math.round(Math.random() * (verticalEntries.length - 1));
        item = verticalEntries[randomIdx][1].img;
        vertCount--;
        delete imagesMap.current[item.id];
      } else if (horizCount && horizCount > 0 && horizontalEntries.length > 0) {
        randomIdx = Math.round(Math.random() * (horizontalEntries.length - 1));
        item = horizontalEntries[randomIdx][1].img;
        horizCount--;
        delete imagesMap.current[item.id];
      } else if (imgCount && imgCount > 0) {
        randomIdx = Math.round(Math.random() * (entries.length - 1));
        item = entries[randomIdx][1].img;
        delete imagesMap.current[item.id];
      } else {
        //we set the image back to the original, without changing it.
        item = newInterval[idx].img;
      }
      newInterval[idx] = { ...newInterval[idx], img: item };
      imgCount--;
      setImgInterval(() => {
        imgIntervalRef.current = newInterval;
        return newInterval;
      });
    };
    const newImgInterval: ImageInterval[number]["interval"][] =
      imgIntervalRef.current.map((a, idx) => {
        const max = 120;
        const min = 15;
        const randomTimer = (Math.random() * (max - min) + min) * 1000;
        return setInterval(() => changeImg(idx), randomTimer);
      });
    return () => {
      //clean up all interval timers
      newImgInterval.map((e) => clearInterval(e));
    };
  }, [verticalCount, horizontalCount, imgSet]);
  //run on mount or when params change
  useEffect(() => {
    url.current = fetchImgUrl;
    params.current = fetchParams ? fetchParams : {};
    fetchImages(fetchImgUrl, fetchParams).then((res) => {
      if (!res) return;
      const newImages = res.images.map((e) => ({ ...e, displayCount: 0 }));
      const newMap = generateImgMap(newImages);
      unstable_batchedUpdates(() => {
        imagesMap.current = newMap;
        setPageEnd(res.collectionCount / res.numberPerFetch);
        setPage(1);
      });
    });
  }, [fetchImgUrl, fetchParams]);
  //when page changes
  useEffect(() => {
    //reset the fetch loop
    if (page > pageEnd) {
      return setPage(1);
    }
    params.current.page = page;
    //this prevent re-renders
    fetchImages(url.current, params.current).then((res) => {
      if (!res) return;
      const newImages = res.images.map((e) => ({ ...e, displayCount: 0 }));
      const newMap = generateImgMap(newImages);
      unstable_batchedUpdates(() => {
        imagesMap.current = newMap;
      });
    });
  }, [page, pageEnd]);
  return imageInterval;
};
export default useImageInterval;