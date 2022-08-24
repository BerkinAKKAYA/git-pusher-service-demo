import { simpleGit, SimpleGit } from 'simple-git';
import * as fs from 'fs';

const yaml = require('js-yaml');
const git: SimpleGit = simpleGit();

const repositoryURL = "git@github.com:BerkinAKKAYA/repo-to-push-demo.git";
const directoryName = "repo-to-push";

const fileToEdit = "values.yml";
const key = "image.tag";
const value = 0.2;
const commitMessage = `set ${key} to ${value}`;

(async () => {
	try {
		// --- CLONE REPOSITORY ---

		// remove previously created repository
		await fs.promises.rmdir(directoryName, { recursive: true });

		// clone repository
		await git.clone(repositoryURL, directoryName);
		
		// change working directory to cloned repository
		await git.cwd({ path: directoryName, root: true });

		// pull
		await git.pull('origin', 'main', { '--rebase': 'false' });

		// --- EDIT CONTENT ---

		// get file content
		const filePath = `./${directoryName}/${fileToEdit}`;
		const fileContentString: string = await fs.promises.readFile(filePath, { encoding: "utf8" });
		const fileContentJSON = yaml.load(fileContentString);

		// edit file content
		EditJSON(fileContentJSON, key, value.toString());
		const newFileContent = yaml.dump(fileContentJSON);

		// write file content
		await fs.promises.writeFile(filePath, newFileContent);

		// --- PUSH CHANGES ---

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

		// remove previously created repository
		await fs.promises.rmdir(directoryName, { recursive: true });
	} catch (error) {
		console.log("error:", error);
	}
})();

function EditJSON(json: any, key: string, value: string) {
	const parsedValue = isNaN(parseFloat(value)) ? value : parseFloat(value);

	if (key.includes(".")) {
		const keys = key.split(".");
		const lastKey = keys.pop();

		let currentJson = json;

		for (const _key of keys) {
			if (!currentJson.hasOwnProperty(_key)) {
				throw new Error("Unknown Key / Path");
			}

			currentJson = currentJson[_key];
		}

		currentJson[lastKey] = parsedValue;
	} else {
		json[key] = parsedValue;
	}
}