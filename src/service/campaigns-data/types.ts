export interface CampaignRow {
    Date: string,
    Datasource: string,
    Campaign: string,
    Clicks: number,
    Impressions: number
}

export interface CampaignsDataState {
    data: CampaignRow[],
    filters: {
        campaigns: string[],
        sources: string[],
    }
    loading: boolean,
    error?: Error
}
