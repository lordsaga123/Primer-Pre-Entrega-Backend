const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
}); 
//Función para renderizar la tabla de productos:
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flex-container");

    productos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const contenidoTarjeta = document.createElement("div");
        contenidoTarjeta.classList.add("contenido-tarjeta");

        contenidoTarjeta.innerHTML = `
            <p>Id ${item.id} </p>
            <p>Titulo ${item.title} </p>
            <p>Precio ${item.price} </p>
            <button> Eliminar Producto </button>
        `;

        card.appendChild(contenidoTarjeta);
        flexContainer.appendChild(card);

        // Agregamos el evento eliminar producto:
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        });
    });

    // Agregamos el contenedor flexible al contenedor principal
    contenedorProductos.appendChild(flexContainer);
}

//Eliminar producto: 
const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//Agregar producto:

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
});


const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    
    socket.emit("agregarProducto", producto);
};
