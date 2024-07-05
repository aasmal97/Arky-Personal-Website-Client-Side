import anime from "animejs";
import { useEffect, createElement } from "react";

export const AnimateHeaders = ({
  id,
  htmlTag,
  children,
  namespace,
}: {
  id: string;
  htmlTag: string;
  children: string;
  namespace: string;
}) => {
  useEffect(() => {
    anime.timeline().add({
      targets: `.${namespace}-header .${namespace}-letter-${id}`,
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 4000,
      delay: (el, i) => 500 + 40 * i,
    });
    return () => {
      anime.remove(`.${namespace}-header .${namespace}-letter-${id}`);
    };
  }, [id]);
  const words = children.split(" ");
  const el = createElement(
    htmlTag,
    { className: `${namespace}-header` },
    <>
      {Array(words.length)
        .fill(0)
        .map((_, idx) => {
          const currLetters = words[idx];
          const letters = Array(currLetters.length)
            .fill(0)
            .map((_, i) => currLetters[i])
            .map((letter, idx) => {
              return currLetters !== " " ? (
                <span
                  key={`${currLetters}-${idx}`}
                  className={`${namespace}-letter-${id}`}
                  style={{ display: "inline-block" }}
                >
                  {currLetters[idx]}
                </span>
              ) : (
                <span key={`${currLetters}-${idx}`}>{currLetters}</span>
              );
            });
          return (
            <div key={`${currLetters}-${idx}`} style={{ display: "flex" }}>
              {letters}
            </div>
          );
        })}
    </>
  );
  return el;
};
