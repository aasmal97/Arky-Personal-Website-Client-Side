import { useEffect, useState } from "react";
import {
  SkillsImageEyeGlasses,
  SkillsImageHead,
  SkillsImageLaptop,
  SkillsImagesThought,
} from "./SkillsImageStaticComponents";
import anime from "animejs";
const namespace = "skills-pg-img";
const typingAnimationTime = 400;
const delayAnimationTypingTime = 300;
const eyeAnimationTime = typingAnimationTime * 1.3;
const eyeDelayAnimationTime = eyeAnimationTime;
//delayAnimationTypingTime;
const armAnimationTime = typingAnimationTime * 1.5;
const armDelayAnimationTime = delayAnimationTypingTime / 5;
const SkillsImageEyes = () => {
  useEffect(() => {
    const target = `.${namespace}-eye`;
    anime
      .timeline({
        loop: true,
        direction: "alternate",
      })
      .add({
        targets: target,
        duration: eyeDelayAnimationTime,
        easing: "linear",
      })
      .add({
        targets: target,
        duration: eyeAnimationTime,
        easing: "linear",
        translateY: [1.5, 3],
      })
      .add({
        targets: target,
        duration: eyeAnimationTime,
        easing: "linear",
        translateY: [3, 1.5],
      })
      .add({
        targets: target,
        duration: eyeAnimationTime,
        easing: "linear",
        translateY: [1.5, 3],
      })
      .add({
        targets: target,
        duration: eyeAnimationTime,
        easing: "linear",
        translateY: [3, 1.5],
      })
      .add({
        targets: target,
        duration: eyeAnimationTime,
        easing: "linear",
        translateY: [1.5, 3],
      })
      .add({
        targets: target,
        duration: eyeDelayAnimationTime,
        easing: "linear",
      });
    return () => {
      anime.remove(target);
    };
  }, []);
  const defaultStyles = {
    transform: "translateY(1.5px)",
  };
  return (
    <>
      <g className={`${namespace}-eye`} style={defaultStyles}>
        <circle cx="65.2202" cy="126.5" r="2.5" fill="#161616" />
        <circle cx="66.2202" cy="125.5" r="0.5" fill="white" />
      </g>
      <g className={`${namespace}-eye`} style={defaultStyles}>
        <circle cx="86.2202" cy="126.5" r="2.5" fill="#161616" />
        <circle cx="87.2202" cy="125.5" r="0.5" fill="white" />
      </g>
    </>
  );
};
const SkillsImageArms = () => {
  useEffect(() => {
    const leftTarget = `.${namespace}-left-arm`;
    const rightTarget = `.${namespace}-right-arm`;
    let timeout = setTimeout(() => {
      const leftArm = anime
        .timeline({
          loop: true,
          direction: "alternate",
        })
        .add({
          targets: leftTarget,
          duration: armDelayAnimationTime,
          easing: "linear",
        })
        .add({
          targets: leftTarget,
          duration: armAnimationTime,
          easing: "linear",
          rotate: [0, 2],
        })
        .add({
          targets: leftTarget,
          duration: armAnimationTime,
          easing: "linear",
          rotate: [2, 1],
        })
        .add({
          targets: leftTarget,
          duration: armAnimationTime,
          easing: "linear",
          rotate: [1, 2],
        })
        .add({
          targets: leftTarget,
          duration: armAnimationTime,
          easing: "linear",
          rotate: [2, 1],
        })
        .add({
          targets: leftTarget,
          duration: armAnimationTime,
          easing: "linear",
          rotate: [1, 2],
        })
        .add({
          targets: leftTarget,
          duration: armDelayAnimationTime,
          easing: "linear",
        });
    }, armDelayAnimationTime * 3);
    const rightArm = anime
      .timeline({
        loop: true,
        direction: "alternate",
      })
      .add({
        targets: rightTarget,
        duration: armDelayAnimationTime,
        easing: "linear",
      })
      .add({
        targets: rightTarget,
        duration: armAnimationTime,
        easing: "linear",
        rotate: [0, -4],
      })
      .add({
        targets: rightTarget,
        duration: armAnimationTime,
        easing: "linear",
        rotate: [-4, -2],
      })
      .add({
        targets: rightTarget,
        duration: armAnimationTime,
        easing: "linear",
        rotate: [-2, -4],
      })
      .add({
        targets: rightTarget,
        duration: armAnimationTime,
        easing: "linear",
        rotate: [-4, -2],
      })
      .add({
        targets: rightTarget,
        duration: armAnimationTime,
        easing: "linear",
        rotate: [-2, -4],
      })
      .add({
        targets: rightTarget,
        duration: armDelayAnimationTime,
        easing: "linear",
      });

    return () => {
      anime.remove(leftTarget);
      anime.remove(rightTarget);
      if (timeout) clearTimeout(timeout);
    };
  }, []);
  const defaultStyles = {
    transformOrigin: "center",
  };
  return (
    <>
      <g className={`${namespace}-left-arm`} style={defaultStyles}>
        <path
          d="M5.27966 238.5C0.00357699 233.224 0.226311 226.917 2.62346 222.5L29.7798 166V217V242H13.7798C10.7798 242 7.27964 240.5 5.27966 238.5Z"
          fill="#FFC83A"
        />
        <path
          d="M29.7798 217V242H13.7798C10.7798 242 7.27964 240.5 5.27966 238.5C-3.72022 229.5 3.27987 217.5 9.77978 217H12.2796C15.0133 217 29.7798 217 29.7798 217ZM29.7798 217V166L2.62339 222.5"
          stroke="#161616"
          strokeWidth="2"
        />
      </g>
      <g className={`${namespace}-right-arm`} style={defaultStyles}>
        <path
          d="M144.78 238C150.056 232.724 149.833 226.417 147.436 222L120.28 165.5V216.5V241.5H136.28C139.28 241.5 142.78 240 144.78 238Z"
          fill="#FFC83A"
        />
        <path
          d="M120.28 216.5V241.5H136.28C139.28 241.5 142.78 240 144.78 238C153.78 229 146.78 217 140.28 216.5H137.78C135.046 216.5 120.28 216.5 120.28 216.5ZM120.28 216.5V165.5L147.436 222"
          stroke="#161616"
          strokeWidth="2"
        />
      </g>
    </>
  );
};
const SkillsImageCodingWindow = () => {
  const [initialRectWidth, setInitialRectWidth] = useState<number[] | null>(
    null
  );
  useEffect(() => {
    if (!initialRectWidth) return;
    const target = `.${namespace}-coding-window-blocks rect`;
    const calcDuration = function (el: any, i: number) {
      const width = initialRectWidth[i];
      const newDuration = width / (typingAnimationTime / 19267);
      return newDuration;
    };
    anime
      .timeline({
        loop: true,
        direction: "alternate",
      })
      .add({
        targets: target,
        duration: delayAnimationTypingTime,
        easing: "linear",
      })
      .add({
        targets: target,
        //delay: anime.stagger(typingAnimationTime * 1.5),
        delay: function (el: any, i: number, l: any) {
            const prevEls = initialRectWidth.slice(0, i);
            console.log(prevEls)
          if (prevEls.length <= 0) return 1;
          const totalDuration = prevEls.reduce(
            (a: number, b: number, idx) => a + calcDuration(b, idx)
          );
          console.log(totalDuration);
          return totalDuration;
        },
        width: function (el: any, i: number) {
          const width = initialRectWidth[i];
          return [0, width];
        },
        easing: "cubicBezier(.5, .05, .1, .3)",
        duration: calcDuration,
      })
      .add({
        targets: target,
        duration: delayAnimationTypingTime,
        easing: "linear",
      });
    return () => {
      anime.remove(target);
    };
  }, [initialRectWidth]);
  return (
    <g>
      <rect
        x="125"
        y="21"
        width="56"
        height="45.4493"
        rx="1.5"
        fill="#3C3C3C"
      />
      <g
        ref={(e) => {
          const codingBlocks = e?.querySelectorAll("rect");
          const widthArr = [];
          if (!codingBlocks || initialRectWidth) return;
          for (let i = 0; i < codingBlocks.length; i++) {
            const width = codingBlocks[i].width.baseVal.value;
            widthArr.push(width);
          }
          setInitialRectWidth(widthArr);
        }}
        className={`${namespace}-coding-window-blocks`}
      >
        <rect
          x="128.246"
          y="29.1159"
          width="2.43478"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="131.493"
          y="29.1159"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="135.551"
          y="29.1159"
          width="10.5507"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
        <rect
          x="130.681"
          y="32.3623"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="134.739"
          y="32.3623"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="138.797"
          y="32.3623"
          width="13.7971"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
        <rect
          x="153.406"
          y="32.3623"
          width="13.7971"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="133.116"
          y="35.6087"
          width="7.30435"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />

        <rect
          x="141.232"
          y="35.6087"
          width="7.30435"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
        <rect
          x="149.348"
          y="35.6087"
          width="7.30435"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="133.116"
          y="38.8551"
          width="17.8551"
          height="1.62319"
          rx="0.5"
          fill="white"
        />
        <rect
          x="130.681"
          y="42.1014"
          width="2.43478"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="133.927"
          y="42.1014"
          width="2.43478"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="137.174"
          y="42.1014"
          width="4.86957"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
        <rect
          x="133.116"
          y="45.3478"
          width="4.86957"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="138.797"
          y="45.3478"
          width="2.43478"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="135.551"
          y="48.5942"
          width="4.86957"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="141.232"
          y="48.5942"
          width="5.68116"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
        <rect
          x="147.725"
          y="48.5942"
          width="2.43478"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="135.551"
          y="51.8406"
          width="11.3623"
          height="1.62319"
          rx="0.5"
          fill="white"
        />
        <rect
          x="130.681"
          y="55.087"
          width="6.49275"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="137.986"
          y="55.087"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="128.246"
          y="58.3333"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#D24040"
        />
        <rect
          x="132.304"
          y="58.3333"
          width="3.24638"
          height="1.62319"
          rx="0.5"
          fill="#FFC83A"
        />
        <rect
          x="136.362"
          y="58.3333"
          width="9.73913"
          height="1.62319"
          rx="0.5"
          fill="#3AC2FF"
        />
      </g>

      <circle cx="127.435" cy="23.4348" r="0.811594" fill="#D24040" />
      <circle cx="132.304" cy="23.4348" r="0.811594" fill="#3AC2FF" />
      <circle cx="129.87" cy="23.4348" r="0.811594" fill="#FFC83A" />
    </g>
  );
};

const SkillsImage = () => {
  return (
    <svg viewBox="0 0 218 251" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style={{ transform: "translateX(2px)" }}>
        <SkillsImageArms />
        <SkillsImageHead />
        <SkillsImageLaptop />
        <SkillsImageEyes />
        <SkillsImageEyeGlasses />
        <SkillsImagesThought />
        <SkillsImageCodingWindow />
      </g>
    </svg>
  );
};
export default SkillsImage;
