import React from 'react'
import { useCell } from "./Cell.hooks"
import { CellProps } from "./Cell.contracts"
import './_cell.scss'

/**
 * @author Javlon Khalimjonov
 */
const Cell: React.FC<CellProps> = (props) => {
    const { elRef, handleInput, handleBlur} = useCell(props)

    return (
        <td className="cell">
            <div
                ref={elRef}
                contentEditable
                suppressContentEditableWarning
                onFocus={props.onfocus}
                onInput={handleInput}
                onBlur={handleBlur}
                className={'cell__field'}
            />
        </td>
    )
}


export default React.memo(Cell)
