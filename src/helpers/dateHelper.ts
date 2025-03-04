

export const getDateSrt = (date: Date|undefined): string => {
    var dateStr = '';
    if (date) {
      dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return dateStr;
}