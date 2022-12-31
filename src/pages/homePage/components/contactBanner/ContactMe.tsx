import LazyImage from "../../../../utilities/lazyComponents/LazyImg";
import Gmail from "../../../../utilities/icons/Gmail";
import Facebook from "../../../../utilities/icons/Facebook";
import LinkedIn from "../../../../utilities/icons/LinkedIn";

const namespace = "contact-me-banner";
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
  return <div id={`${namespace}-message`}></div>;
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
