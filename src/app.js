const ProductManager = require("./product-manager.js");

const manager = new ProductManager ("./src/productos.json");

const express = require("express");

const PUERTO = 8080

//Creación de Servidor:
const app = express();

app.get("/products", async(req, res)=>{
    try{
        const arrayProductos = await manager.leerArchivo();
        let limit = parseInt(req.query.limit);
        if(limit){
            const arrayConLimite = arrayProductos.slice(0, limit);
            return res.send(arrayConLimite);
        }else{
            return res.send(arrayProductos)
        }

    }catch(error){
        console.log(error);
        return res.send("Error al procesar la solicitud.", error)};
})

app.get("/products/:pid", async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);
        const buscado = await manager.getProductById(pid);
        if (buscado) {
            return res.send(buscado);
        } else {
            const errorRes = {
                error: true,
                message: "ID de producto no encontrado o incorrecto."
            };
            return res.status(404).json(errorRes);
        }
    } catch (error) {
        console.error(error);
        const errorRes = {
            error: true,
            message: "Error en la búsqueda del ID."
        };
        res.status(500).json(errorRes);
    }
});



app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el Puerto ${PUERTO}`);
})
