import { toTechnologyDto, type TechnologyDto } from './dto'
import type { TechnologyRepository } from './repository'

export async function listTechnologies(repository: TechnologyRepository): Promise<TechnologyDto[]> {
  const technologies = await repository.listOrdered()
  return technologies.map(toTechnologyDto)
}
