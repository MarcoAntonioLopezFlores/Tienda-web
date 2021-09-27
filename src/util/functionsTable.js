export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const addComa =(precio)=>{
    
    const positionDot = precio.indexOf(".");
    const positionComa = precio.length-(positionDot<0?3:6)
    const precioFinal = positionComa>0?precio.slice(0,positionComa)+","+precio.slice(positionComa):precio
    return positionDot<0?precioFinal+".00":precioFinal
}

export const dateFormat = (dateFull) => {
    const newDate = new Date(dateFull).toLocaleString();
    return newDate.substring(0,newDate.length-3)
}