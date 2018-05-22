//-----------------------------------------------------------------------------------------------------------
//Define the Controller for Home Page in the Volta stations dashboard app.
//It currently has one dependency injected into its dependency array - StationDetails
//Its an interface between the model - (interface with Voltas api and google distance matrix api)
//and between the view template - displays meaningful data of volta sites based upon the users search city
//-----------------------------------------------------------------------------------------------------------
(function(){
    function HomeCtrl ($scope, StationDetails) {

      this.stationDetails = StationDetails;

}

    angular
    .module('voltaStationsDashboard')
    .controller('HomeCtrl', ['$scope', 'StationDetails', HomeCtrl]);
})();
