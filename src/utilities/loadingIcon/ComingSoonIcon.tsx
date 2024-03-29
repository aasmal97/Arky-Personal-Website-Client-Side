export const StopWatchAnimation = ({
  ringColorDark,
  ringColorLight,
    polygonColor,
  clockHandColor,
  width,
}: {
        clockHandColor: string;
  ringColorDark: string;
  ringColorLight: string;
  polygonColor: string;
  width: string;
}) => {
  return (
    <svg
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      id="eIH7cNo3Qf51"
      viewBox="0 0 400 380"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient
          id="eIH7cNo3Qf517-fill"
          x1="0"
          y1="94.55"
          x2="0"
          y2="-94.55"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf517-fill-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf517-fill-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf518-fill"
          x1="0"
          y1="94.55"
          x2="0"
          y2="-94.55"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf518-fill-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf518-fill-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf528-fill"
          x1="0"
          y1="-67.38"
          x2="0"
          y2="67.38"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf528-fill-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf528-fill-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf531-stroke"
          x1="-38.48"
          y1="38.48"
          x2="38.48"
          y2="-38.48"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf531-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf531-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf534-stroke"
          x1="187.740806"
          y1="117.842597"
          x2="190.068806"
          y2="117.218597"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf534-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf534-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf535-stroke"
          x1="211.304605"
          y1="205.753699"
          x2="213.632605"
          y2="205.129699"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf535-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf535-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf536-stroke"
          x1="244.487403"
          y1="149.990808"
          x2="245.111403"
          y2="152.318808"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf536-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf536-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf537-stroke"
          x1="156.576301"
          y1="173.554607"
          x2="157.200301"
          y2="175.882607"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf537-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf537-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf538-stroke"
          x1="232.212193"
          y1="129.403802"
          x2="233.916192"
          y2="131.107802"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf538-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf538-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf539-stroke"
          x1="167.864894"
          y1="193.751101"
          x2="169.568894"
          y2="195.4551"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf539-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf539-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf540-stroke"
          x1="232.756194"
          y1="194.562195"
          x2="231.052194"
          y2="196.266195"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf540-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf540-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf541-stroke"
          x1="168.408896"
          y1="130.214897"
          x2="166.704896"
          y2="131.918897"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf541-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf541-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf542-stroke"
          x1="211.561205"
          y1="117.688594"
          x2="213.889205"
          y2="118.312594"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf542-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf542-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf543-stroke"
          x1="187.997406"
          y1="205.599697"
          x2="190.325406"
          y2="206.223697"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf543-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf543-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf544-stroke"
          x1="244.561406"
          y1="173.891201"
          x2="243.937406"
          y2="176.219201"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf544-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf544-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf545-stroke"
          x1="156.650303"
          y1="150.327402"
          x2="156.026303"
          y2="152.655402"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf545-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf545-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf547-stroke"
          x1="198"
          y1="121.07"
          x2="202"
          y2="121.07"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf547-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf547-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf548-stroke"
          x1="175.27"
          y1="124.69"
          x2="181.45"
          y2="124.69"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf548-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf548-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf549-stroke"
          x1="159.781404"
          y1="141.783505"
          x2="165.149304"
          y2="138.698505"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf549-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf549-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf550-stroke"
          x1="156.538711"
          y1="166.732001"
          x2="160.718711"
          y2="159.458801"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf550-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf550-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf551-stroke"
          x1="162.529996"
          y1="186.890004"
          x2="162.529996"
          y2="180.710004"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf551-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf551-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf552-stroke"
          x1="178.404394"
          y1="204.457003"
          x2="175.319394"
          y2="199.089103"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf552-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf552-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf553-stroke"
          x1="205.747903"
          y1="207.720996"
          x2="198.474703"
          y2="203.540996"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf553-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf553-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf554-stroke"
          x1="224.73"
          y1="199.630007"
          x2="218.55"
          y2="199.630007"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf554-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf554-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf555-stroke"
          x1="241.062897"
          y1="185.825297"
          x2="235.694997"
          y2="188.910297"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf555-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf555-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf556-stroke"
          x1="246.736924"
          y1="158.511811"
          x2="242.556924"
          y2="165.785011"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf556-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf556-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf557-stroke"
          x1="237.469973"
          y1="137.43"
          x2="237.469973"
          y2="143.61"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf557-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf557-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf558-stroke"
          x1="222.439892"
          y1="123.161809"
          x2="225.529892"
          y2="128.538409"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop
            id="eIH7cNo3Qf558-stroke-0"
            offset="0%"
            stopColor={ringColorLight}
          />
          <stop
            id="eIH7cNo3Qf558-stroke-1"
            offset="100%"
            stopColor={ringColorDark}
          />
        </linearGradient>
        <linearGradient
          id="eIH7cNo3Qf560-fill"
          x1="-12.16"
          y1="0"
          x2="12.16"
          y2="0"
          spreadMethod="pad"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0)"
        >
          <stop id="eIH7cNo3Qf560-fill-0" offset="0%" stopColor={ringColorLight} />
          <stop id="eIH7cNo3Qf560-fill-1" offset="100%" stopColor={ringColorDark} />
        </linearGradient>
      </defs>
      <g transform="matrix(1.564066 0 0 1.564066 -110 -50.120292)">
        <g transform="matrix(.754133 0 0 0.754133 45.363878 41.979287)">
          <g id="eIH7cNo3Qf54_to" transform="translate(201.770002,163.930002)">
            <g id="eIH7cNo3Qf54_tr" transform="rotate(0)">
              <line
                id="eIH7cNo3Qf54"
                x1="70.19"
                y1="55.83"
                x2="86.79"
                y2="55.83"
                transform="translate(-78.490002,-55.830002)"
                fill="none"
                stroke={polygonColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf55_to" transform="translate(201.769999,163.930001)">
            <g id="eIH7cNo3Qf55_tr" transform="rotate(0)">
              <polygon
                id="eIH7cNo3Qf55"
                points="81.94,92.38 68.79,115.16 95.09,115.16 81.94,92.38"
                transform="translate(-81.939999,-103.77)"
                fill="#c7ebf0"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf56_to" transform="translate(201.77,163.93)">
            <g id="eIH7cNo3Qf56_tr" transform="rotate(2880)">
              <circle
                id="eIH7cNo3Qf56"
                r="2.36"
                transform="translate(0,0)"
                fill="#ffd990"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf57_to" transform="translate(201.77,163.93)">
            <g id="eIH7cNo3Qf57_tr" transform="rotate(0)">
              <g
                id="eIH7cNo3Qf57"
                transform="translate(-137.340004,-50.330002)"
              >
                <line
                  x1="137.34"
                  y1="36.4"
                  x2="137.34"
                  y2="44.83"
                  fill="none"
                  stroke={polygonColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                />
                <line
                  x1="137.34"
                  y1="64.26"
                  x2="137.34"
                  y2="55.83"
                  fill="none"
                  stroke={polygonColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                />
                <line
                  x1="151.27"
                  y1="50.33"
                  x2="142.84"
                  y2="50.33"
                  fill="none"
                  stroke={polygonColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                />
                <line
                  x1="123.41"
                  y1="50.33"
                  x2="131.84"
                  y2="50.33"
                  fill="none"
                  stroke={polygonColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                />
              </g>
            </g>
          </g>
          <g id="eIH7cNo3Qf512_to" transform="translate(201.769988,163.930002)">
            <g id="eIH7cNo3Qf512_tr" transform="rotate(2880)">
              <circle
                id="eIH7cNo3Qf512"
                r="9.19"
                transform="translate(0.000012,-0.000002)"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                strokeMiterlimit="10"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf513_to" transform="translate(201.770003,163.93)">
            <g id="eIH7cNo3Qf513_tr" transform="rotate(0)">
              <polygon
                id="eIH7cNo3Qf513"
                points="352.31,214.07 329.54,200.92 329.54,227.22 352.31,214.07"
                transform="translate(-340.925003,-214.07)"
                fill="none"
                stroke={polygonColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf514_to" transform="translate(201.769987,163.929997)">
            <g id="eIH7cNo3Qf514_tr" transform="rotate(0)">
              <circle
                id="eIH7cNo3Qf514"
                r="6.64"
                transform="translate(0.000013,0.000004)"
                fill="#c7ebf0"
              />
            </g>
          </g>
          <g id="eIH7cNo3Qf515_to" transform="translate(201.77,163.930002)">
            <g id="eIH7cNo3Qf515_tr" transform="rotate(0)">
              <line
                id="eIH7cNo3Qf515"
                x1="274.7"
                y1="248.72"
                x2="291.3"
                y2="248.72"
                transform="translate(-283,-248.720001)"
                fill="none"
                stroke={polygonColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeMiterlimit="10"
              />
            </g>
          </g>
        </g>
        <g id="eIH7cNo3Qf516_to" transform="translate(200,162)">
          <g id="eIH7cNo3Qf516_tr" transform="rotate(0)">
            <g transform="translate(-200,-162)">
              <g
                id="eIH7cNo3Qf517_ts"
                transform="translate(199.999992,161.999992) scale(0.710355,0.710355)"
              >
                <circle
                  id="eIH7cNo3Qf517"
                  r="94.55"
                  transform="translate(0.000008,0.000008)"
                  fill="url(#eIH7cNo3Qf517-fill)"
                  fillOpacity="0.4"
                />
              </g>
              <g
                id="eIH7cNo3Qf518_ts"
                transform="translate(199.999992,161.999992) scale(0.710355,0.710355)"
              >
                <circle
                  id="eIH7cNo3Qf518"
                  r="94.55"
                  transform="translate(0.000008,0.000008)"
                  fill="url(#eIH7cNo3Qf518-fill)"
                  fillOpacity="0.4"
                />
              </g>
              <g>
                <circle
                  r="67.38"
                  transform="translate(200 167)"
                  fill="#020917"
                />
                <circle
                  r="67.38"
                  transform="translate(200 162)"
                  fill="url(#eIH7cNo3Qf528-fill)"
                />
                <circle r="51.81" transform="translate(200 162)" fill="#fff" />
                <path
                  style={{ isolation: "isolate" }}
                  d="M210.15,172.64c-18.17,10.48-36.61,17-52.5,19.19c15.151935,21.481702,43.990083,28.211344,67.085122,15.654917s33.126096-40.418673,23.334878-64.814917c-9.62,10.65-22.58,21.11-37.92,29.97Z"
                  opacity="0.25"
                  fill="#ffcc38"
                />
                <circle
                  r="52.42"
                  transform="translate(200 162.16)"
                  fill="none"
                  stroke="url(#eIH7cNo3Qf531-stroke)"
                  strokeWidth="4"
                  strokeMiterlimit="10"
                />
              </g>
              <g>
                <g>
                  <line
                    x1="188.24"
                    y1="118.26"
                    x2="188.38"
                    y2="118.78"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf534-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="211.69"
                    y1="205.8"
                    x2="211.83"
                    y2="206.32"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf535-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="244.07"
                    y1="150.49"
                    x2="243.55"
                    y2="150.63"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf536-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="156.52"
                    y1="173.95"
                    x2="156"
                    y2="174.09"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf537-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="232.14"
                    y1="130.02"
                    x2="231.76"
                    y2="130.4"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf538-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="168.05"
                    y1="194.11"
                    x2="167.67"
                    y2="194.49"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf539-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="232.14"
                    y1="194.49"
                    x2="231.76"
                    y2="194.11"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf540-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="168.05"
                    y1="130.4"
                    x2="167.67"
                    y2="130.02"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf541-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="211.76"
                    y1="118.26"
                    x2="211.62"
                    y2="118.78"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf542-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="188.31"
                    y1="205.8"
                    x2="188.17"
                    y2="206.32"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf543-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="244"
                    y1="174.09"
                    x2="243.48"
                    y2="173.95"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf544-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="156.45"
                    y1="150.63"
                    x2="155.93"
                    y2="150.49"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf545-stroke)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g>
                  <line
                    x1="200"
                    y1="116.71"
                    x2="200"
                    y2="125.43"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf547-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="177.27"
                    y1="122.8"
                    x2="179.45"
                    y2="126.57"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf548-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="160.64"
                    y1="139.43"
                    x2="164.41"
                    y2="141.61"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf549-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="154.55"
                    y1="162.16"
                    x2="163.27"
                    y2="162.16"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf550-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="160.64"
                    y1="184.89"
                    x2="164.41"
                    y2="182.71"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf551-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="177.27"
                    y1="201.52"
                    x2="179.45"
                    y2="197.75"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf552-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="200"
                    y1="207.61"
                    x2="200"
                    y2="198.89"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf553-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="222.73"
                    y1="201.52"
                    x2="220.55"
                    y2="197.75"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf554-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="239.36"
                    y1="184.89"
                    x2="235.59"
                    y2="182.71"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf555-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="245.45"
                    y1="162.16"
                    x2="236.73"
                    y2="162.16"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf556-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="239.36"
                    y1="139.43"
                    x2="235.59"
                    y2="141.61"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf557-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="222.73"
                    y1="122.8"
                    x2="220.55"
                    y2="126.57"
                    fill="none"
                    stroke="url(#eIH7cNo3Qf558-stroke)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <g>
                <circle
                  r="12.16"
                  transform="translate(200 162.16)"
                  fill="url(#eIH7cNo3Qf560-fill)"
                />
                <circle
                  r="4.16"
                  transform="translate(200 162.16)"
                  fill={clockHandColor}
                />
              </g>
              <g
                id="eIH7cNo3Qf562_tr"
                transform="translate(200,162.16) rotate(-90)"
              >
                <path
                  d="M200,166.32l26.24-2c.810256.078606,1.594942-.30931,2.024483-1.000821s.429542-1.566846,0-2.258358-1.214227-1.079427-2.024483-1.000821L200,158Z"
                  transform="translate(-200,-162.16)"
                  fill={clockHandColor}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
