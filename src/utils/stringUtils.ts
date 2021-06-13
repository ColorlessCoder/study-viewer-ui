export const generateFullName = (firstName: string|undefined, lastName: string|undefined) => {
    const concatWithSpace = (result: string, current: string|undefined) => result + " " + (current ? current: "")
    return [firstName, lastName].reduce(concatWithSpace, "").trim()
}

export const deNullString = (str: string|null|undefined) => (str ? str: "")