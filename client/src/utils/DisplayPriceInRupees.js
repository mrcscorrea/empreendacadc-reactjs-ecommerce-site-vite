export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('pt-BR',{
        style : 'currency',
        currency : 'BRL'
    }).format(price)
}