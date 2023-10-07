export const convertDate = (date:Date) => {
    return date.toISOString().slice(0,10)
}