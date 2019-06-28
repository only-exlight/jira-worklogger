export enum E_PROTOKOL_EVENT {
    post_checkout = 'post_checkout',
    pre_commit = 'pre_commit',
    commit_msg = 'commit_msg'
}

export interface IProtokol {
    event: E_PROTOKOL_EVENT,
    info: string;
}