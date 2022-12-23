import { useState, useEffect } from "react";
import GithubIcon from "../icons/Github";
import StackOverflowIcon from "../icons/StackOverflow";
import { GithubRepoData } from "../types/GithubTypes";
import {
  getGithubApiData,
  getPast90DaysContributons,
  getHistoricalContributions
} from "../asyncActions/GithubActions";
const namespace = "footer";
const currDate = new Date();
const dateToLocale = currDate.toISOString().slice(0, 10);
const GitHubRow = () => {
  const [repoData, setRepoData] = useState<GithubRepoData>([]);
  const [ninetyDaysCount, setNinetyDaysCount] = useState(0);
  const [countributionsCount, setCountributionsCount] = useState(0);
  const repoCount = repoData.length < 100 ? repoData.length.toString() : "100+";
  console.log(dateToLocale);
  //const contributionsCount =
  useEffect(() => {
    // getGithubApiData("users/aasmal97/repos", {
    //   per_page: 100,
    // }).then((data) => (Array.isArray(data) ? setRepoData(data) : []));
    // getPast90DaysContributons().then((data) => {
    //   if (Array.isArray(data)) setNinetyDaysCount(data.length);
    // });
    getHistoricalContributions("users/aasmal97/contributions", {
      to: dateToLocale,
    }).then((data) => console.log(data));
  }, []);
  return (
    <div className={`${namespace}-github-row`}>
      <GithubIcon />
    </div>
  );
};
const StackOverflowRow = () => {
  return (
    <div className={`${namespace}-stackoverflow-row`}>
      <StackOverflowIcon />
    </div>
  );
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
export default Footer