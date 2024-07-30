import fs from "fs";

function setItem(name: string, value: object) {
    fs.writeFileSync('./' + name + '.json', JSON.stringify(value), { encoding: 'utf-8' });
}

function getItem<T>(name: string): T | null {
    if (fs.existsSync('./' + name + '.json')) {
        const contents = fs.readFileSync('./token.json', 'utf-8');
        return JSON.parse(contents);
    }
    return null;
}

export const tempStorage = {
    setItem: setItem,
    getItem: getItem
}