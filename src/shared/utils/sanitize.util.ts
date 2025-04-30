/**
 * @author Javlon Khalimjonov
 */

export interface UseSanitizeProvides {
    sanitize: (value: string, allowedTags?: string[]) => string
}

export const useSanitize = (): UseSanitizeProvides => {
    /**
     * @param value - value to be tested
     * @param allowedTags - set of allowed tags that can exist within document
     */
    const sanitize = (value: string, allowedTags: string[] = ['I', 'B', 'STRONG']): string => {
        const document = new DOMParser().parseFromString(value, 'text/html')
        const elements = document.body.querySelectorAll('*')

        elements.forEach(element => {
            if (![...allowedTags.map(aT => aT.toLowerCase())].includes(element.nodeName)) {
                element.replaceWith(...element.childNodes)
            }
        })

        return document.body.innerHTML
    }

    return {
        sanitize,
    }
}
