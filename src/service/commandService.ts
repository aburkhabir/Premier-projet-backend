import {CommandRepository} from '../repository/CommandRepository';
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
        if (id <= 0) {
            throw new Error('Invalid command ID');
        }
        return await this.commandRepository.getCommandById(id);
    }

    async updateCommand(command: { id: number; commandName: string; commandDescription: string }): Promise<void> {
        if (command.id <= 0) {
            throw new Error('Invalid command ID');
        }
        await this.commandRepository.updateCommandById(command.id, command);
    }

    async deleteCommandById(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('Invalid command ID');
        }
        await this.commandRepository.deleteCommandById(id);
    }

    async patchCommand(id: number, command: { commandName?: string; commandDescription?: string }): Promise<void> {
        if (id <= 0) {
            throw new Error('Invalid command ID');
        }
        const existingCommand = await this.commandRepository.getCommandById(id);
        if (!existingCommand) {
            throw new Error('Command not found');
        }
        const updatedCommand = {
            id,
            commandName: command.commandName ?? existingCommand.commandName,
            commandDescription: command.commandDescription ?? existingCommand.commandDescription,
        };
        await this.commandRepository.updateCommandById(id, updatedCommand);
    }



}