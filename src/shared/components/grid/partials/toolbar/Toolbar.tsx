import React from 'react';
import { ToolbarProps } from "./Toolbar.contracts";
import './_toolbar.scss'

const Toolbar: React.FC<ToolbarProps> = ({ cell, setCellConfig, config, save }) => {
    const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCellConfig({
            fontSize: Number(event.target.value)
        })
    };

    return (
        <div className={'toolbar'}>
            <span className={'toolbar__cell'}>
                { cell.length ? `${cell[0] + 1}${String.fromCharCode(65 + ((cell[1]) % 26))}` : '---'}
            </span>

            <div>
                <select
                    name="font-size"
                    id="font-size"
                    onChange={handleFontSizeChange}
                    value={config?.fontSize ?? 11}
                >
                    { Array.from({ length: 34 }).map((_, i) => {
                        return <option key={i} value={String(i)}>{i}</option>
                    }) }
                </select>
            </div>

            <div className={'toolbar__save'}>
                <button onClick={save}>Save</button>
            </div>
        </div>
    );
};

export default Toolbar;
