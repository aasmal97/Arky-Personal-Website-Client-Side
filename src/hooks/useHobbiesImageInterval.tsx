import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  HobbiesDocument,
  HobbiesFetchData,
} from "../utilities/types/RestApiTypes";
import { fetchHobbiesData } from "../utilities/asyncActions/HobbiesActions";
import shuffleArray from "../utilities/helpers/shuffleArray";
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
const useHobbiesImageLookahead = ({
  items,
  imgKey,
  //intervalCount,
  setCurrIdx,
}: {
  imgKey:, 
  items: HobbiesDocument[];
  //intervalCount: number;
  setCurrIdx: React.Dispatch<React.SetStateAction<number>>;
  }) => {
  
  //do a lookahead
  setCurrIdx((i) => {
    
  })
  //if (items.length >= intervalCount - 1) setCurrIdx(intervalCount - 1);
  //else setCurrIdx(0);

};
const useHobbiesImagesType = ({
  intervalCount,
  orientation,
}: {
  intervalCount: number;
  orientation: "vertical" | "horizontal";
}) => {
  const [currIdx, setCurrIdx] = useState(0);
  const [imgs, setImgs] = useState<HobbiesDocument[]>([]);
  const [imgsKey, setImgsKey] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  useEffect(() => {
    setStatus("loading");
    fetchHobbiesData({
      query: {
        orientation: orientation,
      },
    }).then((res) => {
      unstable_batchedUpdates(() => {
        setStatus("success");
        setImgs(res ? shuffleArray(res.result.Items) : []);
        setImgsKey(
          res
            ? res.result.LastEvaluatedKey
              ? JSON.stringify(res.result.LastEvaluatedKey)
              : null
            : null
        );
      });
    });
  }, [orientation, intervalCount]);
  const nextItem = () => {
     //setCurrIdx((idx) => idx + 1);
  };
};
// const useHobbiesImages = ({
//   verticalCount,
//   horizontalCount,
// }: //fetchParams,
// {
//   verticalCount?: number;
//   horizontalCount?: number;
//   //fetchParams: UseImageIntervalProps["fetchParams"];
// }) => {
//   const [verticalImgs, setVerticalImgs] = useState<HobbiesDocument[]>([]);
//   const [verticalImgsKey, setVerticalImgsKey] = useState<string | null>(null);

//   const [currVerticalIdx, setCurrVerticalIdx] = useState(0);
//   useEffect(() => {
//     fetchHobbiesData({
//       query: {
//         orientation: "horizontal",
//       },
//     }).then((res) => setHorizontalImgs(res ? res.result.Items : []));
//     fetchHobbiesData({
//       query: {
//         orientation: "vertical",
//       },
//     }).then((res) => setVerticalImgs(res ? res.result.Items : []));
//   }, []);
//   const nextSet = (orientation: "vertical" | "horizontal") => {
//     if (orientation === "vertical") setCurrVerticalIdx((idx) => idx + 1);
//     if (orientation === "horizontal") setCurrHorizontalIdx((idx) => idx + 1);
//   };
// };
export default useHobbiesImages;
