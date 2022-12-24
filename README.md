
------------------------------------------------
## Steps to start a MERN Project:

1) npm init
2) npm i express
3) create backend folder
4) (for frontend) npx create-react-app frontend
5) cd frontend 
          -> npm start
          ->(for production-->frontend and backend runs together) npm run build
6) create index.js
7) update package.json-> name of js and in scripts "start": "node name.js".
8) npm start in main folder and install all necessities
9) create db, lib, utils folders in backend
10) create config.js
11) create connection.js in backend/db
12) create allRoutes.js in backend/routes
13) create logger.js in backend/utils (note add logger.js path in connection.js)
14) remove and add our code in frontend/src/app.js
15) create component folder in frontend/src and create homepage.js in component folder.
16) Add proxy to frontend/package.json
------------------------------------------------
## Steps to set up SSH based authentication:
- Create a ssh key on your system’s terminal using following command
    - ssh-keygen -t ed25519 -C "your email id"
- Press enter for all inputs and it will create two files in ~/.ssh folder - id_ed25519 and id_ed25519.pub
- Copy the contents of id_ed25519.pub file.
- In your [Github Account settings ](https://github.com/settings/profile), click on “SSH and GPG Keys”. 
- On the [SSH and GPG Keys page ](https://github.com/settings/keys), click on “New SSH key”. Give an easy to understand title and paste the contents of the “id_ed25519.pub” file in the Key section. Click “Add SSH Key”.

**NOTE:** 

- For Windows users go to services by searching in the search bar.
- Next search openSSH Authentication Agent.
- Right click on it and select Automatic from startup type.
- After that once again right click on openSSH Authentication Agent & start.


------------------------------------------------
## Git Commands
### Getting & Creating Projects

| Command | Description |
| ------- | ----------- |
| `git init` | Initialize a local Git repository |
| `git clone ssh://git@github.com/[username]/[repository-name].git` | Create a local copy of a remote repository (SSH is usually considered more secure)|

### Basic Snapshotting

| Command | Description |
| ------- | ----------- |
| `git status` | Check status |
| `git add [file-name.txt]` | Add a file to the staging area |
| `git add -A` | Add all new and changed files to the staging area |
| `git commit -m "[commit message]"` | Commit changes |
| `git rm -r [file-name.txt]` | Remove a file (or folder) |

### Branching & Merging

| Command | Description |
| ------- | ----------- |
| `git branch` | List branches (the asterisk denotes the current branch) |
| `git branch -a` | List all branches (local and remote) |
| `git branch [branch name]` | Create a new branch |
| `git branch -d [branch name]` | Delete a branch |
| `git push origin --delete [branch name]` | Delete a remote branch |
| `git checkout -b [branch name]` | Create a new branch and switch to it |
| `git checkout -b [branch name] origin/[branch name]` | Clone a remote branch and switch to it |
| `git branch -m [old branch name] [new branch name]` | Rename a local branch |
| `git checkout [branch name]` | Switch to a branch |
| `git checkout -` | Switch to the branch last checked out |
| `git checkout -- [file-name.txt]` | Discard changes to a file |
| `git merge [branch name]` | Merge a branch into the active branch |
| `git merge [source branch] [target branch]` | Merge a branch into a target branch |
| `git stash` | Stash changes in a dirty working directory |
| `git stash pop` | Remove a single stashed state from the stash list and apply it on top of the current working tree state |
| `git stash clear` | Remove all stashed entries |

### Sharing & Updating Projects

| Command | Description |
| ------- | ----------- |
| `git push origin [branch name]` | Push a branch to your remote repository |
| `git push -u origin [branch name]` | Push changes to remote repository (and remember the branch) |
| `git push` | Push changes to remote repository (remembered branch) |
| `git push origin --delete [branch name]` | Delete a remote branch |
| `git pull` | Update local repository to the newest commit |
| `git pull origin [branch name]` | Pull changes from remote repository |
| `git remote add origin ssh://git@github.com/[username]/[repository-name].git` | Add a remote repository |
| `git remote set-url origin ssh://git@github.com/[username]/[repository-name].git` | Set a repository's origin branch to SSH |

### Inspection & Comparison

| Command | Description |
| ------- | ----------- |
| `git log` | View changes |
| `git log --summary` | View changes (detailed) |
| `git log --oneline` | View changes (briefly) |
| `git diff [source branch] [target branch]` | Preview changes before merging |

## Coding Guidelines

- Have comments in your code. Comments should be brief and concise to explain what is being done.
- Abstraction for DB and API connections.
- Function names should be self explanatory.
- Don’t create too many functions.
- Exception handling at every external connection or possibility of failure
- Assume every external call will fail and handle it accordingly. API/DB (Exceptions as well as logic should be built to deal with connection failures).
- Log information instead of just dumping exceptions. In case of exception, give some error message (should include the function and class name which has failed) along with the exception.
- Support log levels. Logging should support log levels of INFO, ERROR and DEBUG with the ability to enable/disable each level from the config file. (DEBUG should include detailed contents of all the activity and its data in each step).
- Do not put sensitive information (password, keys, etc.) in logs.
- Standardized spacing in the code and format the code properly before making a PR.
- Do not store credentials/keys in code. Keep them in configurable environments.
- Don’t hardcode values in the code. Instead use variables. For example: Timeouts/keepalives, Values of external sites data 
- Reduce DB calls. Wherever possible cache data, optimize logic to reduce DB calls.