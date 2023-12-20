"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectionService {
    constructor() {
        this.models = new Map();
        this.repositories = new Map();
    }
    registerModel(name, model) {
        this.models.set(name, model);
    }
    registerRepository(name, repository) {
        this.repositories.set(name, repository);
    }
    getModel(name) {
        const model = this.models.get(name);
        if (!model) {
            throw new Error(`Model with name '${name}' not found in InjectionService.`);
        }
        return model;
    }
    getRepository(name) {
        const repository = this.repositories.get(name) || null;
        if (!repository) {
            throw new Error(`Repository with name '${name}' not found in InjectionService.`);
        }
        return repository;
    }
}
const injectionService = new InjectionService();
exports.default = injectionService;
//# sourceMappingURL=Injection.service.js.map