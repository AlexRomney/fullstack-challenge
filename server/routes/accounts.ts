import { Router } from "express";
import { Database } from "better-sqlite3";
import { Account } from "../types";

export default function accountRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const accounts = db.prepare("SELECT * FROM accounts").all() as Account[];
        res.json({ accounts });
    });

    return router;
}