import { TypologyModel } from './typology-model';

export interface Typology {
    id: number,
    name: string,
    glass: boolean,
    guide: boolean,
    tabakera: boolean,
    typologyModels?: TypologyModel[]
}
