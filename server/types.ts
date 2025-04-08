export interface Organization {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Account {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Deal {
    id: number;
    organization_id: number;
    account_id: number;
    value: number;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}