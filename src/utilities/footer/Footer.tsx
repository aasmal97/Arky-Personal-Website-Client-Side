import { useState, useEffect } from "react";
import GithubIcon from "../icons/Github";
import StackOverflowIcon from "../icons/StackOverflow";
import { GithubRepoData } from "../types/GithubTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getGithubApiData,
  getPast90DaysContributons,
  getHistoricalContributions,
} from "../asyncActions/GithubActions";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faCodeFork,
  faCertificate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { getYear } from "date-fns";
const namespace = "footer";
const currDate = new Date();
const dateToLocale = currDate.toISOString().slice(0, 10);
const RowItem = ({
  icon,
  title,
  text,
}: {
  icon: IconDefinition;
  title: string;
  text: string;
}) => {
  return (
    <div className={`${namespace}-row-item`}>
      <span>
        <FontAwesomeIcon icon={icon} />
        {title}
      </span>
      <span>{text}</span>
    </div>
  );
};
const Row = ({
  icon,
  link,
  children,
}: {
  icon: JSX.Element;
  link: string;
  children: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <a
      className={`${namespace}-row-container`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      <div className={`${namespace}-row-container-inner`}>{children}</div>
    </a>
  );
};

const Footer = () => {
  const [repoData, setRepoData] = useState<GithubRepoData>([]);
  const [ninetyDaysCount, setNinetyDaysCount] = useState(0);
  const [countributionsCount, setCountributionsCount] = useState(0);
  const repoCount = repoData.length < 100 ? repoData.length.toString() : "100+";

  useEffect(() => {
    // getGithubApiData("users/aasmal97/repos", {
    //   per_page: 100,
    // }).then((data) => (Array.isArray(data) ? setRepoData(data) : []));
    // getPast90DaysContributons().then((data) => {
    //   if (Array.isArray(data)) setNinetyDaysCount(data.length);
    // });
    // getHistoricalContributions("users/aasmal97/contributions", {
    //   to: dateToLocale,
    // }).then((data) => {
    //   if (Array.isArray(data)) setCountributionsCount(data.length);
    // });
  }, []);
  return (
    <footer id={namespace}>
      <div id={`${namespace}-inner`}>
        <span>Interested in my source code or technical help?</span>
        <div className={`${namespace}-rows`}>
          <Row icon={<GithubIcon />} link="https://github.com/aasmal97">
            <RowItem icon={faBook} title={repoCount} text={"repos"} />
            <RowItem
              icon={faCodeFork}
              title={repoCount}
              text={`contributions in ${getYear(currDate).toString()}`}
            />
          </Row>
          <Row
            icon={<StackOverflowIcon />}
            link="https://stackoverflow.com/users/16451347/arky-asmal"
          >
            <RowItem
              icon={faCertificate}
              title={repoCount}
              text={"reputation"}
            />
            <RowItem icon={faUsers} title={repoCount} text={`people reached`} />
          </Row>
        </div>

        <div id={`${namespace}-bottom-footer`}>
          <span>Built using React and SCSS. Hosted on AWS</span>
          <span>
            Source code is{" "}
            <a
              target="_blank"
              href="https://github.com/aasmal97/Personal-Website"
              rel="noopener noreferrer"
            >
              here
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
