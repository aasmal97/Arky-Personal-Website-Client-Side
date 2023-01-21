import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import Gmail from "../../../../utilities/icons/Gmail";
import Facebook from "../../../../utilities/icons/Facebook";
import LinkedIn from "../../../../utilities/icons/LinkedIn";
import useElementSize, { Size } from "../../../../hooks/useElementSize";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import { useEffect } from "react";
import anime from "animejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import LineDrawText from "../../../../utilities/lineDrawText/LineDrawText";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
const namespace = "contact-me-banner";
const socialMedia = [
  {
    id: "linkedIn",
    children: <LinkedIn />,
    url: "https://www.linkedin.com/in/arky-asmal",
  },
  {
    id: "facebook",
    children: <Facebook />,
    url: "https://www.facebook.com/arky.asmal/",
  },
  { id: "gmail", children: <Gmail />, url: "mailto:arkyasmal@gmail.com" },
];
const pathTracings = [
  <path d="M5 0V69H42" stroke="white" />,
  <path
    d="M49.0417 45.5002H84.4999C84.4999 45.5002 86.4999 42 84.4999 36.5001C82.4999 31.0002 80.4999 29.5003 76.9999 27.5001C72.3852 24.8629 67.6096 24.2144 61.9999 26.0002C58.4999 27.1144 54.4999 30.5001 54.4999 30.5001C54.4999 30.5001 51.4999 33.2501 50.9999 35C49.9999 37 49.4999 41 49.4999 41C49.4999 41 49 45 49 46.5C49 48.5613 49.0494 50.4943 49.4999 53C49.9504 55.5057 50.2499 56.5 50.9999 58.5C52.5 62.5 54.5353 64.2527 54.5353 64.2527C57.5 68 65 70.5 65 70.5C69.0001 70.9998 74 71 76.9999 69.5002L87 64.2527"
    stroke="white"
  />,

  <path
    d="M109 6C108.5 21.5 107.5 57.6 107.5 64C107.5 70.4 114.833 71 118.5 70.5L124.5 68.5V26.5H95.5"
    stroke="white"
  />,
  <path d="M142 1V29" stroke="white" />,

  <path
    d="M190.5 30.5C186.1 27.7 179.833 25.6667 177.5 25.5C175 25.3334 169.946 25.9713 167.5 27.5C163.5 30 162 32 163 38.5C164 45 173.5 46.5 174 47C174.4 47.4 182.167 50.8334 186 52.5C188 54.8334 189.5 57 188.5 62C188 66.5 179.333 70.3334 176 70.5C174.667 70.8334 171.1 71.1 167.5 69.5C163.9 67.9 158.167 64.8333 157.5 64.5"
    stroke="white"
  />,
  <path
    d="M280 15L276 11C262 3.33328 228 -0.500006 225.5 37.5C225.5 71.5 258 75 274.5 65L280 59.5"
    stroke="white"
  />,
  <path
    d="M332 45.5C331.6 31.1 323.5 26.5 314.5 25.5C314.5 25.5 296.5 21.5 293.5 46C291 73.0001 314 70.5 314 70.5C330 69 332.4 59.9 332 45.5Z"
    stroke="white"
  />,

  <path
    d="M351.5 22V38M351.5 74.5V38M351.5 38C351.5 38 364 23.7892 371.5 24.9999C378.247 26.089 385.5 29.4999 385.5 35.4999C385.5 41.4999 385.5 74.5 385.5 74.5"
    stroke="white"
  />,
  <path
    d="M407 22V38M407 74.5V38M407 38C407 38 419.5 23.7892 427 24.9999C433.747 26.089 441 29.4999 441 35.4999C441 41.4999 441 74.5 441 74.5"
    stroke="white"
  />,
  <path
    d="M460.042 45.5057H495.5C495.5 45.5057 497.5 42.0055 495.5 36.5056C493.5 31.0057 491.5 29.5057 488 27.5056C483.385 24.8684 478.61 24.2199 473 26.0057C469.5 27.1199 465.5 30.5056 465.5 30.5056C465.5 30.5056 462.5 33.2556 462 35.0055C461 37.0055 460.5 41.0055 460.5 41.0055C460.5 41.0055 460 45.0055 460 46.5055C460 48.5668 460.049 50.4998 460.5 53.0055C460.95 55.5112 461.25 56.5055 462 58.5055C463.5 62.5055 465.535 64.2582 465.535 64.2582C468.5 68.0055 476 70.5055 476 70.5055C480 71.0053 485 71.0055 488 69.5057L498.5 64.2582"
    stroke="white"
  />,
  <path
    d="M549.5 62C549 62.5 547 64.3 543 67.5C529 76 510.519 69 512 46.2163C513.584 21.8414 534.5 22.5 544 29.218L549.5 33"
    stroke="white"
  />,
  <path
    d="M567 9.5C566.5 25 565.5 57.6 565.5 64C565.5 70.4 572.833 71 576.5 70.5L582.5 68.5V26.5H555.5"
    stroke="white"
  />,
];
const ProfileHeader = ({ isVisible }: { isVisible?: boolean }) => (
  <LineDrawText
    isVisible={isVisible}
    id={`${namespace}-profile-header-svg`}
    elementType="h2"
    innerText="Let's Connect"
    pathTracings={pathTracings}
    animationDelay={4}
  >
    <svg
      width="586"
      height="75"
      viewBox="0 0 586 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M276.95 59.3004L280.75 63.4504C277.817 66.8504 274.258 69.5004 270.075 71.4004C265.892 73.3004 260.85 74.2504 254.95 74.2504C252.174 74.264 249.405 73.9804 246.69 73.4044C244.707 72.9778 242.768 72.3654 240.9 71.5754C236.7 69.792 233.117 67.292 230.15 64.0754C227.69 61.3857 225.693 58.307 224.239 54.9644C223.881 54.1545 223.552 53.3327 223.25 52.5004C221.617 48.0004 220.8 43.0504 220.8 37.6504C220.785 34.501 221.112 31.3593 221.775 28.2804C222.183 26.4139 222.734 24.5817 223.425 22.8004C224.746 19.341 226.614 16.1163 228.958 13.2494C229.543 12.5405 230.157 11.8568 230.8 11.2004C233.967 7.96703 237.758 5.45869 242.175 3.67536C246.592 1.89203 251.467 1.00036 256.8 1.00036C258.937 0.991579 261.072 1.143 263.187 1.45336C265.836 1.85336 268.248 2.51903 270.425 3.45036C274.242 5.08369 277.633 7.30036 280.6 10.1004L277.45 14.5504C277.299 14.7687 277.124 14.9696 276.928 15.1494C276.84 15.2299 276.747 15.3054 276.65 15.3754C276.428 15.536 276.133 15.637 275.766 15.6784C275.628 15.6935 275.489 15.7009 275.35 15.7004C275.122 15.6987 274.896 15.6588 274.681 15.5824C274.509 15.523 274.334 15.4414 274.155 15.3374C274.094 15.3017 274.034 15.2643 273.975 15.2254C273.492 14.9087 272.917 14.517 272.25 14.0504C271.677 13.6497 271.018 13.224 270.273 12.7734C270.149 12.6985 270.025 12.6242 269.9 12.5504C269.437 12.2779 268.961 12.0273 268.475 11.7994C267.928 11.5407 267.336 11.291 266.7 11.0504C266.066 10.8124 265.421 10.6039 264.767 10.4254C264.031 10.222 263.242 10.0387 262.4 9.87536C261.586 9.72012 260.764 9.60631 259.938 9.53436C259.085 9.4577 258.181 9.41403 257.224 9.40336C257.066 9.40147 256.908 9.40047 256.75 9.40036C254.486 9.38906 252.229 9.64177 250.024 10.1534C248.727 10.4587 247.457 10.8674 246.225 11.3754C243.042 12.692 240.3 14.567 238 17.0004C236.235 18.885 234.778 21.0365 233.683 23.3754C233.292 24.2003 232.939 25.0428 232.625 25.9004C231.802 28.1785 231.247 30.5448 230.971 32.9514C230.787 34.5109 230.697 36.08 230.7 37.6504C230.691 39.7704 230.852 41.8878 231.18 43.9824C231.481 45.897 231.964 47.7783 232.625 49.6004C233.305 51.4833 234.18 53.2903 235.234 54.9924C236.006 56.2318 236.89 57.3977 237.875 58.4754C240.092 60.892 242.717 62.7337 245.75 64.0004C248.653 65.2003 251.755 65.8425 254.896 65.8934C255.114 65.8982 255.332 65.9005 255.55 65.9004C257.683 65.9004 259.6 65.7754 261.3 65.5254C262.419 65.3639 263.525 65.1264 264.611 64.8144C265.088 64.6763 265.559 64.5215 266.025 64.3504C267.475 63.817 268.825 63.142 270.075 62.3254C270.888 61.7926 271.673 61.2199 272.429 60.6094C272.913 60.2188 273.387 59.8156 273.85 59.4004C274.014 59.2541 274.19 59.122 274.376 59.0054C274.759 58.7687 275.133 58.6504 275.5 58.6504C275.919 58.6514 276.326 58.791 276.658 59.0474C276.761 59.1245 276.859 59.209 276.95 59.3004V59.3004ZM356.6 73.4504H347.7V22.8004H353C353.325 22.7957 353.649 22.8454 353.958 22.9474C354.533 23.146 354.955 23.547 355.224 24.1504C355.296 24.3122 355.354 24.4794 355.4 24.6504L356.1 30.1504C358.3 27.717 360.758 25.7504 363.475 24.2504C366.192 22.7504 369.333 22.0004 372.9 22.0004C374.132 21.9953 375.362 22.0966 376.576 22.3034C377.83 22.5155 379.055 22.8753 380.225 23.3754C382.342 24.292 384.108 25.592 385.525 27.2754C386.569 28.5284 387.42 29.9306 388.05 31.4354C388.316 32.0614 388.549 32.7005 388.75 33.3504C389.221 34.8922 389.537 36.477 389.695 38.0814C389.8 39.1177 389.852 40.1587 389.85 41.2004V73.4504H380.95V41.2004C380.957 40.0307 380.863 38.8627 380.668 37.7094C380.451 36.472 380.109 35.3577 379.642 34.3664C379.292 33.6169 378.85 32.9143 378.325 32.2754C376.703 30.314 374.287 29.2614 371.076 29.1174C370.817 29.1059 370.559 29.1002 370.3 29.1004C367.667 29.1004 365.208 29.7337 362.925 31.0004C361.161 31.9887 359.534 33.2022 358.083 34.6104C357.569 35.1045 357.074 35.6182 356.6 36.1504V73.4504ZM412.2 73.4504H403.3V22.8004H408.6C408.925 22.7957 409.249 22.8454 409.558 22.9474C410.133 23.146 410.555 23.547 410.824 24.1504C410.896 24.3122 410.954 24.4794 411 24.6504L411.7 30.1504C413.9 27.717 416.358 25.7504 419.075 24.2504C421.792 22.7504 424.933 22.0004 428.5 22.0004C429.732 21.9953 430.962 22.0966 432.176 22.3034C433.43 22.5155 434.655 22.8753 435.825 23.3754C437.942 24.292 439.708 25.592 441.125 27.2754C442.169 28.5284 443.02 29.9306 443.65 31.4354C443.916 32.0614 444.149 32.7005 444.35 33.3504C444.821 34.8922 445.137 36.477 445.295 38.0814C445.4 39.1177 445.452 40.1587 445.45 41.2004V73.4504H436.55V41.2004C436.557 40.0307 436.463 38.8627 436.268 37.7094C436.051 36.472 435.709 35.3577 435.242 34.3664C434.892 33.6169 434.45 32.9143 433.925 32.2754C432.303 30.314 429.887 29.2614 426.676 29.1174C426.417 29.1059 426.159 29.1002 425.9 29.1004C423.267 29.1004 420.808 29.7337 418.525 31.0004C416.761 31.9887 415.134 33.2022 413.683 34.6104C413.169 35.1045 412.674 35.6182 412.2 36.1504V73.4504ZM191.9 27.9004L189.9 31.1504C189.768 31.4006 189.59 31.6236 189.375 31.8074C189.02 32.1027 188.579 32.2504 188.05 32.2504C187.833 32.2486 187.617 32.2184 187.408 32.1604C187.213 32.1077 187.009 32.0324 186.797 31.9344C186.645 31.8632 186.495 31.7851 186.35 31.7004C186.095 31.553 185.838 31.4097 185.578 31.2704C185.347 31.1464 185.102 31.018 184.843 30.8854C184.571 30.7464 184.299 30.6097 184.025 30.4754C183.237 30.0887 182.32 29.7267 181.274 29.3894C181.1 29.3331 180.925 29.2784 180.75 29.2254C180.128 29.0404 179.493 28.904 178.85 28.8174C178.051 28.706 177.185 28.6504 176.25 28.6504C175.514 28.6478 174.778 28.6989 174.049 28.8034C173.422 28.8934 172.804 29.0346 172.2 29.2254C171.592 29.417 171.001 29.6616 170.436 29.9564C169.974 30.1976 169.536 30.4801 169.125 30.8004C168.588 31.2165 168.112 31.7056 167.71 32.2534C167.509 32.5296 167.33 32.8211 167.175 33.1254C166.725 34.0087 166.5 34.967 166.5 36.0004C166.495 36.5332 166.567 37.0639 166.713 37.5764C166.892 38.1938 167.203 38.7649 167.625 39.2504C168.069 39.7579 168.571 40.2116 169.12 40.6024C169.59 40.9381 170.085 41.2383 170.6 41.5004C171.328 41.8722 172.076 42.2053 172.839 42.4984C173.485 42.7466 174.139 42.9725 174.8 43.1754C176.31 43.6421 177.816 44.1248 179.316 44.6234C179.419 44.6573 179.522 44.6913 179.625 44.7254C181.275 45.2754 182.883 45.8837 184.45 46.5504C185.706 47.0792 186.896 47.7502 187.999 48.5504C188.22 48.7115 188.437 48.8782 188.65 49.0504C189.883 50.0504 190.875 51.2754 191.625 52.7254C192.049 53.558 192.35 54.4476 192.519 55.3664C192.664 56.1177 192.74 56.9217 192.749 57.7784C192.75 57.8357 192.75 57.893 192.75 57.9504C192.759 59.5257 192.551 61.0947 192.132 62.6134C191.959 63.2299 191.748 63.835 191.5 64.4254C190.667 66.4087 189.433 68.1254 187.8 69.5754C186.657 70.5795 185.383 71.4224 184.011 72.0804C183.292 72.4291 182.554 72.7362 181.8 73.0004C180.475 73.4596 179.108 73.7865 177.718 73.9764C176.428 74.159 175.058 74.2504 173.609 74.2504C173.606 74.2504 173.603 74.2504 173.6 74.2504C171.707 74.2593 169.819 74.077 167.963 73.7064C166.609 73.4326 165.283 73.0373 164 72.5254C162.458 71.9145 160.976 71.1616 159.574 70.2764C158.557 69.6318 157.596 68.9039 156.7 68.1004L158.8 64.7004C159.067 64.267 159.383 63.9337 159.75 63.7004C160.117 63.467 160.6 63.3504 161.2 63.3504C161.713 63.3504 162.25 63.521 162.812 63.8624C162.91 63.9219 163.006 63.9846 163.1 64.0504C163.367 64.2368 163.637 64.4188 163.91 64.5964C164.212 64.7937 164.535 64.9984 164.88 65.2104C165.094 65.3418 165.309 65.4718 165.525 65.6004C165.966 65.8618 166.421 66.1005 166.887 66.3154C167.362 66.536 167.872 66.748 168.417 66.9514C168.602 67.0198 168.788 67.0862 168.975 67.1504C169.566 67.351 170.173 67.5028 170.789 67.6044C171.393 67.707 172.044 67.7777 172.743 67.8164C173.178 67.8397 173.614 67.851 174.05 67.8504C175.783 67.8504 177.3 67.6254 178.6 67.1754C179.9 66.7254 180.983 66.117 181.85 65.3504C182.478 64.8028 183.008 64.1534 183.42 63.4294C183.552 63.1935 183.671 62.9501 183.775 62.7004C184.192 61.7004 184.4 60.6337 184.4 59.5004C184.404 58.966 184.341 58.4333 184.214 57.9144C184.045 57.2229 183.724 56.5776 183.275 56.0254C182.784 55.4319 182.216 54.9066 181.586 54.4634C181.175 54.1722 180.746 53.9089 180.3 53.6754C179.571 53.2939 178.821 52.9544 178.053 52.6584C177.402 52.4062 176.743 52.1783 176.075 51.9754C174.492 51.492 172.875 50.9837 171.225 50.4504C169.575 49.917 167.958 49.3087 166.375 48.6254C165.106 48.0842 163.906 47.3937 162.801 46.5684C162.58 46.4014 162.362 46.2287 162.15 46.0504C160.917 45.017 159.925 43.742 159.175 42.2254C158.786 41.426 158.502 40.5796 158.331 39.7074C158.173 38.93 158.082 38.095 158.057 37.2024C158.052 37.0351 158.05 36.8677 158.05 36.7004C158.05 34.767 158.45 32.9087 159.25 31.1254C160.05 29.342 161.217 27.7754 162.75 26.4254C163.775 25.532 164.91 24.7738 166.128 24.1694C166.865 23.8003 167.624 23.4767 168.4 23.2004C169.719 22.7355 171.082 22.4104 172.469 22.2304C173.656 22.0736 174.853 21.9968 176.05 22.0004C177.711 21.9931 179.369 22.1377 181.004 22.4324C182.378 22.6817 183.725 23.0645 185.025 23.5754C187.675 24.6254 189.967 26.067 191.9 27.9004ZM87.1 48.1504H53.4C53.4234 49.4753 53.5229 50.7978 53.698 52.1114C53.916 53.7067 54.25 55.1697 54.7 56.5004C55.075 57.6271 55.552 58.7173 56.125 59.7574C56.6519 60.7117 57.2806 61.6063 58 62.4254C59.4 64.0087 61.0667 65.192 63 65.9754C64.3172 66.502 65.6987 66.8507 67.108 67.0124C67.9019 67.106 68.7006 67.1521 69.5 67.1504C70.358 67.1528 71.2155 67.1101 72.069 67.0224C73.2463 66.8984 74.315 66.6827 75.275 66.3754C76.8917 65.8587 78.2833 65.3004 79.45 64.7004C80.6167 64.1004 81.5917 63.542 82.375 63.0254C82.5798 62.8894 82.7918 62.7645 83.01 62.6514C83.4913 62.404 83.9247 62.2714 84.31 62.2534C84.34 62.2517 84.37 62.2507 84.4 62.2504C84.6616 62.2473 84.9218 62.2896 85.169 62.3754C85.5479 62.5131 85.8737 62.7668 86.1 63.1004L88.6 66.3504C87.5 67.6837 86.1833 68.842 84.65 69.8254C83.1167 70.8087 81.475 71.617 79.725 72.2504C77.975 72.8837 76.1667 73.3587 74.3 73.6754C72.4333 73.992 70.5833 74.1504 68.75 74.1504C66.5501 74.1617 64.357 73.9055 62.219 73.3874C61.1488 73.1235 60.0982 72.7853 59.075 72.3754C56.125 71.192 53.575 69.4587 51.425 67.1754C49.9062 65.5467 48.6386 63.7007 47.664 61.6984C47.1847 60.7245 46.7626 59.7234 46.4 58.7004C45.7209 56.7637 45.2417 54.7626 44.97 52.7284C44.7174 50.8631 44.5937 48.9826 44.6 47.1004C44.5887 44.6565 44.8704 42.2201 45.439 39.8434C45.6564 38.9497 45.9187 38.0676 46.225 37.2004C47.01 34.9374 48.1305 32.8053 49.549 30.8754C49.9724 30.3039 50.4233 29.7532 50.9 29.2254C52.9407 26.9826 55.433 25.1971 58.213 23.9864C58.2586 23.9659 58.3043 23.9456 58.35 23.9254C60.4415 23.0231 62.6559 22.4377 64.92 22.1884C66.0254 22.0613 67.1373 21.9985 68.25 22.0004C70.1595 21.991 72.0632 22.2116 73.92 22.6574C74.8488 22.8838 75.761 23.1738 76.65 23.5254C79.2167 24.542 81.4333 26.0087 83.3 27.9254C85.1667 29.842 86.625 32.2087 87.675 35.0254C88.3013 36.7312 88.7356 38.5014 88.97 40.3034C89.1608 41.7444 89.2543 43.1967 89.25 44.6504C89.25 46.013 89.108 46.9337 88.824 47.4124C88.8162 47.4252 88.8082 47.4378 88.8 47.4504C88.5 47.917 87.9333 48.1504 87.1 48.1504ZM497.8 48.1504H464.1C464.123 49.4753 464.223 50.7978 464.398 52.1114C464.616 53.7067 464.95 55.1697 465.4 56.5004C465.775 57.6271 466.252 58.7173 466.825 59.7574C467.352 60.7117 467.981 61.6063 468.7 62.4254C470.1 64.0087 471.767 65.192 473.7 65.9754C475.017 66.502 476.399 66.8507 477.808 67.0124C478.602 67.106 479.401 67.1521 480.2 67.1504C481.058 67.1528 481.916 67.1101 482.769 67.0224C483.946 66.8984 485.015 66.6827 485.975 66.3754C487.592 65.8587 488.983 65.3004 490.15 64.7004C491.317 64.1004 492.292 63.542 493.075 63.0254C493.28 62.8894 493.492 62.7645 493.71 62.6514C494.191 62.404 494.625 62.2714 495.01 62.2534C495.04 62.2517 495.07 62.2507 495.1 62.2504C495.362 62.2473 495.622 62.2896 495.869 62.3754C496.248 62.5131 496.574 62.7668 496.8 63.1004L499.3 66.3504C498.2 67.6837 496.883 68.842 495.35 69.8254C493.817 70.8087 492.175 71.617 490.425 72.2504C488.675 72.8837 486.867 73.3587 485 73.6754C483.133 73.992 481.283 74.1504 479.45 74.1504C477.25 74.1617 475.057 73.9055 472.919 73.3874C471.849 73.1235 470.798 72.7853 469.775 72.3754C466.825 71.192 464.275 69.4587 462.125 67.1754C460.606 65.5467 459.339 63.7007 458.364 61.6984C457.885 60.7245 457.463 59.7234 457.1 58.7004C456.421 56.7637 455.942 54.7626 455.67 52.7284C455.417 50.8631 455.294 48.9826 455.3 47.1004C455.289 44.6565 455.57 42.2201 456.139 39.8434C456.356 38.9497 456.619 38.0676 456.925 37.2004C457.71 34.9374 458.83 32.8053 460.249 30.8754C460.672 30.3039 461.123 29.7532 461.6 29.2254C463.641 26.9826 466.133 25.1971 468.913 23.9864C468.959 23.9659 469.004 23.9456 469.05 23.9254C471.142 23.0231 473.356 22.4377 475.62 22.1884C476.725 22.0613 477.837 21.9985 478.95 22.0004C480.86 21.991 482.763 22.2116 484.62 22.6574C485.549 22.8838 486.461 23.1738 487.35 23.5254C489.917 24.542 492.133 26.0087 494 27.9254C495.867 29.842 497.325 32.2087 498.375 35.0254C499.001 36.7312 499.436 38.5014 499.67 40.3034C499.861 41.7444 499.954 43.1967 499.95 44.6504C499.95 46.013 499.808 46.9337 499.524 47.4124C499.516 47.4252 499.508 47.4378 499.5 47.4504C499.2 47.917 498.633 48.1504 497.8 48.1504ZM9.7 1.80036V65.3004H40.7V73.4504H0V1.80036H9.7ZM103.5 61.2504V30.2504H97.4C97.1643 30.2526 96.9297 30.2175 96.705 30.1464C96.464 30.0679 96.2412 29.9417 96.05 29.7754C95.8446 29.5948 95.6934 29.3608 95.613 29.0994C95.5597 28.9354 95.525 28.7534 95.509 28.5534C95.5027 28.4692 95.4997 28.3848 95.5 28.3004V24.7504L103.8 23.7004L105.85 8.05036C105.917 7.55036 106.133 7.14203 106.5 6.82536C106.867 6.50869 107.333 6.35036 107.9 6.35036H112.4V23.8004H126.9V30.2504H112.4V60.6504C112.396 61.2382 112.442 61.8252 112.537 62.4054C112.752 63.676 113.223 64.6744 113.95 65.4004C114.983 66.4337 116.317 66.9504 117.95 66.9504C118.329 66.9518 118.708 66.9288 119.084 66.8814C119.467 66.8314 119.822 66.7547 120.151 66.6514C120.226 66.6278 120.301 66.6024 120.375 66.5754C120.68 66.4645 120.981 66.3418 121.276 66.2074C121.593 66.062 121.885 65.9097 122.15 65.7504C122.328 65.6435 122.505 65.5345 122.681 65.4234C122.854 65.314 123.016 65.208 123.167 65.1054C123.254 65.0464 123.34 64.9864 123.425 64.9254C123.521 64.8562 123.622 64.7931 123.726 64.7364C123.953 64.6137 124.159 64.5517 124.345 64.5504C124.347 64.5504 124.348 64.5504 124.35 64.5504C124.612 64.5527 124.865 64.6421 125.07 64.8044C125.257 64.945 125.434 65.1437 125.6 65.4004L128.2 69.6504C126.964 70.7956 125.556 71.7389 124.026 72.4454C123.575 72.6566 123.116 72.85 122.65 73.0254C120.483 73.842 118.25 74.2504 115.95 74.2504C114.728 74.2597 113.508 74.139 112.311 73.8904C110.744 73.5517 109.374 72.9747 108.202 72.1594C107.669 71.7894 107.175 71.3677 106.725 70.9004C104.843 68.945 103.785 66.236 103.55 62.7734C103.516 62.2664 103.5 61.7584 103.5 61.2504V61.2504ZM560.9 61.2504V30.2504H554.8C554.564 30.2526 554.33 30.2175 554.105 30.1464C553.864 30.0679 553.641 29.9417 553.45 29.7754C553.245 29.5948 553.093 29.3608 553.013 29.0994C552.96 28.9354 552.925 28.7534 552.909 28.5534C552.903 28.4692 552.9 28.3848 552.9 28.3004V24.7504L561.2 23.7004L563.25 8.05036C563.317 7.55036 563.533 7.14203 563.9 6.82536C564.267 6.50869 564.733 6.35036 565.3 6.35036H569.8V23.8004H584.3V30.2504H569.8V60.6504C569.796 61.2382 569.842 61.8252 569.937 62.4054C570.152 63.676 570.623 64.6744 571.35 65.4004C572.383 66.4337 573.717 66.9504 575.35 66.9504C575.729 66.9518 576.108 66.9288 576.484 66.8814C576.867 66.8314 577.222 66.7547 577.551 66.6514C577.626 66.6278 577.701 66.6024 577.775 66.5754C578.08 66.4645 578.381 66.3418 578.676 66.2074C578.993 66.062 579.285 65.9097 579.55 65.7504C579.728 65.6435 579.905 65.5345 580.081 65.4234C580.254 65.314 580.416 65.208 580.567 65.1054C580.654 65.0464 580.74 64.9864 580.825 64.9254C580.921 64.8562 581.022 64.7931 581.126 64.7364C581.353 64.6137 581.559 64.5517 581.745 64.5504C581.747 64.5504 581.748 64.5504 581.75 64.5504C582.012 64.5527 582.265 64.6421 582.47 64.8044C582.657 64.945 582.834 65.1437 583 65.4004L585.6 69.6504C584.364 70.7956 582.956 71.7389 581.426 72.4454C580.975 72.6566 580.516 72.85 580.05 73.0254C577.883 73.842 575.65 74.2504 573.35 74.2504C572.128 74.2597 570.908 74.139 569.711 73.8904C568.144 73.5517 566.774 72.9747 565.602 72.1594C565.069 71.7894 564.575 71.3677 564.125 70.9004C562.243 68.945 561.185 66.236 560.95 62.7734C560.916 62.2664 560.9 61.7584 560.9 61.2504V61.2504ZM548.2 28.6004L545.85 31.8004C545.756 31.9308 545.656 32.057 545.55 32.1784C545.383 32.3684 545.217 32.5257 545.05 32.6504C544.929 32.7391 544.794 32.8068 544.65 32.8504C544.439 32.917 544.189 32.9504 543.9 32.9504C543.664 32.948 543.429 32.9061 543.207 32.8264C542.909 32.7237 542.598 32.5567 542.275 32.3254C542.038 32.1571 541.797 31.9951 541.552 31.8394C541.113 31.5594 540.613 31.263 540.05 30.9504C539.15 30.4504 538.058 29.992 536.775 29.5754C535.725 29.2347 534.48 29.0334 533.039 28.9714C532.71 28.9573 532.38 28.9503 532.05 28.9504C530.882 28.9444 529.715 29.0549 528.569 29.2804C527.51 29.4897 526.48 29.8237 525.5 30.2754C523.6 31.1587 522.008 32.4337 520.725 34.1004C519.442 35.767 518.475 37.7837 517.825 40.1504C517.447 41.5477 517.184 42.9734 517.037 44.4134C516.91 45.6382 516.847 46.8689 516.85 48.1004C516.85 51.1417 517.194 53.847 517.883 56.2164C517.889 56.236 517.894 56.2557 517.9 56.2754C518.207 57.3379 518.599 58.3741 519.071 59.3744C519.556 60.4037 520.152 61.3765 520.85 62.2754C522.117 63.892 523.658 65.1254 525.475 65.9754C526.823 66.5983 528.264 66.9953 529.741 67.1504C530.358 67.2182 530.979 67.2515 531.6 67.2504C532.33 67.2526 533.06 67.2193 533.787 67.1504C534.469 67.0837 535.101 66.9834 535.683 66.8494C536.113 66.7517 536.536 66.6267 536.95 66.4754C537.509 66.2707 538.058 66.0422 538.597 65.7904C539.119 65.545 539.597 65.2887 540.031 65.0214C540.173 64.9341 540.312 64.8438 540.45 64.7504C541.383 64.117 542.15 63.542 542.75 63.0254C542.941 62.8585 543.149 62.7107 543.369 62.5844C543.762 62.3617 544.156 62.2504 544.55 62.2504C545.317 62.2504 545.883 62.5337 546.25 63.1004L548.75 66.3504C546.55 69.0504 543.8 71.0254 540.5 72.2754C537.2 73.5254 533.717 74.1504 530.05 74.1504C527.718 74.1646 525.398 73.8189 523.172 73.1254C522.511 72.916 521.862 72.6741 521.225 72.4004C518.508 71.2337 516.15 69.542 514.15 67.3254C512.15 65.1087 510.575 62.3837 509.425 59.1504C508.757 57.2431 508.289 55.2715 508.03 53.2674C507.805 51.5543 507.695 49.8281 507.7 48.1004C507.691 45.8426 507.897 43.5891 508.315 41.3704C508.556 40.1113 508.876 38.8688 509.275 37.6504C509.925 35.6339 510.83 33.7087 511.967 31.9214C512.541 31.0276 513.178 30.1767 513.875 29.3754C515.892 27.0587 518.383 25.2504 521.35 23.9504C523.261 23.1257 525.276 22.5659 527.338 22.2864C528.734 22.092 530.141 21.9964 531.55 22.0004C533.201 21.9929 534.85 22.1328 536.476 22.4184C538.011 22.6882 539.511 23.1265 540.95 23.7254C543.683 24.8754 546.1 26.5004 548.2 28.6004ZM318.349 22.5544C316.456 22.1771 314.53 21.9915 312.6 22.0004C308.9 22.0004 305.558 22.617 302.575 23.8504C299.592 25.0837 297.05 26.8337 294.95 29.1004C294.157 29.9573 293.435 30.8774 292.791 31.8514C291.672 33.5582 290.768 35.3968 290.1 37.3254C289.557 38.8778 289.149 40.474 288.88 42.0964C288.553 44.0808 288.392 46.0891 288.4 48.1004C288.396 49.6637 288.49 51.2257 288.681 52.7774C288.932 54.8635 289.408 56.9165 290.1 58.9004C290.311 59.498 290.543 60.088 290.796 60.6694C291.807 63.0326 293.211 65.2072 294.95 67.1004C297.05 69.367 299.592 71.1087 302.575 72.3254C303.957 72.8859 305.389 73.3145 306.851 73.6054C308.745 73.9771 310.67 74.1597 312.6 74.1504C313.778 74.1525 314.955 74.0871 316.126 73.9544C318.357 73.7106 320.543 73.1625 322.625 72.3254C325.608 71.1087 328.142 69.367 330.225 67.1004C330.978 66.2803 331.667 65.403 332.284 64.4764C333.43 62.741 334.351 60.8674 335.025 58.9004C335.57 57.3231 335.977 55.7013 336.241 54.0534C336.554 52.0847 336.708 50.0938 336.7 48.1004C336.703 46.6624 336.624 45.2254 336.464 43.7964C336.225 41.5928 335.742 39.4226 335.025 37.3254C333.908 34.1087 332.308 31.367 330.225 29.1004C328.142 26.8337 325.608 25.0837 322.625 23.8504C321.244 23.283 319.812 22.849 318.349 22.5544ZM312.6 67.2004C314.117 67.2151 315.63 67.0346 317.101 66.6634C319.793 66.0027 322.165 64.4134 323.8 62.1754C326.267 58.8254 327.5 54.1504 327.5 48.1504C327.509 46.3889 327.388 44.6292 327.139 42.8854C326.609 39.31 325.496 36.365 323.8 34.0504C321.333 30.6837 317.6 29.0004 312.6 29.0004C311.55 28.9957 310.502 29.079 309.466 29.2494C308.225 29.4594 307.086 29.8024 306.049 30.2784C306.033 30.2857 306.016 30.293 306 30.3004C304.133 31.167 302.575 32.417 301.325 34.0504C300.556 35.067 299.92 36.1781 299.433 37.3564C299.065 38.2396 298.762 39.1483 298.525 40.0754C298.185 41.4092 297.944 42.7662 297.803 44.1354C297.664 45.4692 297.597 46.8094 297.6 48.1504C297.596 49.5323 297.669 50.9134 297.817 52.2874C297.959 53.607 298.195 54.9148 298.525 56.2004C299.142 58.567 300.075 60.5587 301.325 62.1754C302.575 63.792 304.133 65.0337 306 65.9004C307.095 66.4006 308.252 66.7527 309.44 66.9474C310.484 67.1207 311.541 67.2053 312.6 67.2004V67.2004ZM53.7 42.6004H81.25C81.25 40.5337 80.9667 38.642 80.4 36.9254C79.8333 35.2087 79 33.7254 77.9 32.4754C76.8 31.2254 75.4583 30.2587 73.875 29.5754C72.846 29.1381 71.7625 28.8424 70.654 28.6964C69.9235 28.5973 69.1871 28.5485 68.45 28.5504C67.0237 28.5389 65.601 28.697 64.212 29.0214C61.9741 29.5275 59.9248 30.6554 58.3 32.2754C56.8409 33.7679 55.7083 35.5476 54.974 37.5014C54.38 39.0274 53.9553 40.727 53.7 42.6004ZM464.4 42.6004H491.95C491.95 40.5337 491.667 38.642 491.1 36.9254C490.533 35.2087 489.7 33.7254 488.6 32.4754C487.5 31.2254 486.158 30.2587 484.575 29.5754C483.546 29.1381 482.462 28.8424 481.354 28.6964C480.624 28.5973 479.887 28.5485 479.15 28.5504C477.724 28.5389 476.301 28.697 474.912 29.0214C472.674 29.5275 470.625 30.6554 469 32.2754C467.541 33.7679 466.408 35.5476 465.674 37.5014C465.08 39.0274 464.655 40.727 464.4 42.6004ZM138.2 1.80036H145.95V16.3004L145.15 24.0504C145.12 24.3853 145.066 24.7175 144.987 25.0444C144.904 25.3817 144.795 25.6857 144.66 25.9564C144.561 26.1583 144.44 26.349 144.3 26.5254C144.031 26.8564 143.67 27.1006 143.262 27.2274C143.017 27.3087 142.745 27.3614 142.445 27.3854C142.314 27.3956 142.182 27.4006 142.05 27.4004C141.759 27.4031 141.47 27.3651 141.19 27.2874C140.732 27.1593 140.326 26.8932 140.025 26.5254C139.81 26.2608 139.629 25.9693 139.489 25.6584C139.358 25.3737 139.245 25.0577 139.15 24.7104C139.091 24.4924 139.041 24.2723 139 24.0504L138.2 16.3004V1.80036Z"
        fill="black"
      />
    </svg>
  </LineDrawText>
);
const SoundLines = () => {
  return (
    <svg viewBox="0 0 30 47" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="7.02375"
        y1="11.7062"
        x2="13.6625"
        y2="5.63114"
        stroke="#F7F7F7"
      />
      <line x1="0.5" y1="8" x2="0.5" stroke="#F7F7F7" />
      <line
        x1="14.8684"
        y1="18.5176"
        x2="25.8684"
        y2="15.5176"
        stroke="#F7F7F7"
      />
      <line x1="20" y1="27.5" x2="29" y2="27.5" stroke="#F7F7F7" />
      <line
        x1="21.3536"
        y1="37.8415"
        x2="29.3536"
        y2="45.8415"
        stroke="#F7F7F7"
      />
    </svg>
  );
};
const animationProgess = 88;
const MessageBoxLine = ({
  setRef,
  size,
  playAnimation = true,
}: {
  playAnimation?: boolean;
  setRef?: (node: HTMLDivElement | null) => void;
  size: Size;
}) => {
  const { ref: boxRef, isVisible } = useIntersectionWrapper();
  useEffect(() => {
    const path = anime.path(`#${namespace}-box-svg path`);
    const target = `#${namespace}-box-email-icon`;
    const animation = anime({
      targets: target,
      translateX: path("x"),
      translateY: path("y"),
      easing: "easeInOutQuad",
      duration: 4000,
      loop: false,
      update: (e) => {
        if (e.progress <= animationProgess) return;
        else {
          animation.pause();
          animation.seek(4000 * (animationProgess / 100));
        }
      },
    });
    animation.seek(0);
    if (!isVisible || !playAnimation) animation.pause();
    else animation.play();
    return () => {
      anime.remove(`#${namespace}-box-email-icon`);
    };
  }, [isVisible, playAnimation]);
  useEffect(() => {
    const path = anime.path(`#${namespace}-box-svg path`);
    const target = `#${namespace}-box-email-icon`;
    const animation = anime({
      targets: target,
      translateX: path("x"),
      translateY: path("y"),
      easing: "easeInOutQuad",
      duration: 4000,
      loop: false,
      update: (e) => {
        if (e.progress <= animationProgess) return;
        else {
          animation.pause();
          animation.seek(4000 * (animationProgess / 100));
        }
      },
    });
    //so that it resizes properly
    animation.seek(0);
    if (!isVisible || !playAnimation) animation.pause();
    else {
      animation.play();
      animation.seek(4000 * (animationProgess / 100));
      animation.pause();
    }
    return () => anime.remove(`#${namespace}-box-email-icon`);
  }, [isVisible, size.height, size.width, playAnimation]);
  return (
    <div
      ref={(e) => {
        if (setRef) setRef(e);
        boxRef.current = e;
      }}
      className={`${namespace}-box-line`}
    >
      <div id={`${namespace}-box-email-icon`}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
      <svg
        id={`${namespace}-box-svg`}
        viewBox="0 0 262 189"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6774 188C34.7012 142.053 56.7303 6.15691 16.6774 1.28047C-7.35416 -1.6453 -0.845672 19.1607 16.6774 24.579C32.041 30.8005 249.875 8.05286 261 1.28047"
          stroke="#909090"
        />
      </svg>
    </div>
  );
};
const FormInput = ({
  inputType,
  placeholder,
  name,
  className,
}: {
  placeholder?: string;
  name: string;
  inputType?: "text" | "textarea";
  className?: string;
}) => {
  return (
    <>
      {(inputType === "text" || !inputType) && (
        <input
          className={className}
          name={name}
          type={inputType}
          placeholder={"Subject"}
        />
      )}
      {inputType === "textarea" && (
        <textarea className={className} name={name} placeholder={"Message"} />
      )}
    </>
  );
};

