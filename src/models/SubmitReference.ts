
export class CandidateReferenceDetails {
    //constructor(
    public QuestionId: number;
    public Answer: string;
    // ) { }
}
export class GetQuestions {
    constructor(
        public Id: number,
        public Question: string,
        public QuestionTypeId: number,
        public QuestionType: string,
        public Answers: string,
        public ModifiedAnswers: string) { }
}
export class InsertReferences {
    constructor(
        public CandidateReferenceId: number = 0,
        public ListCandidateReferenceDetails: CandidateReferenceDetails[] = []
    ) { }
}
export class GetQuestionnarieAssignement {
    constructor(
        public QuestionnaireAssignmentId: number,
        public QuestionnaireId: number,
        public FullName: string,
        public KnownOrWorkedAt: string,
        public InYear: number,
        public Location: string,
        public Comments: string,
        public IsPublish: boolean,
        public RequestedTo: string,
        public RequestedById: number,
        public RequestedBySourceId: number,
        public StatusId: number,
        public ReferenceStatus: string,
        public Code: string) { }
}

export class GetQuestionnarieResponse {
    constructor(
        public QuestionnaireId: number,
        public QuestionId: number,
        public ResponseId: number,
        public Question: string,
        public Response: string,
        public ResponseValue: string
    ) { }
}
