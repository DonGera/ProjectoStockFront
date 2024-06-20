export const capitalizeFirstLetter = (word) => {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}


const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    
    return date.toLocaleDateString('es-AR', dateOptions);
}