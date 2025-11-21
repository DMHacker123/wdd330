import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        productListing: path.resolve(__dirname, 'src/product_listing/index.html')
      }
    }
  }
});
