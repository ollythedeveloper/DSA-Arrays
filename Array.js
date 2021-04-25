const MEMORY = require('./memory');
let Memory = new MEMORY();

class Array {
    constructor() {
        this.length = 0;
        this.ptr = Memory.allocate(this.length);
    }

    push(val) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        Memory.set(this.ptr + this.length, val);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return Memory.get(this.ptr + index);
    }

    pop() {
        if (this.length === 0) {
            throw new Error('Index error');
        }
        const value = Memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        Memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        Memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

}

function main() {

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);

    console.log(arr);

    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    console.log(arr);

    //remove items from end of array
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr);

    //print first item in array
    // console.log(arr.get(1));

    //NOT WORKING ARR.GET

    //empty the array and add 1 item
    arr.pop();
    arr.pop();
    arr.pop();
    arr.push('tauhida');
    console.log(arr);
}
main();

const URLify = (str) => {
    return str.trim().replace(/\s/g, "%20");
};
//O(n) time depends on length of string

console.log(URLify('olly is a mom'));

console.log(URLify('www.yesIam.com /js is my friend'));

const filterArray = (arr) => {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        const item = arr.shift();
        if (item >= 5) arr.push(item);
    }
    return arr;
};

console.log(filterArray([1, 2, 7, 5, 3, 9]));