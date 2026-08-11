import {CommandRepository} from "../repository/CommandRepository";

export class CommandService {
    private commandRepository: CommandRepository;
    constructor() {
        this.commandRepository = new CommandRepository();
    }

    async createCommand(command: { commandName: string; commandDescription: string }): Promise<void> {
        await this.commandRepository.createCommand(command);
    }

    async getAllCommands(): Promise<{ id: number; commandName: string; commandDescription: string }[]> {
        return await this.commandRepository.getAllCommands();
    }

    async getCommandById(id: number): Promise<{ id: number; commandName: string; commandDescription: string } | null> {
        return await this.commandRepository.getCommandById(id);
    }

    async updateCommand(command: { id: number; commandName: string; commandDescription: string }): Promise<void> {
        await this.commandRepository.updateCommand(command);
    }
    
}