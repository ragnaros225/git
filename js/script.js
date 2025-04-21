function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("login-msg");
  
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        msg.textContent = "¡Login exitoso!";
        msg.style.color = "green";
        window.location.href = "map.html"; // Redirect to map page
      } else {
        msg.textContent = "Credenciales inválidas.";
        msg.style.color = "red";
      }
    })
    .catch(err => {
      msg.textContent = "Error en la conexión.";
      msg.style.color = "red";
    });
  }
  
  function initMap() {
    const map = L.map('map').setView([-13.52, -71.97], 13); // Cusco
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([-13.52, -71.97]).addTo(map)
      .bindPopup('Estás aquí (Cusco)')
      .openPopup();
  }
  
  function searchBooks() {
    const query = document.getElementById("searchInput").value;
    const booksContainer = document.getElementById("books");
    booksContainer.innerHTML = "Buscando...";
  
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (!data.items) {
          booksContainer.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }
  
        booksContainer.innerHTML = "";
        data.items.forEach(item => {
          const book = document.createElement("div");
          book.className = "book";
          const info = item.volumeInfo;
  
          book.innerHTML = `
            <h4>${info.title}</h4>
            ${info.imageLinks ? `<img src="${info.imageLinks.thumbnail}" alt="Portada">` : ""}
            <p><strong>Autor:</strong> ${info.authors ? info.authors.join(", ") : "N/A"}</p>
          `;
          booksContainer.appendChild(book);
        });
      });
  }