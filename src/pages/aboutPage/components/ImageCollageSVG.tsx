import ImageInCollage from "../../../utilities/imageInCollage/ImageInCollage";
import useHobbiesImages, {
  matchElWithImage,
} from "../../../hooks/useHobbiesImageInterval";
const namespace = "about-pg-hobbies";
const rectArr = [
  { rect: <rect width="143" height="200" fill="transparent" /> },
  { rect: <rect x="286" y="126" width="54" height="74" fill="transparent" /> },
  { rect: <rect x="143" y="87" width="143" height="113" fill="transparent" /> },
  { rect: <rect x="378" width="103" height="87" fill="transparent" /> },
  { rect: <rect x="202" width="117" height="87" fill="transparent" /> },
  { rect: <rect x="340" y="87" width="141" height="113" fill="transparent" /> },
  { rect: <rect x="286" y="87" width="54" height="39" fill="transparent" /> },
  { rect: <rect x="319" width="59" height="87" fill="transparent" /> },
  { rect: <rect x="143" width="59" height="87" fill="transparent" /> },
];
const verticalCount = rectArr.reduce((a, b) => {
  const increment = b.rect.props.width / b.rect.props.height > 1 ? 0 : 1;
  return a + increment;
}, 0);
const horizontalCount = rectArr.reduce((a, b) => {
  const increment = b.rect.props.width / b.rect.props.height > 1 ? 1 : 0;
  return a + increment;
}, 0);
export const ImageCollageSVG = () => {
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
  const rectArrEls = matchElWithImage(rectArr, [
    ...horizontalInitialImgs,
    ...verticalInitialImgs,
  ]);

  return (
    <svg viewBox="0 0 481 200" xmlns="http://www.w3.org/2000/svg">
      {rectArrEls.map((el) => (
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
