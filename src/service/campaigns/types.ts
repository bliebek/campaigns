export interface Campaign {
    Date: string,
    Datasource: string,
    Campaign: string,
    Clicks: number,
    Impressions: number
}

export interface CampaignsState {
    data: Campaign[],
    loading: boolean,
    error?: Error
}
