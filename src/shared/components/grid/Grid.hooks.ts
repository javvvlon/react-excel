import { useCallback, useEffect, useState } from "react"
import { GRID_DEFAULT_TEMPLATE } from "./Grid.config"
import { ICell, IGrid } from "./Grid.contracts"
import { CellConfig, CellsConfig } from "./partials/cell"
import { initialCellConfig } from "./partials/cell/Cell.config"

export interface UseGridLayoutProvides {
    cols: number
    rows: number
    cell: ICell
    grid: IGrid
    config: CellsConfig
    setActiveCell: (rowIndex: number, colIndex: number) => void
    setCellConfig: (config: CellConfig) => void
    retrieveCellConfig: () => CellConfig
    updateCell: (row: number, col: number, value: string) => void
    saveConfig: () => void
}

export const useGridLayout = (): UseGridLayoutProvides => {
    const [cols] = useState<number>(GRID_DEFAULT_TEMPLATE[0])
    const [rows] = useState<number>(GRID_DEFAULT_TEMPLATE[1])

    const [grid, setGrid] = useState<IGrid>(Array.from({ length: rows }, () => Array(cols).fill('')))
    const [cell, setCell] = useState<ICell>([])
    const [config, setConfig] = useState<CellsConfig>({})

    useEffect(() => {
        const configRaw = localStorage.getItem("cell_config")
        if (configRaw) {
            setConfig(JSON.parse(configRaw) as CellsConfig)
        }
    }, [])

    const setActiveCell = (rowIndex: number, colIndex: number): void => {
        setCell([rowIndex, colIndex])
    }

    const updateCell = (row: number, col: number, value: string) => {
        setGrid(prev =>
            prev.map((r, ri) =>
                ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
            )
        )
    }

    const retrieveCellConfig = useCallback(() => {
        const currentCell = cell.join("")
        return config[currentCell] || initialCellConfig
    }, [cell, config])

    const setCellConfig = useCallback((newConfig: CellConfig): void => {
        const currentCellKey = cell.join('')
        const updatedConfig = {
            ...config,
            [currentCellKey]: newConfig
        }

        setConfig(updatedConfig)
    }, [cell, config])

    const saveConfig = (): void => {
        const updatedConfig: CellsConfig = {}

        grid.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                const currentCellKey = `${rowIndex}${colIndex}`

                updatedConfig[currentCellKey] = {
                    ...config[currentCellKey],
                    content: cellValue,
                }
            })
        })

        setConfig(updatedConfig)
        localStorage.setItem('cell_config', JSON.stringify(updatedConfig))
    }


    return {
        cols,
        rows,
        cell,
        grid,
        config,
        setActiveCell,
        updateCell,
        saveConfig,
        retrieveCellConfig,
        setCellConfig
    }
}
