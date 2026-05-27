export interface QuestionAnswer {
    new ?: boolean,
    edited ?: boolean,
    saved ?: boolean,
    closed ?: boolean,
    id?: number,
    question: string,
    answer: string,
    createdAt: Date,
    live: boolean,
    liveValidUntil: Date | string,
    status: string,
    statusValidUntil: Date | string,
    tags: string[],
    quickNote: string,
    approved: string,
    updatedAt: string,
    updatedBy: string,
    longNote: string,
    contactMail: string,
    emailHasSent: boolean,
    filters: number[],
}

export interface FilterGroup {
    new ?: boolean,
    id ?: number;
    name: string;
    nameInput: string;
    order: number;
    live: boolean;
    liveInput: boolean;
    subfilters: Subfilter[];
    edit : boolean;
}

export interface Subfilter{
    new ?: boolean,
    id ?: number;
    name: string;
    nameInput: string;
    order: number;
    live: boolean;
    liveInput: boolean;
    filter_group: number;
    filter_group_index?: number;
    edit: boolean;
}

export interface Statistic{
    question_name: string,
    count: number,
}
