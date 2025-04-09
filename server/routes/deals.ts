import { Router } from "express";
import { Database } from "better-sqlite3";
import { Deal } from "../types";

export default function DealRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const deals = db.prepare("SELECT * FROM deals").all() as Deal[];
        res.json({ deals });
    });

    return router;
}