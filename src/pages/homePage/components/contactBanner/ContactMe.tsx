import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import Gmail from "../../../../utilities/icons/Gmail";
import Facebook from "../../../../utilities/icons/Facebook";
import LinkedIn from "../../../../utilities/icons/LinkedIn";
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
const MessageBoxLine = () => {
  return (
    <svg viewBox="0 0 262 189" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6774 188C34.7012 142.053 56.7303 6.15691 16.6774 1.28047C-7.35416 -1.6453 -0.845672 19.1607 16.6774 24.579C32.041 30.8005 249.875 8.05286 261 1.28047"
        stroke="#909090"
      />
    </svg>
  );
};
const FormInput = ({
  inputType,
  name,
  className,
}: {
  name: string;
  inputType?: "text" | "textarea";
  className?: string;
}) => {
  return (
    <>
      {(inputType === "text" || !inputType) && (
        <input className={className} name={name} type={inputType} />
      )}
      {inputType === "textarea" && (
        <textarea className={className} name={name} />
      )}
    </>
  );
};
const Profile = () => {
  return (
    <div id={`${namespace}-profile`}>
      <h2>Let's Connect</h2>
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <div id={`${namespace}-message`}>
      <div id={`${namespace}-message-inner`}>
        {/* <div id={`${namespace}-message-container`}> */}
        <form onSubmit={onSubmit} id={`${namespace}-message-form`}>
          <MessageBoxLine />
          <FormInput name="message-subject" inputType="text" />
          <FormInput name="message-content" inputType="textarea" />
          <button type="submit">Send</button>
          <div id={`${namespace}-message-urgent`}>
            For urgent requests contact me at <br />
            347-424-3939
          </div>
        </form>
        {/* </div> */}
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
