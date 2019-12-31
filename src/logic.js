//Função que cria o campo minado
const createBoard = (rows, columns)=>{

    return Array(rows).fill(0).map((_, row) => {

        return Array(columns).fill(0).map((_, column) => {

            return {
                row,
                column,
                opened: false,
                mined: false,
                flagged: false,
                exploded: false,
                nearMines: 0
            }
        })
    });
}
// função que espalha as minas no campo minado
const spreadMines = (board, minesAmount)=>{

    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while(minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parseInt(Math.random() * columns, 10);

        if(!board[rowSel][columnSel].mined){
            board[rowSel][columnSel].mined = true;
            minesPlanted++;
        }
    }
}

// funçao que irá criar o tabuleiro do jogo já com as minas já espalhadas pelo campo
const createMineBoard = (rows, columns, minesAmount) =>{

    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);

    return board;

}

//função responsavél por clonar um tabuleiro
const cloneBoard = board =>{
    return board.map(rows =>{

        return rows.map(field => {

            return { ...field}
        });
    });
}

//função responsavel por pegar os vizinhos do campo
const getNeighbors = (board, row, column) =>{
    const neighbors = [];
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];
    
    rows.forEach(r =>{
        columns.forEach(c => {
            const different = r !== row || c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board.length[0];

            if(different, validColumn, validRow){

                neighbors.push(board[r][c]);
            }

        });
    });

    return neighbors;
}

//Função para saber se a vizinhança é segura
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

//Função recursiva: Abre o campo e abre campos ao redor caso a vizinhança seja segura
const openField = (board, row, column) =>{

    const field = board[row][column];

    if(!field.opened){

        field.opened = true;
        
        if(field.mined){
            field.exploded = true
        }else if(safeNeighborhood(board, row, column)){
            getNeighbors(board, row, column).forEach(n=>{

                openField(board, n.row, n.column);
            });
        }else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n=> n.mined).length;
        }
    }
};

//Retorna todos os campos do tabuleiro
const fields = board => [].concat( ...board );

//Saber se tem um campo explodido
const hadExplosion = board => fields(board).filter(field=> field.exploded).length > 0

//Para saber se tem algum campo pendente para poder declara vitória ou não
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

//Função para percorrer todos os campos e então declarar vitória
const wonGame = board => fields(board).filter(pendding).length === 0;

//Função para exibir onde estava toda as minas do jogo(para quando perder)
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true);

export { 
    createMineBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines
};