export type ITodo = {
    id: string;
    description: string;
    created_at: Date;
    updated_at?: Date | null;
    completed: boolean;
}

export enum TodoFilterType {
    ALL_TODOS = "ALL_TODOS",
    COMPLETED_TODOS = "COMPLETED_TODOS",
    UNCOMPLETED_TODOS = "UNCOMPLETED_TODOS",
}
