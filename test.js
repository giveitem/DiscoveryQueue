let x = 5;
y = 5;
function f(x, y) {
    if (y) {
        return x + y;
    } else {
        return x * x;
    }
}
console.log(f(x));