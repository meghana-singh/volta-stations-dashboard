//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function HomeCtrl ($scope, VoltaApis) {
      
      var that = this;
      this.sitesList = [];
      this.addressOfDestinations = [];
      this.cityOfDest = [];
      this.sitesListByDist = [];
      this.siteInfoToDisplay = [];
      this.originCity = "san jose";
      this.errorMsg = "";
      var args = {};

      this.getSites = function () {
          VoltaApis.getSites().then(function(response){
            that.sitesList = response.data;	
            
            that.addressOfDestinations   = that.sitesList.map(function(site) {
	         var address = "" + site.street_address + " " + site.city + " " + site.state + " " + site.zip_code + "";
	         return {
		   city: site.city, 
		   address: address,
		   name: site.name,
		   noOfCharges: site.chargers.total,
		   parkingFeee: site.pay_to_park
		 };
	    })
	    .filter(function(siteInfo) {
	      if (siteInfo.city.toLowerCase() == that.originCity.toLowerCase()) {
                return true;
	      }
	    });

	    console.log("addressOfDestinations: ", that.addressOfDestinations);
/*
	    that.cityOfDest = that.addressOfDestinations
	    
	    .map(function(cityAndAddress) { 
              //console.log("address: ", cityAndAddress.address);
              if (cityAndAddress.city.toLowerCase() == that.originCity.toLowerCase()) {
	        console.log("entered the if");
                return cityAndAddress.address;
	      }
	    })
	    .filter(function(address) {
	      if(address !== undefined) {
                return true;
	      }
	    });
*/
        
	    that.addressOfDestinations.forEach(function (siteInfo) {
	      that.cityOfDest.push(siteInfo.address);
	    }); 

            console.log("cityOfDest: ", that.cityOfDest);
            
            args["destinations"] = that.cityOfDest;
            args["origins"] = [that.originCity];
            
	    if (that.cityOfDest.length > 0 ) {
       
              that.getDistance = VoltaApis.getDistance(args, function(distanceList) {
                that.sitesListByDist = distanceList;
                console.log(that.sitesListByDist);
                //console.log("adress of returned list:", that.sitesListByDist[0].address);
                that.siteInfoToDisplay = that.addressOfDestinations.filter(function(sites){
          	for (var i=0; i< that.sitesListByDist.length; i++) {
          	  //console.log("sites[address]", sites["address"]);
          	  //console.log("address: ", that.sitesListByDist[i].address);
  
                    if (sites["address"] == that.sitesListByDist[i].address) {
          	    //console.log("entered if", sites.address);
                      sites.distance = that.sitesListByDist[i].distance/1000;
          	    //console.log(that.addressOfDestinations[i]);
                      return true;
                    }
          	}
                });
                that.siteInfoToDisplay.sort( function (a, b) {return a.distance - b.distance;});
                console.log("Final Dest Sites", that.siteInfoToDisplay );
  
              });
	    } else {
	      that.errorMsg = "Sorry! There are no Volta Stations in the city!"
	    }

       
        }, function (error) {
          console.log("Oops!! ", error);
        }); 
       
      };
}

    angular
    .module('voltaStationsDashboard')
    .controller('HomeCtrl', ['$scope', 'VoltaApis', HomeCtrl]);
})();
