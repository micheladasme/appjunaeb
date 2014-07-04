function buscarme(){
	         $.mobile.loading('show');
			if (!navigator.geolocation){
		    	alert("Error de gps");
		    	return;
		  	}

			function success(position) {
				var lat  = position.coords.latitude;
			    var lng = position.coords.longitude;
			    var coor = lat+","+lng;

			    dibujarMapa(coor);
			};

			function error() {
			   alert("No se puede encontrar su ubicación");
			};

			navigator.geolocation.getCurrentPosition(success, error);
		}

		function dibujarMapa(pos){
			

			var yo = new google.maps.MarkerImage('yo.png',
			    new google.maps.Size(30,50), //tamaño icono
			    new google.maps.Point(0,0),
			    new google.maps.Point(20,40)
			);
             $.mobile.loading('hide');
			$('#mapa').gmap({'center': pos, 'zoom': 15, 'disableDefaultUI':true, 'callback': function() {
					
					//instancia mapa
					var self = this;

					//agrego marcador donde estoy
					self.addMarker({'position': this.get('map').getCenter(), 'icon': yo, 'title': 'aquí estoy', 'animation': 'bounce'  }).click(function() {
						alert(this.get('map').getCenter());
						self.openInfoWindow({ 'content': 'Aquí estoy :P' }, this);
					});	

					//agrego marcadores de comercios
					$.getJSON('http://madasme.esy.es/app_junaeb/locales.php', function(data) { 
						$.each(data, function(i, marker) {
						$('#mapa').gmap('addMarker', { 
						'position': new google.maps.LatLng(marker.latitud, marker.longitud) 
						}).click(function() {
						$('#mapa').gmap('openInfoWindow', { 'content': marker.nombre }, this);
						});
						});
						});
                  /*   
					self.addMarker({'position': '-33.515612,-70.718592'}).click(function() {
						self.openInfoWindow({ 'content': 'San_Camilo' }, this);
					});	
                    self.addMarker({'position': '-33.516959,-70.717183'}).click(function() {
						self.openInfoWindow({ 'content': 'Patio de Comidas Plaza Oeste' }, this);
					});	
					self.addMarker({'position': '-33.515233,-70.718468'}).click(function() {
						self.openInfoWindow({ 'content': 'Casino Duoc UC' }, this);
					});	
					self.addMarker({'position': '-33.517960,-70.714883'}).click(function() {
						self.openInfoWindow({ 'content': 'Doggis Tottus' }, this);
					});*/	
					
					//agregar circulo que rodea el marcador
					self.addShape('Circle', { 
						'strokeWeight': 1, //cortorno del circulo
						'fillColor': "#FA5882", //color de shape
						'fillOpacity': 0.25, //opacidad de shape
						'center': this.get('map').getCenter(), //posicion de shape
						'radius': 300, //radio de shape
						'clickable': false 
					}); //FIN ADDSHAPE
					

			}}); //FIN GMAP
		} //FIN DIBUJARMAPA

		$(document).on('pageshow', '#pag2', function() {

		$('#buscarme').click(buscarme);
		/*buscarme();*/
		/*$('#buscarme').trigger('click');*/ 
		}); //FIN READY

	
		
		