import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';

const git: SimpleGit = simpleGit();

git.clone("git@github.com:BerkinAKKAYA/git-pusher-service-demo.git", "./git-pusher-service-demo");

console.log(git);