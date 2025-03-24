import express from "express";
import RedirectController from "../controllers/redirect.controller.js";

const router = express.Router();

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *      summary: Redirect to the original URL
 *      description: Redirect to the original URL for the given short code
 *      tags:
 *        - Redirect
 *      parameters:
 *        - in: path
 *          name: shortCode
 *          schema:
 *            type: string
 *          required: true
 *          description: The short code
 *      responses:
 *        302:
 *          description: Redirect to the original URL
 *        404:
 *          description: Short code not found
 *        500:
 *          description: Internal server error
 */
router.get("/:shortCode", RedirectController.redirectOriginalUrl);

export default router;
