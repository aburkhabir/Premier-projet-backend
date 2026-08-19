import pool from '../configuration/database';
import { command, createCommand, updateCommand } from '../models/Command';

export class CommandRepository {
    async createCommand(command: createCommand): Promise<void> {
        const { commandName, commandDescription } = command;
        await pool.query(
            'INSERT INTO commands (command_name, command_description) VALUES ($1, $2)',
            [commandName, commandDescription]
        );
    }

    async getAllCommands(): Promise<command[]> {
        const result = await pool.query('SELECT * FROM commands');
        return result.rows;
    }

    async getCommandById(id: number): Promise<command | null> {
        const result = await pool.query('SELECT * FROM commands WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
    async updateCommand(command: updateCommand): Promise<void> {
        const { id, commandName, commandDescription } = command;
        await pool.query(
            'UPDATE commands SET command_name = $1, command_description = $2 WHERE id = $3',
            [commandName, commandDescription, id]
        );
    }
    async deleteCommand(id: number): Promise<void> {
        await pool.query('DELETE FROM commands WHERE id = $1', [id]);
    }
}