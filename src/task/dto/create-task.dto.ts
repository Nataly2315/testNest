export class CreateTaskDTO {
    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly executor: string;
    readonly status: string;
    readonly createdAt: string;
    readonly comment: string;
}