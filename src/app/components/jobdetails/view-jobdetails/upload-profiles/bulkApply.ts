export class BulkApply {
    public JobId: number;
    public ResponseStatusId: number;
    public XmlJobResponse: XmlJobResponse[] = [];
}
export class XmlJobResponse {
    public ProfileId: number;
    public ResumeId: number;
}
