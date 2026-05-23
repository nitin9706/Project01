// in this service we will clone the repo from github and save it on desktop of my computer using simple git package

import simpleGit from "simple-git";
import fs from "fs";

const cloneRepo = async (repoUrl) => {
  // we will use simple git to clone the repo
  const git = simpleGit();
  const id = randomIdGenerator();
  const path = `C:\\Users\\nitin\\Desktop\\Project Idea\\Backend\\Output\\${id}`; // you can change this path to where you want to save the cloned repo

  try {
    await git.clone(repoUrl, path);

    console.log("Repository cloned successfully");
  } catch (error) {
    console.error("Error cloning repository:", error);
  }

  return { path, id }; // we will return the path and ID where the repo is cloned so that we can use it later to run the tests,
};

export { cloneRepo };

export const randomIdGenerator = () => {
  const string = "abcdefghijklmnopqrstuvwxyz1234567890";

  const arr = [];
  for (let i = 0; i < 10; i++) {
    const letter = string.charAt(Math.floor(Math.random() * 36));
    arr.push(letter);
  }

  const id = arr.join("");
  return id;
};
