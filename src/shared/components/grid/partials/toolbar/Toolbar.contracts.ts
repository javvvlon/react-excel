import { ICell, IGrid } from "../../Grid.contracts";
import { CellConfig } from "../cell";

export interface ToolbarProps {
    cell: ICell,
    config: CellConfig,
    grid: IGrid,
    save: () => void
    setCellConfig: (config: CellConfig) => void
}