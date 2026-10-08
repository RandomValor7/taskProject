//clase para definir productos
class Product {
    //Se crea un metodo en el cual se requieren el nombre, precio y año
    constructor(name, price, year) {
        //Dejamos definidas las variables
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//clase UI (Para la vista del usuario)
class UI {
    //metodo de añadir producto
    addProduct(product) {
        //obtenemos la lista del producto mediante el id
        const productList = document.getElementById('product-list');
        //crea un elemento (div)
        const element = document.createElement('div');
        //dentro de este elemento estara el nombre, precio y año
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        //enviamos el nuevo div como un elemento hijo de la lista de productos
        productList.appendChild(element);
        //se llama a el metodo para resetear el formulario
        this.resetForm();
    }

    //nuevo metodo para resetear el formulario
    resetForm() {
        //se llama el formulario por medio del id
        document.getElementById('product-form').reset();
    }

    //metodo para eliminar producto
    deleteProduct(element) {
        if (element.name == 'delete') {
            //parentElement es para coger el elemento padre del anterior
            element.parentElement.parentElement.parentElement.remove();
            //se muestra un mensaje de confirmacion
            this.showMessage('Product Deleted Successfully', 'info');
        }
    }

    // función encargada de mostrar las notificaciones en pantalla
    showMessage(message, cssClass) {
        // generamos un contenedor dinámico tipo div
        const div = document.createElement('div');
        // le agregamos los estilos de alerta y el margen superior
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // insertamos la alerta en la interfaz antes de la sección principal
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        // removemos la notificación automáticamente pasados 3 segundos
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// eventos DOM (Document Object Model) 
// eventos del aplicativo
// se empieza llamando al formulario por su id
document.getElementById('product-form')
    //con esta funcion se traen los valores ingresados
    .addEventListener('submit', function(e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        //se crea un nuevo producto y se le envian los parametros necesarios
        const product = new Product(name,price,year);

        //se crea una nueva UI
        const ui = new UI();;
        //se evalua si los campos están vacios
        if (name === '' || price === '' || year === '') {
            //Si estan vacios, retorna un mensaje
            return ui.showMessage('Complete Fields', 'danger');
        }

        //se añade el producto
        ui.addProduct(product);
        //mensaje si se añade el producto
        ui.showMessage('Product Added Successfully','success');

        //esta funcion es para que no se recargue al enviar el formulario
        e.preventDefault();
    });

//aqui se llama a la lista de productos
document.getElementById('product-list')
    //se escucha el evento click
    .addEventListener('click', function (e) {
        //se crea una nueva UI
        const ui = new UI();
        //se llama el metodo para eliminar producto y se le envian los datos del event
        ui.deleteProduct(e.target);
    });
