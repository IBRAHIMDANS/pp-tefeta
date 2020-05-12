#!/usr/bin/env ts-node

import { readFileSync } from 'fs';

const oval1 = readFileSync('data/maps/oval.01.map', 'utf8');
oval1.split('').map(i => console.log(i));
