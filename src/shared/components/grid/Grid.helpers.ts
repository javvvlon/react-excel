import { IGrid } from "./Grid.contracts"

export const parseFormula = (formula: string, grid: IGrid): string => {
    const cleanedFormula = formula.trim().substring(1)

    const regex = /([A-Z]+)(\d+)/g
    let result = cleanedFormula

    const matches = [...cleanedFormula.matchAll(regex)]
    matches.forEach((match) => {
        const col = match[1]
        const row = parseInt(match[2], 10) - 1
        const colIndex = col.charCodeAt(0) - 65

        const value = grid[row][colIndex]
        result = result.replace(match[0], value)
    })

    return result
}

export const evaluateFormula = (formula: string): string => {
    try {
        const result = eval(formula)
        return result.toString()
    } catch (e) {
        console.log(e);
        return '#ERROR';
    }
};
