// product-listing.js
document.addEventListener("DOMContentLoaded", () => {
  // Product data by category
  const products = {
    tents: [
      { name: "2-Person Tent", final: 99.99, retail: 129.99 },
      { name: "4-Person Tent", final: 149.99, retail: 199.99 },
    ],
    backpacks: [
      { name: "Daypack Backpack", final: 49.99, retail: 59.99 },
      { name: "Hiking Backpack", final: 89.99, retail: 120.00 },
    ],
    "sleeping-bags": [
      { name: "Summer Sleeping Bag", final: 59.99, retail: 79.99 },
      { name: "Winter Sleeping Bag", final: 119.99, retail: 150.00 },
    ],
    hammocks: [
      { name: "Portable Hammock", final: 39.99, retail: 49.99 },
      { name: "Camping Hammock", final: 69.99, retail: 89.99 },
    ]
  };

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "";

  if (!category || !products[category]) {
    productList.innerHTML = "<li>No products found for this category.</li>";
    return;
  }

  products[category].forEach(product => {
    const li = document.createElement("li");

    // Display name and prices
    li.innerHTML = `
      <span class="product-name">${product.name}</span>
      <span class="product-prices">
        $${product.final.toFixed(2)}
        ${product.final < product.retail ? `<span class="retail-price">$${product.retail.toFixed(2)}</span>` : ""}
      </span>
    `;

    // Add discount badge if final < retail
    if (product.final < product.retail) {
      const discountPercent = Math.round(((product.retail - product.final) / product.retail) * 100);
      const badge = document.createElement("span");
      badge.className = "discount-badge";
      badge.textContent = `-${discountPercent}% OFF`;
      li.appendChild(badge);
    }

    productList.appendChild(li);
  });
});
