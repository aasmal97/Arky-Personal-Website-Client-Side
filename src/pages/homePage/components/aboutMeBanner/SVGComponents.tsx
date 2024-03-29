// import { useEffect } from "react";
// import KUTE from "kute.js";
import ImageInCollage from "../../../../utilities/imageInCollage/ImageInCollage";
import useHobbiesImages, {
  matchElWithImage,
} from "../../../../hooks/useHobbiesImageInterval";
const namespace = "about-me-pg";
export const WaveSVG = ({
  orientation = "right",
}: {
  orientation?: "right" | "top";
}) => {
  const top = (
    <svg viewBox="0 0 324 228" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M324 217.6L315 220.725C306 223.812 288 230.062 270 226.746C252 223.431 234 210.626 216 210.169C198 209.712 180 221.678 162 211.694C144 201.709 126 169.85 108 153.273C90 136.696 72 135.4 54 138.411C36 141.383 18 148.624 9.00001 152.244L1.52588e-05 155.864L1.52588e-05 3.34197e-06H9.00001C18 3.34197e-06 36 3.34197e-06 54 3.34197e-06C72 3.34197e-06 90 3.34197e-06 108 3.34197e-06C126 3.34197e-06 144 3.34197e-06 162 3.34197e-06C180 3.34197e-06 198 3.34197e-06 216 3.34197e-06C234 3.34197e-06 252 3.34197e-06 270 3.34197e-06C288 3.34197e-06 306 3.34197e-06 315 3.34197e-06H324V217.6Z"
        fill="#FFC83A"
      />
    </svg>
  );
  const right = (
    <svg viewBox="0 0 213 319" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.43841 319L6.51511 310.139C3.62746 301.278 -2.21914 283.556 0.88241 265.833C3.98396 248.111 15.9624 230.389 16.3902 212.667C16.818 194.944 5.62386 177.222 14.9642 159.5C24.3045 141.778 54.1079 124.056 69.6156 106.333C85.1234 88.6111 86.3355 70.8889 83.5191 53.1667C80.7384 35.4444 73.9649 17.7222 70.5782 8.86111L67.1914 0L213 0V8.86111C213 17.7222 213 35.4444 213 53.1667C213 70.8889 213 88.6111 213 106.333C213 124.056 213 141.778 213 159.5C213 177.222 213 194.944 213 212.667C213 230.389 213 248.111 213 265.833C213 283.556 213 301.278 213 310.139V319H9.43841Z"
        fill="#FFC83A"
      />
    </svg>
  );
  return (
    <div className={`${namespace}-wave`}>
      {orientation === "right" && right}
      {orientation === "top" && top}
    </div>
  );
};

