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

/**
 * @swagger
 * /api/shortener/{shortCode}:
 *   delete:
 *     summary: Delete a short URL
 *     description: Delete a short URL for the given short code
 *     tags:
 *       - Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the short URL.
 *     responses:
 *       200:
 *         description: Short URL deleted successfully
 *       404:
 *         description: Short code not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:shortCode", ShortenerController.deleteShortUrl);

/**
 * @swagger
 * /api/shortener/{shortCode}/stats:
 *   get:
 *     summary: Get the statistics of a short URL
 *     description: Get the statistics of a short URL for the given short code
 *     tags:
 *       - Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the short URL.
 *     responses:
 *       201:
 *         description: Short URL statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   description: The original URL
 *                 totalClicks:
 *                   type: number
 *                   description: The total number of clicks
 *                 createdAt:
 *                   type: string
 *                   description: The creation time
 *                 deletedAt:
 *                   type: string
 *                   description: The deletion time
 *       404:
 *         description: Short code not found
 *       500:
 *         description: Internal server error
 */
router.get("/:shortCode/stats", ShortenerController.getShortUrlStats);

/**
 * @swagger
 * /api/shortener/{shortCode}/tracking:
 *   get:
 *     summary: Get the tracking records of a short URL
 *     description: Retrieve tracking records for a specific short URL within a specified date range, with pagination support.
 *     tags:
 *       - Shortener
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code of the URL to track.
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: The start date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: The end date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of records per page
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: Tracking records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ip:
 *                         type: string
 *                         description: The IP address
 *                       referer:
 *                         type: string
 *                         description: The referer
 *                       userAgent:
 *                         type: string
 *                         description: The user agent
 *                       createdAt:
 *                         type: string
 *                         description: The creation time
 *                 paging:
 *                   type: object
 *                   properties:
 *                     index:
 *                       type: number
 *                       description: The current page index
 *                     size:
 *                       type: number
 *                       description: The number of records per page
 *                     total:
 *                       type: number
 *                       description: The total number of records
 *       500:
 *         description: Internal server error
 */
router.get("/:shortCode/tracking", ShortenerController.getTrackingRecords);

// TODO: Implement analytics endpoint
// Note: 依據時間區間提供每日/每週/每月不同顆粒度的數據
// router.get("/:shortCode/analytics", ShortenerController.getAnalytics);
export default router;
