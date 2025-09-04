const container = document.getElementById("products");

fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading products:", err));

