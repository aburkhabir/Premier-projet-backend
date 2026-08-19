import{ Express, Request, Response } from "express";
import { CommandService } from "../service/CommandService";

export class CommandController {
    private commandService: CommandService;
    constructor(app: Express) {
        this.commandService = new CommandService();
        this.setupRoutes(app);
    }


  private setupRoutes(app: Express): void {
    app.get('/api/commands', (req, res) => this.getAll(req, res));
    app.get('/api/commands/:id', (req, res) => this.getById(req, res));
    app.post('/api/commands', (req, res) => this.create(req, res));
    app.put('/api/commands/:id', (req, res) => this.update(req, res));
    app.patch('/api/commands/:id', (req, res) => this.patch(req, res));
    app.delete('/api/commands/:id', (req, res) => this.delete(req, res));
  }
  
  private async getAll(req: Request, res: Response): Promise<void> {
    try {
      const commands = await this.commandService.getAllCommands();
      res.json(commands);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve commands' });
    }
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const command = await this.commandService.getCommandById(id);
      if (command) {
        res.json(command);
      } else {
        res.status(404).json({ error: 'Command not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve command' });
    }
  }

  private async create(req: Request, res: Response): Promise<void> {
    const { commandName, commandDescription } = req.body;
    try {
      await this.commandService.createCommand({ commandName, commandDescription });
      res.status(201).json({ message: 'Command created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create command' });
    }
  }
  
  private async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const { commandName, commandDescription } = req.body;
    try {
      await this.commandService.updateCommand({ id, commandName, commandDescription });
      res.json({ message: 'Command updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update command' });
    }
  }

  private async patch(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const { commandName, commandDescription } = req.body;
    try {
      await this.commandService.patchCommand(id, { commandName, commandDescription });
      res.json({ message: 'Command patched successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to patch command' });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      await this.commandService.deleteCommand(id);
      res.json({ message: 'Command deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete command' });
    }
  }
}
