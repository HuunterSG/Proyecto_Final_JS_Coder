//llamamos a ready
$(document).ready(function () {
  $("#boton1").click(function () {
    $("#formulario").show();
    $("#boton2").click(function (e) {
      e.preventDefault()
      $("#registrarme").slideDown(1500);
                        $("#escape").click(function(e){
                          e.preventDefault();
                          $("#registrarme").slideUp();
                          $("#formulario").fadeOut(2000);
    });
                        $("#escape2").click(function(e){
                          e.preventDefault();
                          $("#registrarme").slideUp(2000);
                          $("#formulario").fadeOut(2000);
    });
      console.log("hola");
    });
  });
  $("#btnTienda").click(function () {
    $(".conttienda").toggle();

  })
  $("#carri").click(function () { 
    
    $(".contcarrito").toggle();
  });

  $("#modalBtn").click(function(e){
    e.preventDefault();
    $("#modal").slideDown(2000)
      
      $("#closeBtn").click(function(){
        $("#modal").slideUp(1500)
      })
  });

  $("#btnFinalizar").click(function(){
    console.log("Funciona")
    $("#contEmergente").css("visibility", "visible");
      $("#closeEmer").click(function(e){
        e.preventDefault()
        $("#contEmergente").css("visibility", "hidden");
      })
  })  

});

