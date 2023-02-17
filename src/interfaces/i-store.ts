export interface IStore {
    DMetricsFlag: any;
    WMetricsFlag: any;
    PMetricsFlag: any;
    StoreNum: string;
    emailData: IEmailData[];
    Status: string;
    StoreName: string;
}

export interface IEmailData {
    Email: string;
}