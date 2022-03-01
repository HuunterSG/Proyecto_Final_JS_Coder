$(function(){
    $.get("../db/db.JSON", function(data){
        for(const dato of data){
            $('#hola').append(`
                                    <h3>Usuario N°${dato.id}</h3>
                                    <p>Bienvenido nuevamente: ${dato.user}</p> 
                                    `);
        }
        console.table(data)                        
    });
});