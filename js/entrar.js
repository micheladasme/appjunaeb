 $(document).on('pageshow', '#pag1', function() {
  
     $("#btnEntrar").click(function(){
      
      var parametros = {
      rut: $("#rut").val(),
      pass: $("#pass").val()
      };

      $.ajax({
      url: 'http://madasme.esy.es/app_junaeb/entrar.php',
      type: 'post',
      data: parametros,
      error: function(){
        $('#net').trigger('click');
        $.mobile.loading('hide');
        //$("#error").html("Oops! ocurrió un error....");
      },
      beforeSend: function(){
        //antes que se complete el php
        $.mobile.loading('show');
      },
      success: function(res){
        //completó el php
       
        $.mobile.loading('hide');
        var objeto = jQuery.parseJSON(res);

        if(objeto.mensaje === "true")
        { 
         
          $('#dinero').val(objeto.saldo);
          $('#nom').html(objeto.nombre);
                 
          
        $.mobile.changePage("#pag2", 
          { 
            transition: "slide", 
            changeHash: true,
          
          });
       

        }
        else{
          
         $('#pop').trigger('click');
          
        } 
      
       
      }

    });
   
     
  });
  });

 
 