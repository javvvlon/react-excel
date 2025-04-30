/**
 * @author Javlon Khalimjonov
 */
import { ICell, IGrid } from "../../Grid.contracts";

export interface CellProps {
    value: string
    config: CellConfig
    cell: ICell
    grid: IGrid
    colspan?: number
    onfocus: () => void
    onchange: (val: string) => void
}

export interface CellConfig {
    fontSize?: number
    content?: string
}

export type CellsConfig = {
    [key: string]: CellConfig
}