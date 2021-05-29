export type ResponseViewModel<TModel> = {
    status: 'Successful' | 'Failed',
    message: string,
    data: TModel
};
