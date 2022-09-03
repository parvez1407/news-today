const points = [40, 100, 2, 5, 26, 10];
points.sort(function (a, b) {
    return b - a;
});
console.log(points);