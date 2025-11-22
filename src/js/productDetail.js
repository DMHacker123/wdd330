import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// get the product id from the query string
const productId = getParam("product");

const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);

product.init();
