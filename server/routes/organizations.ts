import { Router } from "express";
import { Database } from "better-sqlite3";
import { getDealRelationshipsQuery, setupDealsData } from "../helpers/helpers";

export default function organizationRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const orgs = db.prepare(`
            SELECT
            organizations.*,
            COUNT(deals.id) AS deal_count
            FROM organizations
            LEFT JOIN deals ON deals.organization_id = organizations.id
            GROUP BY organizations.id
        `).all();
        
        res.json({ orgs });
    });

    router.get("/:id", (req, res) => {
        const id = Number(req.params.id);

        const rows = getDealRelationshipsQuery(db, { orgId: id }); // helpers.tsx

        if (!rows.length) {
            res.status(404).json({ error: 'Organization not found.'});
            return;
        }

        const { org_id, org_name, org_created } = rows[0];

        const deals = setupDealsData(rows); // helpers.tsx

        const statuses = ["active", "paused", "cancelled"];

        const totals = statuses.reduce((totals, status) => {
            totals[status] = deals
                .filter((deal) => deal.status === status)
                .reduce((sum, deal) => sum + deal.value, 0);
            return totals;
        }, {} as Record<string, number>);

        const org = {
            org_id,
            org_name,
            org_created,
            deals,
            totals
        };
        console.log(org);
        res.json(org);
    });

    return router;
}