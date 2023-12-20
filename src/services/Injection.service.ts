import { Model, Document } from 'mongoose';

class InjectionService {
  private models: Map<string, Model<Document>> = new Map();
  private repositories: Map<string, any> = new Map();

  registerModel(name: string, model:any): void {
    this.models.set(name, model);
  }

  registerRepository(name: string, repository: any): void {
    this.repositories.set(name, repository);
  }

  getModel<T extends Document>(name: string): Model<T>  {
    const model = this.models.get(name) as Model<T> | undefined;
    if (!model) {
      throw new Error(`Model with name '${name}' not found in InjectionService.`);
    }
    return model;
  }

  getRepository<T>(name: string): T {
    const repository = ( this.repositories.get(name) as T ) || null;
    if (!repository) {
      throw new Error(`Repository with name '${name}' not found in InjectionService.`);
    }
    return repository;
  }
}

const injectionService = new InjectionService();

export default injectionService;