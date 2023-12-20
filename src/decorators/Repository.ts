import injectionService from "../services/Injection.service";

export function Repository(name: string) {
  return function (target: any) {
    injectionService.registerRepository(name,target)
  }
}