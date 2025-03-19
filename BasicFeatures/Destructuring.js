const product  = {
    id:'1',
    productName:'Mac',
    rating:10,
};

console.log(product);

const product2 = {id:'2', productName:'Windows',rating:10};
const {productName} = product2;
console.log(productName);

const array = [1,2];

const [arrayFirstElement,arraySecondElement,arrayThirdElement] = array;
console.log(arrayFirstElement);
console.log(arraySecondElement);
console.log(arrayThirdElement);