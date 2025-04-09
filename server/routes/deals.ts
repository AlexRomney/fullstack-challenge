import { Router } from "express";
import { Database } from "better-sqlite3";

export default function DealRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const deals = db.prepare(`
            SELECT
                deals.id,
                organizations.name AS organization_name,
                accounts.name AS account_name,
                deals.start_date,
                deals.end_date,
                deals.status,
                deals.value / 100.0 AS value
            FROM deals
            JOIN organizations ON deals.organization_id = organizations.id
            JOIN accounts ON deals.account_id = accounts.id
        `).all();
        
        res.json({ deals });
    });

    return router;
}