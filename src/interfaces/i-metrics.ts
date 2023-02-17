export interface IMetrics {
    StoreNum: string;
    SK: string;
    CreateDate: string;
    DMetrics: Metrics[];
    PMetrics: PMetrics[];
    WMetrics: WMetrics[];
    MStatus: string;
    StoreName: string;
    Area: string;
}

export interface Metrics {
    Title: string;
    Value: string;
}
export interface PMetrics {
    Title: string;
    Value: string;
}
export interface WMetrics {
    Title: string;
    Value: string;
}