const Profile = () => {
  const { ref: profileRef, isVisible } = useIntersectionWrapper();
  return (
    <div ref={profileRef} id={`${namespace}-profile`}>
      <ProfileHeader isVisible={isVisible} />
      {/* <h2>Let's Connect</h2> */}
      <div id={`${namespace}-circle`}>
        <SoundLines />
        <LazyImage src="" placeholderSrc="" alt="" />
      </div>
      <div id={`${namespace}-social-media`}>
        {socialMedia.map((m) => (
          <a key={m.id} href={m.url} target="_blank" rel="noopener noreferrer">
            {m.children}
          </a>
        ))}
      </div>
    </div>
  );
};
const MessageBox = () => {
  const [setRef, size] = useElementSize();
  const smallWindowWidth = useWindowWidth(992);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  const paddingLeft = 23;
  const paddingTop = 17;
  return (
    <div id={`${namespace}-message`}>
      <div id={`${namespace}-message-inner`}>
        <MessageBoxLine setRef={setRef} size={size} playAnimation={false} />
        <form
          onSubmit={onSubmit}
          id={`${namespace}-message-form`}
          style={{
            paddingTop: `${paddingTop}%`,
            paddingLeft: `${paddingLeft}%`,
            height: `calc(${size.height}px - (${size.width}px * ${
              paddingTop / 100
            }))`,
            width: `calc(${size.width}px - (${size.width}px * ${
              paddingLeft / 100
            }))`,
          }}
        >
          <FormInput name="message-subject" inputType="text" />
          <FormInput name="message-content" inputType="textarea" />
          <button type="submit">Send</button>
        </form>
        <div
          id={`${namespace}-message-urgent`}
          style={{
            width: smallWindowWidth ? `calc(100% - ${paddingLeft}%)` : "100%",
          }}
        >
          For urgent requests contact me at <br />
          347-424-3939
        </div>
      </div>
    </div>
  );
};
const ContactMeBanner = () => {
  return (
    <div id={`${namespace}`}>
      <Profile />
      <MessageBox />
    </div>
  );
};
export default ContactMeBanner;
