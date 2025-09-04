export function parsePrice(price) {
    return parseFloat(price.replace('$' , '').trim())
}