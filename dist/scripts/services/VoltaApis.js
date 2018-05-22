(function() {
  function VoltaApis($http) {

      var VoltaApis = {};

      var stationsUrl = 'https://api.voltaapi.com/v1/stations';
      var sitesUrl    = 'https://api.voltaapi.com/v1/public-sites';

 /**
 * @function : getStations
 * @desc     : This function gets all the Volta stations through Volta's publicly available endpoint.
 *           : 
 * @param    : 
 * @return   : {object} List of Stations Object 
 **/

      VoltaApis.getStations = function () {
        return $http.get(stationsUrl).then(function(response) {
	         return response;
        });
      };

 /**
 * @function : getSites
 * @desc     : This function gets all the Volta sites with all charging stations through Volta's publicly available endpoint.
 *           : 
 * @param    : 
 * @return   : {object} List of Sites Object 
 **/

      VoltaApis.getSites = function () {
        return $http.get(sitesUrl).then(function(response) {
	         return response;
        });
      };
 
      return VoltaApis;    
      
  }

  angular
    .module('voltaStationsDashboard')
    .factory('VoltaApis', ['$http', VoltaApis]);
})();


