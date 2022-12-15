# SampleProject
		(git basics)    TimeStamp: 13/12/2022
git checkout -b branchname
git push --set-upstream origin branchname
git add sample.txt
git commit -m "Written a text file for practise"
(sync)-> (go to main)
git remote add upstream https://github.com/gsvamsi18/SampleProject.git
git pull upstream main

------------------------------------------------
		(Project Initialization)  TimeStamp: 13/12/2022
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



