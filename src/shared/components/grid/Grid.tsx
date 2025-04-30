import React from 'react'

import { Row } from './partials/row'
import { Toolbar } from "./partials/toolbar"
import { Cell } from './partials/cell'

import { useGridLayout } from './Grid.hooks'
import './_grid.scss'

const Grid: React.FC = () => {
    const {
        cols,
        rows,
        cell,
        grid,
        config,
        setActiveCell,
        updateCell,
        retrieveCellConfig,
        setCellConfig,
        saveConfig
    } = useGridLayout()

    return (
        <div className="grid">
            <Toolbar
                cell={cell}
                config={retrieveCellConfig()}
                grid={grid}
                setCellConfig={setCellConfig}
                save={saveConfig}
            />

            <div>
                <table className="grid__table">
                    <thead>
                        <Row>
                            <th className="grid__table__header"></th>

                            { Array.from({ length: cols }).map((_, i) => (
                                <th key={`col-${i}`} className={`grid__table__header ${ i === cell[1] ? '--active' : ''}`}>
                                    { String.fromCharCode(65 + (i % 26)) }
                                </th>
                            ))}
                        </Row>
                    </thead>

                    <tbody>
                        { Array.from({ length: rows }).map((_, rowIndex) => (
                            <Row key={`row-${rowIndex}`}>
                                <td className="grid__table__row-index">
                                    {rowIndex + 1}
                                </td>

                                {Array.from({ length: cols }).map((_, colIndex) => (
                                    <Cell
                                        key={`cell-${rowIndex}-${colIndex}`}
                                        cell={cell}
                                        grid={grid}
                                        value={grid[rowIndex][colIndex]}
                                        config={config[`${rowIndex}${colIndex}`]}
                                        onfocus={() => setActiveCell(rowIndex, colIndex)}
                                        onchange={(val) => updateCell(rowIndex, colIndex, val)}
                                    />
                                ))}
                            </Row>
                        ))}
                    </tbody>
                </table>

                <div className="grid__minimap">
                    { cell.length ? `${cell[0] + 1 } ${ String.fromCharCode(65 + ((cell[1]) % 26))}` : '---' }
                </div>
            </div>
        </div>
    )
}

export default Grid
