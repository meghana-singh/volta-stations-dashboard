(function() {
  function GoogleApis($http) {

      var GoogleApis = {};

      var service = new google.maps.DistanceMatrixService();
      var listOfDistances = [];
      
 /**
 * @function : getDistance
 * @desc     : This function returns a list containing the distance of Volta charging sites from the users specified location.
 *           : 
 *           : 
 * @param    : {args} - Object with lists of origins and destination address.
 * @return   : {object} List of objects with address, distance and duration details.
 **/
      GoogleApis.getDistance = function (args, callback) {
        service.getDistanceMatrix(
        {
          origins: args.origins,
          destinations: args.destinations,
    	  travelMode: 'DRIVING'
	}, extractDist);

        function extractDist(response, status) {
	  
          if (status == 'OK') {
	      
	      var origins = response.originAddresses;
	      var destinations = response.destinationAddresses;
	      var results = response.rows[0].elements;

 	        for (var j = 0; j < results.length; j++) {
    	           var element = results[j];
		   if (element.status == 'OK') { //The Volta public site have some invalid address
	             var distance = element.distance.value;
	             var duration = element.duration.text;
                     listOfDistances.push({distance: distance, duration: duration, address: args.destinations[j]}); 		   
		   } else {
                     listOfDistances.push({distance: 0, duration: 0, address: args.destinations[j]}); 		   
		   }
	        }   
	  }   
	   callback(listOfDistances);
        };  
      } 

      return GoogleApis;    
      
  }

  angular
    .module('voltaStationsDashboard')
    .factory('GoogleApis', ['$http', GoogleApis]);
})();


