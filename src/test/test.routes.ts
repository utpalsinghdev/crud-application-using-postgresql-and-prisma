import { Router } from "express";
import { createCat, createProduct, DeleteProduct, getAllcategories, getAllProducts, getProductById, healthCheck, updateProduct } from "./test.controller";



const router = Router();


router.get("/", healthCheck);
router.get("/products", getAllProducts);
router.get("/categories", getAllcategories);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.post("/product/:id", updateProduct);
router.delete("/product/:id", DeleteProduct);
router.post("/cat", createCat);
router.get("/cat/:id", getProductsByCategory);


export default router;
