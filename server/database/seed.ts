import { Database } from "better-sqlite3";
import dayjs from "dayjs";

export default function seedDatabase(db: Database) {
    const orgCount = db.prepare("SELECT COUNT(*) as count FROM organizations").get() as { count: number };

    if (orgCount.count > 0) return;

    console.log("Seeding database...");

    // Seed organizations
    const insertOrganization = db.prepare("INSERT INTO organizations (name) VALUES (?)");
    const orgs = ["McDonald's", "Burger King", "Wendy's"].map((name) => {
        const result = insertOrganization.run(name);
        return { id: result.lastInsertRowid as number, name };
    });

    // Seed accounts
    const insertAccount = db.prepare("INSERT INTO accounts (name) VALUES (?)");
    const accounts = [
        "Pokemon",
        "SpongeBob SquarePants",
        "Super Mario",
        "Bluey",
    ].map((name) => {
        const result = insertAccount.run(name);
        return { id: result.lastInsertRowid as number, name };
    });

    // Seed deals
    const insertDeal = db.prepare(
        `
            INSERT INTO deals (
            organization_id,
            account_id,
            start_date,
            end_date,
            value,
            status
            ) VALUES (?, ?, ?, ?, ?, ?)
        `
    );

    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const endOfYear = dayjs().endOf("year").format("YYYY-MM-DD HH:mm:ss");

    accounts.forEach((account, index) => {
        const org = orgs[index % orgs.length];
        insertDeal.run(
            org.id,
            account.id,
            now,
            endOfYear,
            100000 + (index * 50000),
            "active"
        );
    });

    console.log("✅ Seed data inserted");
}