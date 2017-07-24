angular.module("catalogoSeries", []);
angular.module("catalogoSeries").controller("catalogoSeriesCtrl", function($scope, $http){
  $scope.app = "SI-LAB03";
  $scope.busca = [];
  $scope.series = [];
  $scope.watchlist = [];
  $scope.profile = [];
  $scope.logado = false;
  $scope.usuario;

  $scope.buscaSeries = function(nomeSerie){
    var promise = $http.get("https://omdbapi.com/?s=" + nomeSerie + "&type=series&apikey=93330d3c").then(function (response) {
      if(response.data.Response === "False") {
        alert('Sem resultados! Tente outra vez.');
      } else {
        $scope.busca = response.data.Search;
      }
    }, function error (error) {
      console.log(error);
    });
    return promise;
   };

   $scope.cadastrar = function() {
     var nomeCadastro = prompt("Name:", "Seu nome")
     var emailCadastro = prompt("Email:", "email@email.com");
     var senhaCadastro = prompt("Password:", "***********");
     var usuarioCadastrado = {"nome": nomeCadastro, "email": emailCadastro, "senha": senhaCadastro};
     var promise = $http.post("/usuario/", usuarioCadastrado).then(function(response) {
       if (response.data === "") {
         alert("Email ja cadastrado!");
       } else {
         $scope.usuario = response.data;
         $scope.logado = true;
       }
     }, function error (error) {
       console.log(error);
     });
   };

   $scope.logar = function() {
     var emailLogin = prompt("Email:", "email@email.com");
     var senhaLogin = prompt("Password:", "***********");
     var usuarioLogin = {nome: "", email: emailLogin, senha: senhaLogin};
     var promise = $http.post("/usuario/login/", usuarioLogin).then(function(response) {
       $scope.usuario = response.data;
       $scope.logado = true;
       $scope.loadSeries();
     }, function error (error) {
       alert("Incorrect.");
       console.log(error);
     });
   };

  $scope.deslogar = function() {
    if (confirm("DESLOGAR?")) {
      $scope.usuario = undefined;
      $scope.watchlist = [];
      $scope.profile = [];
      $scope.series = [];
      $scope.logado = false;
    }
  };

  $scope.loadSeries = function () {
    console.log($scope.usuario.id);
    var promise = $http.get("/usuario/" + $scope.usuario.id + "/series/").then(function (response) {
      $scope.series = response.data;
      $scope.loadProfileAndWatchlist();
    }, function error (error) {
      console.log(error);
    });
  };

  $scope.loadProfileAndWatchlist = function() {
    for (var i = 0; i < $scope.series.length; i++) {
      if($scope.series[i].noPerfil === true) {
        $scope.loadProfile($scope.series[i]);
      } else {
        $scope.loadWatchlist($scope.series[i].imdbID);
      }
    }
  };

  $scope.loadProfile = function(serie) {
    var promise = $http.get("https://omdbapi.com/?i=" + serie.imdbID + "&plot=full&apikey=93330d3c").then(function(response) {
      serieCarregada = response.data;
      serieCarregada.avaliacao = serie.avaliacao;
      serieCarregada.ultimoEpisodio = serie.ultimoEpisodio;
      $scope.profile.push(serieCarregada);
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.loadWatchlist = function(imdbID) {
    var promise = $http.get("https://omdbapi.com/?i=" + imdbID + "&plot=full&apikey=93330d3c").then(function(response) {
      serieCarregada = response.data;
      $scope.watchlist.push(serieCarregada);
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.contains = function (array, serie) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].imdbID === serie.imdbID) {
        return true;
      }
    }
    return false;
  };

  $scope.addSerieProfile = function(serie) {
    if($scope.logado === false) {
      alert("Usuário não está conectado!");
      return;
    }
    if ($scope.contains($scope.profile, serie)) {
      alert('"' + serie.Title + '" já está no seu perfil!')
    } else {
      var promise = $http.get("https://omdbapi.com/?i=" + serie.imdbID + "&plot=full&apikey=93330d3c").then(function(response) {
        serie = response.data;
        serie.avaliacao = "N/A"
        serie.ultimoEpisodio = "N/A"
        $scope.profile.push(serie);
        $scope.addBD(serie, true);
      }).catch(function(error){
        console.log(error);
      });
    }
  };

  $scope.addSerieWatchlist = function (serie) {
    if($scope.logado === false) {
      alert("Usuário não está conectado!");
      return;
    }
    if ($scope.contains($scope.watchlist, serie)) {
      alert('"' + serie.Title + '" já está na sua lista!')
    } else if ($scope.contains($scope.profile, serie)) {
      alert('"' + serie.Title + '" já está no seu perfil!')
    } else {
      $scope.watchlist.push(serie);
      $scope.addBD(serie, false);
    }
  };

  $scope.addBD = function (serie, noPerfil) {
    var serieAddPerfil = {"imdbID": serie.imdbID, "avaliacao": "N/A", "ultimoEpisodio": "N/A", "usuarioID": $scope.usuario.id, "noPerfil": noPerfil};
    var promise = $http.post("/serie/", serieAddPerfil).then(function(response) {
      $scope.series.push(response.data);
    }, function error (error) {
      console.log(error);
    });
  };

  $scope.removeSerieProfile = function (serie) {
    if(confirm('Remover "' + serie.Title + '" do seu perfil?') === true) {
      var index = $scope.profile.indexOf(serie);
      var id = $scope.getIdByImdbID(serie);
      $scope.removeBD(id);
      $scope.profile.splice(index, 1);
    }
  };

  $scope.removeBD = function(id) {
    var promise = $http.delete("/serie/" + id).then(function(response) {
      return response.data;
    }, function error (error) {
      console.log(error);
    });
  };

  $scope.getIdByImdbID = function(serie) {
    for(var i = 0; i < $scope.series.length; i++) {
      if ($scope.series[i].imdbID === serie.imdbID) {
        return $scope.series[i].id;
      }
    }
  };

  $scope.getSerieByImdbID = function(serie) {
	for(var i = 0; i < $scope.series.length; i++) {
	  if ($scope.series[i].imdbID === serie.imdbID) {
	    return $scope.series[i];
	  }
	}
  };

  $scope.removeSerieWatchList = function (serie) {
    if (confirm('Remover "' + serie.Title + '" da sua lista?') === true) {
      var index = $scope.watchlist.indexOf(serie);
      var id = $scope.getIdByImdbID(serie);
      $scope.removeBD(id);
      $scope.watchlist.splice(index, 1);
    }
  };

  $scope.enviarRating = function (serie, rating) {
	serie.avaliacao = rating;
	var serieAtualizada = $scope.getSerieByImdbID(serie);
	console.log(serieAtualizada);
	serieAtualizada.avaliacao = rating;
    $scope.atualizarSerie(serieAtualizada);
  };

  $scope.enviarLastEpisode = function (serie, episode) {
	serie.ultimoEpisodio = episode;
    var serieAtualizada = $scope.getSerieByImdbID(serie);
    serieAtualizada.ultimoEpisodio = episode;
    $scope.atualizarSerie(serieAtualizada);
  };

  $scope.atualizarSerie = function(serie) {
    var promise = $http.put("/serie/" + serie.id, serie).then(function(response) {
    }, function error (error) {
      console.log(error);
    });
  }

  $('#search-button').on('click', function() {
    $('#search').prop('checked', true);
  });

});
