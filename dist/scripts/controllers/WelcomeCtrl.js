//Define the Controller for Home Page in the chat room.
//This Controller is constructed for bloc Chats.
//It currently has one dependency injected into its dependency array - . The callback function is always the last item in the array.
//The callback function of the controller is HomeCtrl
(function(){
    function WelcomeCtrl ($scope, VoltaApis) {
      
      var that = this;

      this.setOriginCity = function (originCity) {
        commonServices.setCity(originCity);
      };

      this.getSites  = VoltaApis.getSites().then(function(response){
        that.sitesList = response.data;	
        that.zipCodesOfDest   = that.sitesList.map(function(site) {return site.city;});
	that.cityOfDest = that.zipCodesOfDest.filter(function(city) { 
	  if (city.toLowerCase() == "walnut creek") {
	    return true;
	  } else {
	    return false;
	  }
	});  
	args["destinations"] = that.cityOfDest;
        args["origins"] = ['walnut creek'];

	console.log("cityOfDest", that.cityOfDest);

        that.getDistance = VoltaApis.getDistance(args, function(distanceList){
          that.sitesListByDist = distanceList;

	  console.log(distanceList);
        });

      }, function (error) {
        console.log("Oops!! ", error);
      }); 

      args["origins"] = ['94582'];

}

    angular
    .module('voltaStationsDashboard')
    .controller('WelcomeCtrl', ['$scope', 'VoltaApis', WelcomeCtrl]);
})();
