import { Router } from "express";
import { Database } from "better-sqlite3";

export default function accountRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const accounts = db.prepare(`
            SELECT
            accounts.*,
            COUNT(deals.id) AS deal_count
            FROM accounts
            LEFT JOIN deals ON deals.account_id = accounts.id
            GROUP BY accounts.id
        `).all();
        
        res.json({ accounts });
    });

    return router;
}