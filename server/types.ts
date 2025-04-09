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

export interface DealRelationshipQuery {
    org_id: number;
    org_name: string;
    org_created: string;
    org_updated: string;
    deal_id: number;
    value: number;
    status: string;
    start_date: string;
    end_date: string;
    account_name: string;
}