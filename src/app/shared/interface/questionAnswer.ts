export interface QuestionAnswer {
    new ?: boolean,
    edited ?: boolean,
    saved ?: boolean,
    closed ?: boolean,
    id?: number,
    question: string,
    answer: string,
    create_date: Date,
    live: boolean,
    live_valid_to: Date | string,
    status: string,
    status_valid_to: Date | string,
    tags: string[],
    quick_note: string,
    approved: string,
    last_update_time: string,
    last_update_user: string,
    long_note: string,
    contact_mail: string,
    email_has_sent: boolean,
    filter: number[],
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