export const BlobSVG = () => {
  // This impact page loading time immensely
  // We can cut this to improve time to load
  // useEffect(() => {
  //   let ani: any;
  //   const animation = new Promise((resolve, reject) => {
  //     try {
  //       setTimeout(() => {
  //         const animate = KUTE.fromTo(
  //           `#${namespace}-blob-1`,
  //           { path: `#${namespace}-blob-1` },
  //           { path: `#${namespace}-blob-2` },
  //           {
  //             repeat: Infinity,
  //             duration: 5000,
  //             yoyo: true,
  //             easing: "easingCubicInOut",
  //           }
  //         );
  //         resolve(animate);
  //       }, 2000);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   });
  //   const startAsync = async () => {
  //     const ani: any = await animation;
  //     if (ani) ani.start();
  //     return ani;
  //   };
  //   startAsync().then((a) => {
  //     ani = a;
  //   });
  //   return () => {
  //     if (ani) {
  //       ani.stop();
  //       ani.close();
  //     }
  //   };
  // }, []);
  return (
    <>
      <svg viewBox="0 0 211 180" xmlns="http://www.w3.org/2000/svg">
        {/* <path
          id={`${namespace}-blob-1`}
          d="M188.256 156.067C175.232 172.88 147.099 178.374 118.019 179.321C88.9392 180.269 58.9119 176.669 37.5992 159.856C16.2865 143.042 3.6883 113.015 11.1714 90.4711C18.6546 67.927 46.219 52.866 67.5317 41.2624C88.8444 29.6588 103.905 21.5126 126.165 14.3137C148.425 7.1147 177.932 0.81561 190.956 12.4192C203.98 24.0228 200.523 53.5291 199.86 82.3249C199.197 111.121 201.281 139.254 188.256 156.067Z"
          fill="#FFC83A"
        /> */}
        <path
          // style={{ visibility: "hidden" }}
          id={`${namespace}-blob-2`}
          d="M175.919 166.604C154.607 177.308 127.705 171.908 105.919 166.746C84.1799 161.631 67.556 156.8 46.2906 146.049C25.0726 135.298 -0.786777 118.674 0.0183706 102.808C0.776156 86.9891 28.1985 71.9281 49.4165 51.1364C70.6819 30.392 85.7428 3.91686 104.309 0.412099C122.922 -3.09266 144.992 16.3256 166.305 37.07C187.618 57.8617 208.173 79.9322 210.541 104.466C212.956 128.951 197.232 155.853 175.919 166.604Z"
          fill="#FFC83A"
        />
      </svg>
    </>
  );
};
const pathArr: { rect: JSX.Element }[] = [
  {
    rect: (
      <rect x={0} y={21.21} width={62.11} height={95.04} fill="transparent" />
    ),
  },
  { rect: <rect x={62} y={0} width={78} height={58} fill="transparent" /> },
  { rect: <rect x={41} y={58} width={71} height={58} fill="transparent" /> },
  { rect: <rect x={112} y={58} width={56} height={70} fill="transparent" /> },
  { rect: <rect x={0} y={116} width={50} height={59} fill="transparent" /> },
  { rect: <rect x={50} y={116} width={81} height={59} fill="transparent" /> },
];
const verticalCount = pathArr.reduce((a, b) => {
  const increment = b.rect.props.width / b.rect.props.height > 1 ? 0 : 1;
  return a + increment;
}, 0);
const horizontalCount = pathArr.reduce((a, b) => {
  const increment = b.rect.props.width / b.rect.props.height > 1 ? 1 : 0;
  return a + increment;
}, 0);
export const MediaCollagePlaceholderSVG = () => {
  return (
    <svg viewBox="0 0 167 175" xmlns="http://www.w3.org/2000/svg">
      {pathArr.map((el, idx) => (
        <g key={idx}>{el.rect}</g>
      ))}
    </svg>
  );
};
export const MediaCollageSVG = () => {
  const durationInterval: [number, number] = [10000, 100000];
  const {
    horizontalInitialImgs,
    verticalInitialImgs,
    horizontalNextItem,
    verticalNextItem,
  } = useHobbiesImages({
    vertical: {
      count: verticalCount,
      durationInterval,
    },
    horizontal: {
      count: horizontalCount,
      durationInterval,
    },
  });
  const pathArrEls = matchElWithImage(pathArr, [
    ...horizontalInitialImgs,
    ...verticalInitialImgs,
  ]);
  return (
    <svg viewBox="0 0 167 175" xmlns="http://www.w3.org/2000/svg">
      {pathArrEls.map((el) => (
        <ImageInCollage
          nextItem={
            el.orientation === "horizontal"
              ? horizontalNextItem
              : verticalNextItem
          }
          duration={el.img.duration}
          preserveAspectRatio="xMinYMin slice"
          description={el.img.imgDescription}
          src={`${process.env.REACT_APP_MEDIA_FILES_URL}/${el.img.imgURL}`}
          placeholderSrc={`${process.env.REACT_APP_MEDIA_FILES_URL}/${el.img.placeholderURL}`}
          key={el.img.id}
          id={el.img.id}
          namespace={namespace}
        >
          {el.rect}
        </ImageInCollage>
      ))}
    </svg>
  );
};
