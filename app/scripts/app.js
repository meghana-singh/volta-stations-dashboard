//To advoid polluting of global namespace use IIFE (Immediately Invoking Function Expression)
//Have the Angular Modules, Apps, Controllers etc. inside the IIFE.

(function() {
    //To display different templates in the view (ui-view), UI Router is used.
    //Routing is organized around URLs. An application can be in different states which will determine what to display.
    //Configure the different states using Angular providers.
    //$locationProvide: Configures the applications path
    //$stateProvider: Configures the states name, URL route, controller and template.

    //Controllers are instantiated on an as-needed basis, when their corresponding scopes are created, 
    //i.e. when the user manually navigates to a //state via a URL, $stateProvider will load the correct template into the view, 
    //then bind the controller to the template's scope.

    function config($stateProvider, $locationProvider) {

         $locationProvider
             .html5Mode({
                 enabled: true, //!# display is disabled in the URL
                 requireBase: false
             });

         $stateProvider
             .state('home', {
                 url: '/',
                 controller: 'HomeCtrl as home',
                 templateUrl: 'templates/home.html'
            });    }

   //Below we are setting default headers at run time using $http.defaults object.

   function setCommonHeader ($http) {
     $http.defaults.headers.common.Accept = 'application/json';
   }

   
    //Adding the below dependencies into our application - UI Router module, UI Bootstrapp
    angular
        .module('voltaStationsDashboard', ['ui.router', 'ui.bootstrap']) 
        .config(config)
        .run(['$http', setCommonHeader]);

})();
