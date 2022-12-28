const namespace = "skills-banner";
const BubblesSVGIcon = () => {
  return (
    <svg viewBox="0 0 20 35" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11.5177" cy="24.5153" r="3.28157" fill="#FFC83A" />
      <circle cx="5.34061" cy="29.2768" r="1.47993" fill="#3AC2FF" />
      <circle cx="9.71604" cy="15.7644" r="1.35124" fill="#3AC2FF" />
      <circle cx="5.14755" cy="11.7107" r="1.1582" fill="#FFC83A" />
      <circle cx="10.8742" cy="32.8801" r="1.47993" fill="#D24040" />
      <circle cx="14.0271" cy="5.27626" r="5.27626" fill="#D24040" />
      <circle cx="3.732" cy="4.50412" r="2.18772" fill="#3AC2FF" />
      <circle cx="16.7296" cy="15.4427" r="2.57378" fill="#D24040" />
      <circle cx="2.38075" cy="18.9816" r="2.38075" fill="#D24040" />
    </svg>
  );
};

const MediaContent = () => {
  return <div className={`${namespace}-media-content`}></div>;
};
const TextContent = () => {
  return (
    <div className={`${namespace}-text-content`}>
      <p>
        Devouring knowledge is my strongest attribute. As a result, I have 30+
        skills at my disposal. And I’m always hungry for more.
      </p>
      <button>See Skills</button>
    </div>
  );
};
const SkillsBanner = () => {
  return (
    <div id={namespace}>
      <BubblesSVGIcon />
          <div id={`${namespace}-inner`}>
        <MediaContent />
        <TextContent />
      </div>

      <BubblesSVGIcon />
    </div>
  );
};
export default SkillsBanner;
