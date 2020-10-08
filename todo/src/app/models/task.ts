import { List } from './list';

export class Task {
    id: number;
    description: string;
    remindDate: Date;
    dueDate: Date;
    MyDayDate: Date;
    Notes : Date;
    isCompleted : boolean;
    isImportant : boolean;
    list: List

    constructor(){};
}