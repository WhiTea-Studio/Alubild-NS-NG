import {Manufacturer} from "./manufacturer";

export interface Series{
    id: number,
    name: string,
    manufacturer?: Manufacturer
}