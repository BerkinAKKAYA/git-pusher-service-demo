import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs';

const git: SimpleGit = simpleGit();

const repositoryURL = "git@github.com:BerkinAKKAYA/repo-to-push-demo.git";
const directoryName = "repo-to-push";

const fileNameToAdd = "test3.txt";
const fileContent = "test3 content";
const commitMessage = "add test3 file";

(async () => {
	// clone and pull repository
	try {
		// remove previously created repository
		await fs.promises.rmdir(directoryName, { recursive: true });

		// clone repository
		await git.clone(repositoryURL, directoryName);
		
		// change working directory to cloned repository
		await git.cwd({ path: directoryName, root: true });

		// pull
		await git.pull('origin', 'main', { '--rebase': 'false' });
	} catch (error) {
		console.log(error);
	}

	// edit repository
	try {
		await fs.promises.appendFile(`./${directoryName}/${fileNameToAdd}`, fileContent);
	} catch (error) {
		console.log(error);
	}

	// add, commit, push
	try {
		// add changes
		await git.add(".")
			.then(x => console.log("successfull: add"))
			.catch(x => console.log("error: add", x));

		// commit changes
		await git.commit(commitMessage, "*")
			.then(x => console.log("successfull: commit"))
			.catch(x => console.log("error: commit", x));

		// push changes
		await git.push("origin", "main")
			.then(x => console.log("successfull: push"))
			.catch(x => console.log("couldn't push", x));
	} catch (error) {
		console.log("error:", error);
	}

	// remove previously created repository
	await fs.promises.rmdir(directoryName, { recursive: true });
})();