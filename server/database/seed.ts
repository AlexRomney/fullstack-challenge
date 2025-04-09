import { Database } from "better-sqlite3";
import dayjs from "dayjs";

interface SeededOrg {
    id: number;
    name: string;
}

interface SeededAccount {
    id: number;
    name: string;
}

export default function seedDatabase(db: Database): void {
    const orgCount = db.prepare("SELECT COUNT(*) as count FROM organizations").get() as { count: number };

    if (orgCount.count > 0) return;

    console.log("Seeding database...");

    // Seed organizations
    const insertOrganization = db.prepare("INSERT INTO organizations (name) VALUES (?)");
    const orgs: SeededOrg[] = ["McDonald's", "Burger King", "Wendy's"]
        .map((name) => {
        const result = insertOrganization.run(name);
        return { id: result.lastInsertRowid as number, name };
    });

    // Seed accounts
    const insertAccount = db.prepare("INSERT INTO accounts (name) VALUES (?)");
    const accounts: SeededAccount[] = [
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

    accounts.forEach((account, index) => {

        const org = orgs[index % orgs.length];

        const startDate = getRandomDateWithinFiveYears();
        const endDate = dayjs(startDate).add(6, "month").format("YYYY-MM-DD HH:mm:ss");

        insertDeal.run(
            org.id,
            account.id,
            startDate,
            endDate,
            100000 + (index * 50000),
            "active"
        );
    });

    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const endOfYear = dayjs().endOf("year").format("YYYY-MM-DD HH:mm:ss");

    insertDeal.run(
        2, 3, now, endOfYear, 6500000, "active"
    );

    console.log("✅ Seed data inserted");
}

function getRandomDateWithinFiveYears(): string {
    const now = dayjs();
    const fiveYearsInDays = 5 * 365;
    const randomOffset = Math.floor(Math.random() * fiveYearsInDays * 2) - fiveYearsInDays; // between -5y and +5y
    return now.add(randomOffset, 'day').format("YYYY-MM-DD HH:mm:ss");
}