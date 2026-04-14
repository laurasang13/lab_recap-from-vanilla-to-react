// 1. Seleccionamos los elementos del DOM que vamos a manipular
const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let skip = 0; // Control de paginación
const limit = 10; // Cuántos traemos por vez

// 2. Función asíncrona para traer la data
async function fetchAndRenderUsers() {
  try {
    // Feedback visual: desactivamos el botón mientras carga
     
    loadMoreBtn.disabled = true;

    // Petición a la API usando Template Literals para meter las variables
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) throw new Error("Error en la descarga");

    const data = await response.json();
    const users = data.users;

    // 3. Renderizado manual: Recorremos los usuarios y creamos el HTML
    users.forEach((user) => {
      const userCard = document.createElement("div"); // Creamos el nodo
      userCard.className = "user-card"; // Le ponemos la clase de CSS
      
      // Metemos el contenido (recordar las comillas invertidas)
      userCard.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <p><strong>${user.firstName} ${user.lastName}</strong></p>
      `;
      
      // Lo inyectamos en el contenedor
      userListContainer.appendChild(userCard);
    });

    // 4. Actualizamos el skip para la siguiente carga
    skip += limit;

  } catch (error) {
    console.error("¡Vaya! Algo ha fallado:", error);
    userListContainer.innerHTML += "<p>Error al cargar los usuarios.</p>";
  } finally {
    // Pase lo que pase (error o éxito), reactivamos el botón
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

// 5. Listeners iniciales
loadMoreBtn.addEventListener("click", fetchAndRenderUsers);

// Ejecutamos una vez al principio para que la web no empiece vacía
fetchAndRenderUsers();