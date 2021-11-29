import express from "express";
import { redirectToOriginalUrlController } from "../handlers/redirect-to-original/redirect-to-original.controller";
import { storeLinkController } from "../handlers/store-link/store-link.controller";

export const router = express.Router();

router.get(`/ping`, (req, res) => res.json(`pong`));
router.get(`/:shortenedUrl`, redirectToOriginalUrlController);
router.post(`/shorten`, storeLinkController);
