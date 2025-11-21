export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href = "../product_pages/product.html?product=${product.id}">   <img src="${product.image}" 
    alt="Image of ${product.name}"/>


    <h2 class = "card_brand">${product.brand}</h2>
    <h3 class = "card_name">${product.name}</h3>
    <p class = "product-card_price">${product.price}</p>
    </a>  </li>`
}