import React, { RefObject, useEffect, useRef } from "react"
import { useSanitize } from "../../../../utils"
import { CellConfig, CellProps } from "./Cell.contracts"
import { evaluateFormula, parseFormula } from "../../Grid.helpers";

/**
 * @author Javlon Khalimjonov
 */
export interface UseCellProvides {
    value: string
    config: CellConfig
    elRef: RefObject<HTMLDivElement | null>
    handleInput: (e: React.FormEvent<HTMLDivElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

/**
 * @author Javlon Khalimjonov
 */
export const useCell = ({ value, onchange, config, grid }: CellProps) => {
    const elRef = useRef<HTMLDivElement>(null)
    const { sanitize } = useSanitize()

    useEffect(() => {
        if (elRef.current && config?.content !== undefined) {
            elRef.current.textContent = config.content || ''
        }
        if (elRef.current && config?.fontSize) {
            elRef.current.style.fontSize = `${config.fontSize}px`
        }
    }, [config, elRef])

    const handleInput = () => {
        const text = elRef.current?.textContent || '';

        // if (text.startsWith('=')) {
        //     const formulaResult = evaluateFormula(parseFormula(text, grid))
        //     onchange(formulaResult);
        // } else {
        //     onchange(text);
        // }
        onchange(text)
    };


    const handleBlur = () => {
        const sanitized = sanitize(elRef.current?.textContent || '')
        if (sanitized !== value) {
            onchange(sanitized)
        }
    }

    return {
        value,
        config,
        elRef,
        handleInput,
        handleBlur,
    }
}


