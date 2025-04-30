/**
 * @author Javlon Khalimjonov
 */

import React from 'react';
import { RowProps } from "./Row.contracts";

const Row: React.FC<RowProps> = ({ children }) => {
    return (
        <tr>
            { children }
        </tr>
    );
};

export default Row;