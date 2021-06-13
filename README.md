# Simple Study Viewer client(UI)

## Setting up your environment

1. Install nodejs 12.16.1
2. Install npm (Node package manager) version 6.13.4 or later version
3. After installing both of them, check whether `npm -v` and `node -v` command works

## Prepare coding setup

1. cd to Project directory
2. Run the following command to install all the node packages:
```bash
$ npm install
```
3. Run the spring application first following the instruction described the associated repository's Readme.md
4. After installing the packages, run the following command to run the client:
```bash
$ npm start
```
5. UI will be rendered in http://localhost:3000

## Key Points

1. NodeJs
2. ReactJs
3. TypeScript
4. Redux

## Build project

1. cd to Project directory
2. Run the following command to build the project:
```bash
$ npm run build
```
3. The build files will be available in `${projectDir}/build`
4. To deploy please follow instruction of the server repository's Readme.md

## How to use the application?

### Create Study Button

1. User can create new study using this button
2. Clicking the button will popped up a modal
3. User can find the patient via Find Patient field.
4. User can click 'New Patient' to create the study for a new patient.
5. After clicking the 'New Patient' button 'Cancel' button will be visible and will allow user to cancel creation.
6. User must associate a patient to create study.
7. After populating all the necessary fields, hitting save will create the study.
8. In case of any exception application will show the message in left-bottom.

### Study Grid

1. The grid/table on the landing page contains all the studies available.
2. All the studies will be sorted in descending order based on the create/update date.
3. The grid can be sorted by clicking on the column header.
4. The grid supports filter and search.
5. There is a vertical icon on the first column for each row.
6. Clicking on the vertical icon will give user options of edit and delete the associated row.

### Delete Selected Study

1. The grid allows multiple selection
2. User can delete one or more studies by selecting rows and click Delete Selected Study
