##Volta Charging Stations Locator

Locates all the Volta Charging stations in the User's search city and displays them in the order of nearest to farthest.

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

VoltaApis.js
* This service has logic to make API calls to Volta & API call to Google Distance matrix.

HomeCtrl.js
* Home controller has the logic to call the api services to read data from public-sites, filter them based on the User's seatch city and pass the address of the Volta sites to Google distance matrix inorder to get the distance of these sites from the city center. Finally sort the sites in the order of shortest distance to farthest. 


Home.html
* The home template is the html doc which displays useful information to the User based on his/her seach city.

|Distance (miles)	|Travel Time|	Location	|City	|Address	|Parking	|No of Charging Stations|
|-----------------------|-----------|-------------------|-------|---------------|---------------|-----------------------|
|1.325                  |7mins      |Volta De Haro HQ   | SF    | 155 De Haro   | Free Parking  |  2                    |



