//-----------------------------------------------------------------------------------------------------------
//Define the Controller for Home Page in the Volta stations dashboard app.
//It currently has one dependency injected into its dependency array - VoltaApis
//Its an interface between the model - (interface with Voltas api and google distance matrix api)
//and between the view template - displays meaningful data of volta sites based upon the users search city
//-----------------------------------------------------------------------------------------------------------
(function(){
    function HomeCtrl ($scope, VoltaApis) {
      
      var that = this;
      this.sitesInSelectedCity = null
      this.addressOfSites = null
      this.sitesDistanceDuration = null
      this.siteInfoToDisplay = null
      this.originCity = null;
      this.errorMsg = null;
      var args = {};

 /**
 * @function : getSites
 * @desc     : This function makes a call to Volta public-site using the service VoltaApis.getSites.
 *           : The data returned from this service is the entire list of volta sites.
 *           : This data is then filtered for sites as per the user's search city. 
 *           : Then based on the sites in the selected city, the address of those sites is passed
 *           : to Google distance matrix so as to get the details for travel time.
 *           : Once the travel time details for each site is returned by the service VoltaApis.getDistance, 
 *           : a consolidated list of sites with the below information is saved for display.
 *           : 
 *           : The list of sites is displayed in the order of shortest travel distance to longest distance.
 *           : city, name, address, no of charging stations, distance, travel time and parking fee.
 *           : 
 * @param    : none
 * @return   : none
 **/
 
      this.getSites = function () {
          VoltaApis.getSites().then(function(response){
            
            that.sitesInSelectedCity   = response.data.map(function(site) {
	         var address = "" + site.street_address + " " + site.city + " " + site.state + " " + site.zip_code + "";
	         return {
		   city: site.city, 
		   address: address,
		   name: site.name,
		   noOfCharges: site.stations.length,
		   parkingFeee: site.pay_to_park
		 };
	    })
	    .filter(function(siteInfo) {
	      if (siteInfo.city.toLowerCase() == that.originCity.toLowerCase()) {
                return true;
	      }
	    });

            that.addressOfSites = new Array(); 
	    that.sitesInSelectedCity.forEach(function (siteInfo) {
	      that.addressOfSites.push(siteInfo.address);
	    }); 

            
            args["destinations"] = that.addressOfSites;
            args["origins"] = [that.originCity];
            
	    if (that.addressOfSites.length > 0 ) {
	      that.errorMsg = null;
       
              that.getDistance = VoltaApis.getDistance(args, function(distanceList) {
                that.sitesDistanceDuration = distanceList;

                that.siteInfoToDisplay = that.sitesInSelectedCity.filter(function(sites){
          	  for (var i=0; i< that.sitesDistanceDuration.length; i++) {
  
                    if (sites["address"] == that.sitesDistanceDuration[i].address) {
                      sites.distance = (that.sitesDistanceDuration[i].distance/1609.344).toFixed(3);
                      sites.duration = that.sitesDistanceDuration[i].duration;
                      return true;
                    }
          	  }  
                });

                //sort the sites based upon the distance - shortest to farthest.
                that.siteInfoToDisplay.sort( function (a, b) {return a.distance - b.distance;});
		$scope.$apply();
                console.log("Final Dest Sites", that.siteInfoToDisplay );
  
              });
	    } else {
	      that.errorMsg = "Sorry! There are no Volta Stations in " + that.originCity + " yet!"
	    }

       
        }, function (error) {
	   that.errorMsg = "Oops!! " + error;
        }); 
       
      };
}

    angular
    .module('voltaStationsDashboard')
    .controller('HomeCtrl', ['$scope', 'VoltaApis', HomeCtrl]);
})();
