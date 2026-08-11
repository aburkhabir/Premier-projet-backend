export interface command{
    id: number;
    commandName: string;
    commandDescription: string;
}

export interface createCommand{
    commandName: string;
    commandDescription: string;
}

export interface updateCommand{
    id: number;
    commandName: string;
    commandDescription: string;
}