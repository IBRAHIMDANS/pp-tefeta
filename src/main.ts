#!/usr/bin/env ts-node

import { readFileSync } from 'fs';

function main(file: string = process.argv[2]) {
    if (!file) {
        throw new Error('please give file');
    }
    const maps = readFileSync(file, 'utf8').split('\n');
    const length = maps.length;
    const path = [];
    let open = [];
    let close = [];
    let lignes = 0;

    (String.prototype as any).replaceAt = function (
        index: any,
        replacement: string | any[],
    ) {
        return (
            this.substr(0, index) +
            replacement +
            this.substr(index + replacement.length)
        );
    };
    for (const line of maps) {
        if (lignes != 0) {
            const maps2 = maps.map((item, key) => {
                const maps2 = [];
                if (maps[key].match(/\*.+/gi) !== null) {
                    maps2.push(maps[key]);
                }
                return maps2;
            });
            let emptyColumn;
            if (line.indexOf('1') != -1) open.push(line.indexOf('1'));
            if (line.indexOf('2') != -1) close.push(line.indexOf('2'));

            if (line.indexOf(' ') > 1 && line.indexOf('1') == -1) {
                if (line.substring(open[0], open[0] + 1) == ' ') {
                    console.log(open);
                    emptyColumn = (line as any).replaceAt(open[0], '-');
                    path.push(emptyColumn);
                } else {
                    emptyColumn = (line as any).replaceAt(/\s/g, '-');
                    path.push(emptyColumn);
                }
            } else {
                path.push(line);
            }
        }
        lignes++;
    }
    console.log(path);
}

main();
