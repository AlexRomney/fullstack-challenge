import { Router } from "express";
import { Database } from "better-sqlite3";
import { Organization } from "../types";
import { getDealRelationshipsQuery, setupDealsData } from "../helpers/helpers";

export default function organizationRoutes(db: Database) {
    const router = Router();

    router.get("/", (req, res) => {
        const orgs = db.prepare("SELECT * FROM organizations").all() as Organization[];
        res.json({ orgs });
    });

    router.get("/:id", (req, res) => {
        const id = Number(req.params.id);

        const rows = getDealRelationshipsQuery(db, { orgId: id });

        if (!rows.length) {
            res.status(404).json({ error: 'Organization not found.'});
        }

        const { org_id, org_name, org_created } = rows[0];

        const deals = setupDealsData(rows);

        const org = {
            org_id,
            org_name,
            org_created,
            deals,
        };

        res.json(org);
    });

    return router;
}