app.controller('pokemonSearchController', ['$scope', '$http', function ($scope, $http){
	$scope.loadingDone = false;
	$scope.loading = false;
	$scope.loadingColorDone = false;
	$scope.isNavCollapsed = true;
	$scope.isCollapsed = true;
	$scope.isCollapsedHorizontal = false;
	//Search by Name or Id
	$scope.searchPokemonButton = function(){
		$scope.loading = true;
		$http({
			method : "GET",
			url : baseAddress + 'pokemon/' + $scope.searchInput
		}).then(function mySuccess(response) {
			$scope.responseData = response.data;
			$scope.name = $scope.responseData.name;
			$scope.baseExp = $scope.responseData.base_experience;
			$scope.pokemonHeight = $scope.responseData.height;
			$scope.pokemonWeight = $scope.responseData.weight;
			$scope.pokemonImages = $scope.responseData.sprites;
			$scope.pokemonTypes = $scope.responseData.types;
			$scope.pokemonMoves = $scope.responseData.moves;
			$scope.pokemonAbilities = $scope.responseData.abilities;
			$scope.imageArray = [];
			angular.forEach($scope.pokemonImages, function(value, key){
				$scope.imageArray.push(value);
			});
			$scope.loadingDone = true;
			$scope.loadingColorDone = false;
			$scope.pokemonImage = $scope.imageArray[0];
			$scope.pokemonImageBackground = $scope.imageArray[1];
			$scope.loading = false;
		}, function myError(response) {
			swal({
                title: 'Not Found.',
                text: 'Pokemon with name ' + $scope.searchInput + ' does not exist.',
                type: 'error'
            });
			$scope.searchInput = '';
			$scope.loadingDone = false;
			$scope.loading = false;
		});
	};
	//Search by Color
	$scope.searchPokemonbyColorButton = function(){
		$scope.loading = true;
		$http({
			method : "GET",
			url : baseAddress + 'pokemon-color/' + $scope.searchInputColor
		}).then(function mySuccess(response) {
			$scope.loadingDone = false;
			$scope.loadingColorDone = true;
			$scope.pokemonNames = response.data.pokemon_species;
			$scope.loading = false;
		}, function myError(response) {
			swal({
                title: 'Not Found.',
                text: 'Pokemon with ' + $scope.searchInputColor + ' color does not exist.',
                type: 'error'
            });
			$scope.searchInputColor = '';
			$scope.loadingColorDone = false;
			$scope.loading = false;
		});
	};
}]); 