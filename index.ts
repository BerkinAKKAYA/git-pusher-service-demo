import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs';

const git: SimpleGit = simpleGit();

const repositoryURL = "git@github.com:BerkinAKKAYA/repo-to-push-demo.git";
const directoryName = "repo-to-push";

(async () => {
	// remove previously created repository
	await fs.promises.rmdir(directoryName, { recursive: true });

	// clone repository
	await git.clone(repositoryURL, directoryName).cwd({ path: directoryName, root: true });

	// pull
	await git.pull('origin', 'main', { '--rebase': 'false' });

	// edit repository
	await fs.promises.appendFile(`./${directoryName}/test2.txt`, "test2");

	// add changes
	await git.add("*");

	// commit changes
	await git.commit("add test2.txt");
})()