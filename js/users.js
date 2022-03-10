$(function(){
    $.get("./db/db.JSON", function(data){
        for(const dato of data){
            $('#hola').append(`     <div class="cardH">
                                    <h3 class="userT">Usuario N°${dato.id}</h3>
                                    <p class="userP">Bienvenido nuevamente: ${dato.user}</p> 
                                    </div>
                                    `);
        }
        console.table(data)                        
    });
});
// function para crear el h2 con nombre de usuario sin terminar!!
// $(function(){
//     $.get("../db/db.JSON", function(date){
//         for(const dato of date){
//             if(("#iNombre"==dato.user)&&("#IContraseña"==dato.password)){
//                 $("#login").append(`<h2>${dato.user}</h2>`);
//                 console.log(dato.user)
//             }
//         }
//     })
// });