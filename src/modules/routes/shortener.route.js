import express from "express";
import ShortenerController from "../controllers/shortener.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/shortener/shorten:
 *   post:
 *     summary: Create a short URL
 *     description: Create a short URL for the given original URL
 *     tags:
 *       - Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The original URL to be shortened
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The short URL
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/shorten", ShortenerController.createShortUrl);

/**
 * @swagger
 * /api/shortener/{shortCode}:
 *   get:
 *     summary: Get the original URL
 *     description: Get the original URL for the given short code
 *     tags:
 *       - Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short code not found
 *       500:
 *         description: Internal server error
 */
router.get("/:shortCode", ShortenerController.getOriginalUrl);

/**
 * @swagger
 * /api/shortener/{shortCode}/clicks:
 *   get:
 *     summary: Get the number of clicks
 *     description: Get the number of clicks for the given short code
 *     tags:
 *       - Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code
 *     responses:
 *       201:
 *         description: Number of clicks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clicks:
 *                   type: number
 *                   description: The number of clicks
 *       404:
 *         description: Short code not found
 *       500:
 *         description: Internal server error
 */
router.get("/:shortCode/clicks", ShortenerController.getClicks);

export default router;
