import { SkillsList } from "../homePage/components/skillsBanner/SkillsBanner";
const namespace = 'skills-pg'
const SkillsPage = () => {
  return <div className={`${namespace}-container`}>
    <SkillsList />
  </div>;
  
};
export default SkillsPage;
