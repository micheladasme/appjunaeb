   $(document).ready(function() {
		$.ajax({
				url: 'locales.php',
				type: 'POST',
				error: function(){
       			 alert("Ocurrio un Error con cargar marcadores");
					
				},
				success: function(resul){
					var dataJson = eval(resul);
             
            for(var i in dataJson){
                alert("latitude" +" : "+ dataJson[i].latitud);
            }	
				//Simulación de JSON
			var marcadores = [
				 {
          "latitude":-33.515612,
          "longitude":-70.718592,
          "content":"San camilo",
        }, 
        {
          "latitude":-33.516959, 
          "longitude":-70.717183,
          "content":"Patio de Comidas Mall Plaza Oeste",
        },
        {
          "latitude":-33.515233, 
          "longitude":-70.718468,
          "content":"Casino Duoc UC",
        },
        {
          "latitude":-33.517960, 
          "longitude":-70.714883,
          "content":"Doggis tottus",
        }
			];
			


			//Inicialización de mapa
			$('#mapa').gmap().bind('init', function() { 
				
					//Inicio each
					$.each( marcadores, function(cont, marcadores) {
						
						$('#mapa').gmap('addMarker', {
							'position': new google.maps.LatLng(marcadores.latitude, marcadores.longitude), 
							'bounds': true 
						})
						.click(function() { 

							$('#mapa').gmap('openInfoWindow', { 
								'content': marcadores.content
							}, this);

						});
						//Fin click

					}); 
					//Fin each
			
			});

			





		});
	



				}
			});
			
				
			