import { Database } from "better-sqlite3";
import { DealRelationshipQuery } from "../types";

export function getDealRelationshipsQuery(
    db: Database,
    filters: { orgId?: number; accountId?: number; dealId?: number }
): DealRelationshipQuery[] {

    let condition: string = "";
    const tableId: (number | string)[] = [];

    if (filters.orgId) {
        condition = "org.id = ?";
        tableId.push(filters.orgId);
    }

    if (filters.accountId) {
        condition = "accounts.id = ?";
        tableId.push(filters.accountId);
    }

    if (filters.dealId) {
        condition = "deals.id = ?";
        tableId.push(filters.dealId);
    }

    const whereClause = condition ? `WHERE ${condition}` : "";

    const sql = `
        SELECT
        org.id AS org_id,
        org.name AS org_name,
        org.created_at AS org_created,
        deals.id AS deal_id,
        deals.value / 100 AS value,
        deals.status,
        deals.start_date,
        deals.end_date,
        accounts.name AS account_name
        FROM organizations AS org
        LEFT JOIN deals ON deals.organization_id = org.id
        LEFT JOIN accounts ON deals.account_id = accounts.id
        ${whereClause}
    `;

    return db.prepare(sql).all(...tableId) as DealRelationshipQuery[];
}

export function setupDealsData(rows: DealRelationshipQuery[]) {
    return rows
        .filter((row) => row.deal_id !== null)
        .map((row) => ({
            id: row.deal_id!,
            value: row.value!,
            status: row.status!,
            account_name: row.account_name!,
            start_date: row.start_date!,
            end_date: row.end_date!,
        }));
}