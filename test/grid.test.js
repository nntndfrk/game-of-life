const { createGrid, computeGrid, renderGrid, createCell, countNeighbors } = require('../game/grid');

describe('createCell', () => {
    test('createCell(row, col, alive) - возращает объект клетки, со свойствами row, col и alive', () => {
        let cell = createCell(3, 3, true);

        expect(cell).toMatchObject({ row: 3, col: 3, alive: true });
    });

    test('createCell(row, col) - использует значение alive по умолчанию', () => {
        let cell = createCell(3, 3);

        expect(cell).toMatchObject({ row: 3, col: 3, alive: false });
    });
});

describe('countNeighbors', () => {
    test('countNeighbors(grid, cell) - возращает возвращает количетсво соседей клетки', () => {
        let grid = [
            [
                { row: 0, col: 0, alive: false },
                { row: 0, col: 1, alive: true },
                { row: 0, col: 2, alive: true },
            ],
            [
                { row: 1, col: 0, alive: true },
                { row: 1, col: 1, alive: true },
                { row: 1, col: 2, alive: false },
            ],
            [

                { row: 2, col: 0, alive: true },
                { row: 2, col: 1, alive: false },
                { row: 2, col: 2, alive: true },
            ]
        ];
        let cell = { row: 1, col: 1, alive: true };
        let neighbors = countNeighbors(grid, cell);

        expect(neighbors).toBe(5);
    });
});

describe('createGrid', () => {
    test('createGrid(size) - возращает сетку указанного размера', () => {
        let grid = createGrid(16);

        expect(grid).toBeInstanceOf(Array);
        expect(grid).toHaveLength(16);
        expect(grid[0]).toHaveLength(16);
    });
});

describe('computeGrid', () => {
    test('computeGrid(grid) - возращает сетку с клетками следующего поколения', () => {
        let grid = [
            [{ row: 0, col: 0, alive: true },
            { row: 0, col: 1, alive: true },
            { row: 0, col: 2, alive: false }],
            [{ row: 1, col: 0, alive: true },
            { row: 1, col: 1, alive: true },
            { row: 1, col: 2, alive: false }],
            [{ row: 2, col: 0, alive: false },
            { row: 2, col: 1, alive: true },
            { row: 2, col: 2, alive: false }]
        ];
        let expectedGrid = [
            [{ row: 0, col: 0, alive: true },
            { row: 0, col: 1, alive: true },
            { row: 0, col: 2, alive: false }],
            [{ row: 1, col: 0, alive: false },
            { row: 1, col: 1, alive: false },
            { row: 1, col: 2, alive: true }],
            [{ row: 2, col: 0, alive: true },
            { row: 2, col: 1, alive: true },
            { row: 2, col: 2, alive: false }]
        ];
        let nextGrid = computeGrid(grid);

        expect(nextGrid).toEqual(expectedGrid);
    });
});

describe('renderGrid', () => {
    test('renderGrid(grid) - возращает текстовое представление сетки', () => {
        let grid = [
            [{ row: 0, col: 0, alive: true },
            { row: 0, col: 1, alive: true },
            { row: 0, col: 2, alive: false }],
            [{ row: 1, col: 0, alive: true },
            { row: 1, col: 1, alive: true },
            { row: 1, col: 2, alive: false }],
            [{ row: 2, col: 0, alive: false },
            { row: 2, col: 1, alive: true },
            { row: 2, col: 2, alive: false }]
        ];
        let expectedOutput = '* *   \r\n* *   \r\n  *   \r\n';
        let actualOutput = renderGrid(grid);

        expect(actualOutput).toBe(expectedOutput);
    });
});