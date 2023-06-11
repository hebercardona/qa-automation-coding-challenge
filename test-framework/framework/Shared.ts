export class Shared {

    static getAnyFromArray<T>(array: T[]): T {
        const item = array[Math.floor(Math.random()*array.length)];
        return item;
    }
}