export const formatPrice = (price) => {
    const formatedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price / 100);
    return formatedPrice
}

export const getUniqueValues = (data, type) => {
    
    let unique = data.map(it=>it[type]);
    
    // if data[i][type] is array - flatten the array
    if (Array.isArray(unique[0])) {
        
        unique = unique.flat();

    }

    return ['all', ...new Set(unique)]
}
