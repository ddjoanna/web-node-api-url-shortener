import express from "express";
import QrCodeController from "../controllers/qrcode.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/qrcode/generate:
 *   post:
 *     summary: Generate QR Code
 *     description: Generate QR Code for the given URL with custom logo
 *     tags:
 *       - QR Code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - logo
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to generate QR Code
 *               logo:
 *                 type: string
 *                 description: The logo URL to embed in QR Code
 *     responses:
 *       200:
 *         description:
 *           The generated QR code image in PNG format
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               format: base64
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/generate", QrCodeController.generateQrCode);

export default router;
