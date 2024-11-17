const listaUsuarios = document.getElementById('listaUsuarios');

// Función para generar edades aleatorias entre 20 y 60
//  Sumamos 20 a la edad generada para asegurar que no sale una edad de 8 años
const generarEdad = () => Math.floor(Math.random() * 41) + 20;

function obtenerUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then((usuarios) => {
            // Añadimos las nuevas propiedades usando spread operator
            const usuariosConDetalles = usuarios.map((usuario, index) => {
                const { street, suite, city } = usuario.address;
                return {
                    ...usuario,
                    age: generarEdad(),
                    img: `./assets/img/${index + 1}.jpeg`,
                    address: `${street}, ${suite}, ${city}`
                };
            });

            mostrarUsuarios(usuariosConDetalles);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Función para mostrar los usuarios en el DOM
function mostrarUsuarios(usuarios) {
    listaUsuarios.innerHTML = '';

    usuarios.forEach((usuario) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${usuario.img}" alt="Imagen de ${usuario.name}">
            <div>
                <h3>${usuario.name} (${usuario.age} años)</h3>
                <p><strong>Username:</strong> ${usuario.username}</p>
                <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                <p><strong>Dirección:</strong> ${usuario.address}</p>
            </div>
        `;
        listaUsuarios.appendChild(li);
    });
}

obtenerUsuarios();
