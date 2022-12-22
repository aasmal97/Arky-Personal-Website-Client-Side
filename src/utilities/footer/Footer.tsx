const namespace = "footer";
const GitHubRow = () => {
  return <></>;
};
const StackOverflowRow = () => {
  return <></>;
};
const Footer = () => {
  return (
    <footer id={namespace}>
      <div id={`${namespace}-inner`}>
        <span>Interested in my source code or technical help?</span>
        <GitHubRow />
        <StackOverflowRow />
        <div id={`${namespace}-bottom-footer`}>
          <span>Built using React and SCSS. Hosted on AWS</span>
          <span>
            Source code is <a href="">here</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
