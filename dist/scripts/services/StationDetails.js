(function() {
  function StationDetails($http, $rootScope, GoogleApis, VoltaApis) {

/**
* @desc StationDetails: This object is returned by this service there by making
*                       its properties and methods public to the rest of the app.
* @type {Object}
**/ 
      var StationDetails = {};


      
      StationDetails.sitesInSelectedCity = null;//List of sites objects in the selected city. 
      
      StationDetails.stationCriterias = ["Distance", "Travel Time", "Free Parking", "No Of Charging Stations"]; //Sorting criteria

      StationDetails.errorMsg = null;   //Error message to display
      
      StationDetails.originCity = null; //City chosen by the user
      
      StationDetails.sortBy = null; //Sort criteria chosen by user
/**
 * @function : updateDistanceDuration
 * @desc     : This function updates distance and duration for each site in the selected city.
 *           : It calls Google distance matrix service to get the details for travel time and distance.
 *           : Once the travel time details for each site is returned by the service GoogleApis.getDistance, 
 *           : a consolidated list of sites with the below information is saved for display.
 *           : 
 *           : The list of sites is displayed in the order of shortest travel distance to longest distance.
 *           : This is the default sort order.
 *           : 
 * @param    : {object } - array of destinations and array of origin
 * @return   : none
 **/
 

      var updateDistanceDuration = function (args) {

        var sitesDistanceDuration = null;

        //If no Volta sites are present in the selected city then let the user know, if not call Google distance matrix service
        //to get the distance and duration details for all the sites in that city.
	StationDetails.errorMsg = null;
       
        GoogleApis.getDistance(args, function(distanceList) {
          sitesDistanceDuration = distanceList;

          //Iterate for each element in sitesInSelectedCity and update each site for distance and duration.
          var i=0;
	  StationDetails.sitesInSelectedCity.forEach(function(sites) {
	    if (sitesDistanceDuration[i] !== undefined) {
            sites.distance = (sitesDistanceDuration[i].distance/1609.344).toFixed(3); //convert meters to miles
            sites.duration = sitesDistanceDuration[i].duration;
	    } else {
	      sites.distance = 0;
	      sites.duration = "0 mins";
	    }
	    i++;
	  });
 
          //sort the sites based upon the distance - shortest to farthest.
          StationDetails.sitesInSelectedCity.sort( function (a, b) {return a.distance - b.distance;});
	  $rootScope.$apply();	

          console.log("Final Dest Sites", StationDetails.sitesInSelectedCity );
        });

      }
/**
 * @function : getSites
 * @desc     : This function makes a call to Volta public-site using the service VoltaApis.getSites.
 *           : The data returned from this service is the entire list of volta sites.
 *           : This data is then filtered for sites as per the user's search city. 
 *           : Then based on the sites in the selected city, the address of those sites is passed
 *           : to Google distance matrix so as to get the details for travel time.
 *           : Once the travel time details for each site is returned by the service GoogleApis.getDistance, 
 *           : a consolidated list of sites with the below information is saved for display.
 *           : 
 *           : The list of sites is displayed in the order of shortest travel distance to longest distance.
 *           : city, name, address, no of charging stations, distance, travel time and parking fee.
 *           : 
 * @param    : none
 * @return   : none
 **/
 
      StationDetails.getSites = function () {
          var args = {};
          var addressOfSites = [];

          //Make a Call the Volta public-sites and get all site details.
          VoltaApis.getSites().then(function(response){
            
            StationDetails.sitesInSelectedCity   = response.data.map(function(site) {
	         var address = "" + site.street_address + " " + site.city + " " + site.state + " " + site.zip_code + "";
	         return {
		   city: site.city, 
		   address: address,
		   name: site.name,
		   noOfChargers: site.stations.length,
		   parkingFee: site.pay_to_park == true ? "Paid parking" : "Free parking"
		 };
	    })
	    .filter(function(siteInfo) {
	       var city = siteInfo.city.toLowerCase(); 
	       if (city.includes(StationDetails.originCity.toLowerCase())) {
	         return true;
	       }
	      //if (siteInfo.city.toLowerCase() == StationDetails.originCity.toLowerCase()) {
              //  return true;
	      //}
	    });

            //Make a list of address of all sites in the selected city. Pass this information to Google Distance Matrix
            //addressOfSites = new Array(); 
	    StationDetails.sitesInSelectedCity.forEach(function (siteInfo) {
	      addressOfSites.push(siteInfo.address);
	    }); 

            
            args["destinations"] = addressOfSites;
            args["origins"] = [StationDetails.originCity];

	    if (addressOfSites.length > 0 ) {
              updateDistanceDuration(args);
            } else {
	      StationDetails.errorMsg = "Sorry! There are no Volta Stations in " + StationDetails.originCity + " yet!"
	    }
	    console.table(StationDetails.sitesInSelectedCity);
                  
        }, function (error) {
	   StationDetails.errorMsg = "Oops!! " + error;
        }); 
       
      };


 /**
 * @function : sortArrays
 * @desc     : This function sorts input array based on the sort criteria
 *           : 
 * @param    : 
 * @return   : {object} List of Stations Object 
 **/
      StationDetails.sortArray = function () {
	console.log("entered sortArray - ", StationDetails.sortBy);
        var sortCriteria = StationDetails.sortBy;


        //In order to test sorting of paid/free parking, make some stations paid since by default the public-sites in volta have free parking.
	//for(var i=0; i<=2; i++) {
	//  StationDetails.siteInfoToDisplay[i].parkingFee = "Paid parking";
	//}

        switch (sortCriteria) {
	  case "Distance":
                //sort the sites based upon the distance - shortest to farthest.
                StationDetails.sitesInSelectedCity.sort( function (a, b) {return a.distance - b.distance;});
		break;
	    
	  case "Travel Time":
                //sort the sites based upon the travel time - shortest time to longest time.
		//Extract the digits from the time using regular expression. The o/p of the match is an array with index0 as the extracted value.
                StationDetails.sitesInSelectedCity.sort( function (a, b) {
		    var durationA = a.duration.match(/\d+/);
		    var durationB = b.duration.match(/\d+/);
		    return durationA[0] - durationB[0];
		  }
		);
		break;

	  case "No Of Charging Stations" :
                //sort the sites based upon number of chargers in the site - max to min
                StationDetails.sitesInSelectedCity.sort( function (a, b) {return b.noOfChargers - a.noOfChargers;});
		break;

	  case "Free Parking":
                //sort the sites based upon parking fee - free to charged
	        console.error("We dont have paid parking!");	
                StationDetails.sitesInSelectedCity.sort( function (a, b) {
		  var parkingFeeA = a.parkingFee.toLowerCase();
		  var parkingFeeB = b.parkingFee.toLowerCase();
		    return (parkingFeeA < parkingFeeB) ? -1 : (parkingFeeA > parkingFeeB) ? 1 : 0;
		});
		break;

	}
      };

 
      return StationDetails;    
      
  }

  angular
    .module('voltaStationsDashboard')
    .factory('StationDetails', ['$http', '$rootScope', 'GoogleApis', 'VoltaApis', StationDetails]);
})();


