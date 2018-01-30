(function() {
  function VoltaApis($http) {

      var VoltaApis = {};
      var service = new google.maps.DistanceMatrixService();
      var listOfDist = [];
      
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
 /**
 * @function : getDistance
 * @desc     : This function returns a list containing the distance of Volta charging sites from the users specified location in
 *           : ascending order.
 *           : 
 * @param    : {args} - Object with lists of origins and destination zip codes.
 * @return   : {object} List of objects with zipcode (key) : distance (value)
 **/
      VoltaApis.getDistance = function (args, callback) {
        //console.log(args.origins);
        //console.log(args.destinations);
        service.getDistanceMatrix(
        {
          origins: args.origins,
          destinations: args.destinations,
    	  travelMode: 'DRIVING'
	}, extractDist);

        function extractDist(response, status) {
	  console.log("entered extractDist", status);
          if (status == 'OK') {
              //console.log("args ", args.destinations);
	      
	      var origins = response.originAddresses;
	      var destinations = response.destinationAddresses;
	      var results = response.rows[0].elements;
 	        for (var j = 0; j < results.length; j++) {
    	           var element = results[j];
	           var distance = element.distance.value;
	           var duration = element.duration.value;
                   listOfDist.push({distance: distance, address: args.destinations[j]}); 		   
		   //console.log("Destination Distance: ", listOfDist[j].distance);
		   //console.log("Destination: ", listOfDist[j].address);
	        }   
	  }   
	   callback(listOfDist);
        };  
      } 


      return VoltaApis;    
      
  }

  angular
    .module('voltaStationsDashboard')
    .factory('VoltaApis', ['$http', VoltaApis]);
})();


