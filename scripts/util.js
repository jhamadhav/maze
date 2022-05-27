const rand = (min = 0, max = 1) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}