const fs = require("fs").promises;


class ProductManager{
    static lastId = 0; 
    constructor (path){
        this.products = [];
        this.path= path;
    }

    async addProduct(nuevoObjeto) {
        let {title, description, price, img, code, stock} = nuevoObjeto;

        if(!title || !description || !price || !img || !code || !stock){
            console.log("Deben completarse todos los campos. Por favor volver a intentarlo.");
            return;
        }

        if(this.products.some(item => item.code === code)){
            console.log("El código ingresado ya existe en la BD.");
            return;
        }

        const newProduct = {
            id: ++Productmanager.lastId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct);
        await this.guardarArchivo(this.products);
    }

    getProducts(){
        console.log(this.products)
    }

    async getProductById(id){
        try{
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);
            if (!buscado){
                console.log("Producto no Encontrado");
            }else{
                console.log("Producto encontrado.");
                return buscado;
            }

        }catch(error){
            console.log("No se encontró el producto buscado", error)
        }
    }

    //Método Leer
    async leerArchivo() {
        try{
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        }catch(error){
            console.log("Error al leer un archivo", error);
        }
        
    }

    //Método Guardar

        async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2)); 
        }catch (error){
            console.log("error al guardar el Archivo", error)
        }
    }

    // Método Actualizar
    async updateProduct(id, productoActualizado){
        try{
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);
            if(index !== -1){
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            }else {
                console.log("Producto no encontrado");
            }

        }catch (error){
            console.log("Error al actualizar el producto indicado", error)
        }
    }

    // Método Borrar
    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();
    
            const index = arrayProductos.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
                console.log("Producto eliminado correctamente");
            } else {
                console.log("Producto no encontrado");
            }
    
        } catch (error) {
            console.log("Error al eliminar el producto indicado", error);
        }
    }
    
}

module.exports = ProductManager;