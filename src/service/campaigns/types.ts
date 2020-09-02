export interface Campaign {
    Date: string,
    Datasource: string,
    Campaign: string,
    Clicks: number,
    Impressions: number
}

export interface CampaignsState {
    data: Campaign[],
    campaigns: string[],
    sources: string[],
    selectedCampaigns: string[],
    selectedSources: string[],
    loading: boolean,
    error?: Error
}
