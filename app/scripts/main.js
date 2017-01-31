// App Module
let app = angular.module('weatherWizard', []);

app
	.service('geo', ['$http', function($http) {
		const self = this;

		self.posPromise = function() {
			return new Promise((resolve, reject) => {
				var location = {};
				navigator.geolocation.getCurrentPosition(pos => {
					location.lat = pos.coords.latitude;
					location.long = pos.coords.longitude;

					if (location.lat && location.long) {
						resolve(location);
					} else {
						reject('poop');
					}
				}, () => {
					alert('Sorry, we couldn\'t find your location. Please make sure your location services are enabled and refresh the page.');
				});
			});
		};
	}]);

app
	.service('weather', ['$http', 'geo', function($http, geo) {
		const self = this;

		self.get = function(url) {
			return $http.get(url);
		};
	}]);

app
	.controller('mainCtrl', ['geo', 'weather', function(geo, weather) {
		const self = this;

		self.far = true;

		geo.posPromise().then(coords => {
			const URL = 'https://api.apixu.com/v1/current.json?key=3d7cf972d2c54e37963222024172501&q=' + coords.lat + ',' + coords.long;
			weather.get(URL).then(response => {
				self.weather = response.data.current;
				self.location = response.data.location;
			});
		});
	}]);