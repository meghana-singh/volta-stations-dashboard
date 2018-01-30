## List all the Volta Stations and make them searchable 

## Configuration

$ git clone https://github.com/meghana-singh/volta-stations-dashboard.git <your-frontend-project-name>

## Install the project dependencies by running:

$ npm install

## Run the Application

Run the application using the Gruntfile's `default` task:

$ grunt

The default task runs a simple server on port 3000. To view it in a any browser, go to [http://localhost:3000](http://localhost:3000).


## Directory Structure

```
├── Gruntfile.js
├── LICENSE
├── Procfile
├── README.md
├── app
│   ├── assets
│   │   └── images
│   │       └── 
│   ├── pages
│   │   └── index.html
│   ├── scripts
│   │   └── app.js
│   │   └── controllers
│   │       └── HomeCtrl.js
│   │   └── controllers
│   ├── styles
│   │   └── style.css
│   └── templates
│       └── home.html
├── package.json
└── server.js

## Description of Files
index.html 
* Default HTML file which has all the header information and scripts. 
* The root element (ngApp) Angular app - voltaStationsDasboard is bootstraped to the <HTML> element.
* <ui-view><ui-view> To render the view template

app.js
* Has UI-Router which takes care of replacing the contents of <ui-view></ui-view> with a template when a user navigates to the proper route. 
  only one view template is used here - home.html
* All the external dependecies are injected into the voltaStationsDashboard Module here - Bootstrap and UI Router.

HomeCtrl.js
* Controller contains logic to make API call to Volta and functions that control the display of stations.

Home.html
* The home template for viewing the list of stations. 


