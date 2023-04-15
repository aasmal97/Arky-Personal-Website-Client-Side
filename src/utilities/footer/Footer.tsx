import { useState, useEffect } from "react";
import GithubIcon from "../icons/Github";
import StackOverflowIcon from "../icons/StackOverflow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserInfo, getUserInfo } from "../asyncActions/UserInfoActions";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBook,
  faCodeFork,
  faCertificate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { getYear } from "date-fns";
import { roundToNearest } from "../helpers/roundToNearestNumber";
const namespace = "footer";
const currDate = new Date();
const RowItem = ({
  icon,
  title,
  text,
}: {
  icon: IconDefinition;
  title: string | number;
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
  const [userData, setUserData] = useState<UserInfo>({
    stackOverflowData: {
      reputation: 0,
      peopleReached: 0,
    },
    githubData: {
      repositories: 0,
      contributions: 0,
    },
  });
  useEffect(() => {
    getUserInfo().then((e) => setUserData(e));
  }, []);
  return (
    <footer id={namespace}>
      <div id={`${namespace}-inner`}>
        <span>Interested in my source code or technical help?</span>
        <div className={`${namespace}-rows`}>
          <Row icon={<GithubIcon />} link="https://github.com/aasmal97">
            <RowItem
              icon={faBook}
              title={
                userData
                  ? roundToNearest({
                      number: userData.githubData.repositories,
                      toString: true,
                      decimalPlaces: 1,
                    })
                  : "0"
              }
              text={"repos"}
            />
            <RowItem
              icon={faCodeFork}
              title={
                userData
                  ? roundToNearest({
                      number: userData.githubData.contributions,
                      toString: true,
                      decimalPlaces: 1,
                    })
                  : "0"
              }
              text={`contributions in ${getYear(currDate)}`}
            />
          </Row>
          {userData.stackOverflowData && (
            <Row
              icon={<StackOverflowIcon />}
              link="https://stackoverflow.com/users/16451347/arky-asmal"
            >
              <RowItem
                icon={faCertificate}
                title={
                  userData
                    ? roundToNearest({
                        number: userData.stackOverflowData.reputation,
                        toString: true,
                        decimalPlaces: 1,
                      })
                    : "0"
                }
                text={"reputation"}
              />
              <RowItem
                icon={faUsers}
                title={
                  userData
                    ? userData.stackOverflowData.peopleReached + "+"
                    : "0"
                }
                text={`people reached`}
              />
            </Row>
          )}
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
          <span>By Arky Asmal</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
