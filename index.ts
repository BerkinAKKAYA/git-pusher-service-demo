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
	await git.add(".")
		.then(x => console.log("added", x))
		.catch(x => console.log("couldn't add", x));

	// commit changes
	await git.commit("add test2.txt", "*")
		.then(x => console.log("committed", x))
		.catch(x => console.log("couldn't commit", x));

	// push changes
	await git.push("origin", "main")
		.then(x => console.log("pushed", x))
		.catch(x => console.log("couldn't push", x));
})()