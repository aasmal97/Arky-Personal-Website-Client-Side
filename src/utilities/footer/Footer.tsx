import { useState, useEffect } from "react";
import axios from "axios";
import GithubIcon from "../icons/Github";
import StackOverflowIcon from "../icons/StackOverflow";
import { GithubRepoData, ErrorObject } from "../types/GithubTypes";
const namespace = "footer";
const getGithubApiData = async (
  route: string
): Promise<GithubRepoData | ErrorObject> => {
  try {
    const request = await axios({
      method: "get",
      url: `https://api.github.com/${route}`,
      params: {
        per_page: 100,
      },
    });
    return request.data;
  } catch (e) {
    return {
      err: true,
      message: "Something went wrong with Github API",
    };
  }
};
const GitHubRow = () => {
  const [repoData, setRepoData] = useState<GithubRepoData>([]);
  const repoCount = repoData.length < 100 ? repoData.length.toString() : "100+";
  useEffect(() => {
    // getGithubApiData("users/aasmal97/repos").then((data) =>
    //   Array.isArray(data) ? setRepoData(data) : []
    // );
  }, []);
  console.log(repoData);
  return (
    <div className={`${namespace}-github-row`}>
      <a>
        <GithubIcon />
      </a>
      
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
export default Footer;
