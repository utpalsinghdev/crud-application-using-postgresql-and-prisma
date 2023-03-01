import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const healthCheck: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "server is running 🚀" })
    } catch (error) {
        next(error);
    }
}

export const getAllProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        res.status(200).json({ success: true, message: "all products Fetched 🔥", products })
    } catch (error) {
        next(error);
    }
}
export const getAllcategories: RequestHandler = async (req, res, next) => {
    try {
        const cateogories = await prisma.category.findMany({
            include: { products: true }
        });
        res.status(200).json({ success: true, message: "all cateogories Fetched 🔥", cateogories })
    } catch (error) {
        next(error);
    }
}

export const getProductById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { category: true }
        });
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        res.status(200).json({ success: true, message: "product Fetched 🔥", product })

    } catch (error) {
        next(error);
    }
}

export const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await prisma.product.findUnique({
            where: { name: data.name }
        });
        if (product) {
            return res.status(400).json({ success: false, message: "product already exists" })
        }
        const Newproduct = await prisma.product.create({
            data: req.body
        })
        res.status(201).json({ product: Newproduct, message: "product created" })
    } catch (error) {
        next(error);
    }
}

export const createCat: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body;
        const cat = await prisma.category.findUnique({
            where: { name: data.name }
        });
        if (cat) {
            return res.status(400).json({ success: false, message: "category already exists" })
        }
        const Newcat = await prisma.category.create({
            data: req.body
        })
        res.status(201).json({ product: Newcat, message: "category created" })
    } catch (error) {
        next(error);
    }
}

export const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        const catId = await prisma.category.findUnique({
            where: { id: req.body.categoryId }
        });
        if (!catId) {
            return res.status(400).json({ success: false, message: "category not found" })
        }

        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: req.body,
            include: { category: true }
        })
        res.status(200).json({ product: updatedProduct, message: "product updated" })
    } catch (error) {
        next(error);
    }
}


export const DeleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) }
        });
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        await prisma.product.delete({
            where: { id: Number(id) }
        })


        res.status(202).json({ message: "delete Remove successfully" })
    } catch (error) {
        next(error);
    }
}
