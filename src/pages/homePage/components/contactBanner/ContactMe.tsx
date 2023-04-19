
import { MessageBox } from "./MessageBox";
import { Profile } from "./Profile";
const namespace = "contact-me-banner";
const ContactMeBanner = () => {
  return (
    <div id={`${namespace}`}>
      <Profile />
      <MessageBox />
    </div>
  );
};
export default ContactMeBanner;
