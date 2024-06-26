export const LinkIcon = ({
    linkColor,
    background
}: {
  linkColor: string;
  background?: {
    color: string;
  };
}) => {
  return (
    <svg viewBox="5 5 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* {background && background.color && (
        <circle cx="21" cy="21" r="21" fill={background?.color} />
      )} */}
      <path
        d="M32.9666 21.5473C35.6778 18.9044 35.6778 14.6242 32.9666 11.9813C30.5673 9.64239 26.7861 9.33834 24.0269 11.2609L23.9502 11.3124C23.2592 11.7942 23.1008 12.7297 23.5951 13.3986C24.0893 14.0676 25.049 14.2266 25.7352 13.7448L25.812 13.6933C27.3523 12.6221 29.4589 12.7905 30.7929 14.0956C32.3044 15.5691 32.3044 17.9548 30.7929 19.4283L25.4089 24.6861C23.8974 26.1596 21.4501 26.1596 19.9386 24.6861C18.5998 23.381 18.427 21.3274 19.5259 19.8306L19.5787 19.7557C20.0729 19.0821 19.9098 18.1466 19.2236 17.6694C18.5374 17.1923 17.5729 17.3467 17.0834 18.0156L17.0307 18.0904C15.0537 20.7755 15.3656 24.4615 17.7648 26.8004C20.476 29.4434 24.8667 29.4434 27.5779 26.8004L32.9666 21.5473ZM8.03338 20.4527C5.32221 23.0956 5.32221 27.3758 8.03338 30.0187C10.4327 32.3576 14.2139 32.6617 16.9731 30.7391L17.0498 30.6876C17.7408 30.2058 17.8992 29.2703 17.4049 28.6014C16.9107 27.9324 15.951 27.7734 15.2648 28.2552L15.188 28.3067C13.6477 29.3779 11.5411 29.2095 10.2071 27.9044C8.69558 26.4262 8.69558 24.0405 10.2071 22.5671L15.5911 17.3139C17.1026 15.8404 19.5499 15.8404 21.0614 17.3139C22.4002 18.619 22.573 20.6726 21.4741 22.1741L21.4213 22.249C20.9271 22.9226 21.0902 23.8581 21.7764 24.3352C22.4626 24.8124 23.4271 24.658 23.9166 23.9891L23.9693 23.9142C25.9463 21.2245 25.6344 17.5385 23.2352 15.1996C20.524 12.5566 16.1333 12.5566 13.4221 15.1996L8.03338 20.4527Z"
        fill={linkColor}
      />
    </svg>
  );
};
