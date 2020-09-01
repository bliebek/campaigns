export interface GenericAction {
    type: string
};

export interface GenericActionListSuccess<T> {
    type: string,
    data: T[]
};

export interface GenericActionError {
    type: string,
    e: Error
};
