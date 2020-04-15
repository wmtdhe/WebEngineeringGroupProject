function mess(arr){
    let len = arr.length
    let indexSet = new Set()

    while(indexSet.size < len){
        indexSet.add(parseInt(Math.random()*len))
    }
    return [...indexSet.values()].map(v=>arr[v])
}

console.log(mess([1,3,2,6,9,5]))

