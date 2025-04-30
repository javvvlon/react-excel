/**
 * @author Javlon Khalimjonov
 */

export enum GridLayout {
    Cols = "cols",
    Rows = "rows",
}

export enum GridCellFormat {
    Bold = 'bold',
    Italic = 'italic',
    Underline = 'underline',
}

export interface GridProps {
    payload?: Record<string, string>
}

export type IGrid = string[][]
export type ICell = number[]
