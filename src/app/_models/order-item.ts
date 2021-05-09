import { TypologyModel } from './typology-model';
import { Color } from './color';
import { Quality } from './quality';
import { Guide } from './guide';
import { Tabakera } from './tabakera';
import { GlassQuality } from './glass-quality';
import { GlassPackage } from './glass-package';
import { Series } from './series';

export interface OrderItem {
    id?:number,
    width: number,
    height: number,
    quantity: number,
    note?: string, 
    category: string,
    typologyModel: TypologyModel,
    color?: Color,
    colorString?: string,
    sideChecker: string,
    quality: Quality,
    guide?: Guide
    tabakera?: Tabakera,
    glassQuality?: GlassQuality,
    glassPackage?: GlassPackage,
    series: Series,
    insert?: boolean,
    update?: boolean,
    delete?: boolean
}
