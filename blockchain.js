const sha256 = require('js-sha256');

class BlockChain {
    constructor() {
        this.dificulty = 2;
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block('', 'genesis block', new Date(), this.dificulty);
    }

    addNewBlock(transactions) {
        const newBlock = new Block(this.chain[this.chain.length - 1].hash, transactions, new Date(), this.dificulty);
        this.chain.push(newBlock); 
    }

    validateBlock(block) {
        const hash = sha256(`${block.nonce}${block.previousBlock}${block.transactions}`);
        if(block.hash === hash) {
            console.log('valid block');
        } else {
            console.log('TEMPERED BLOCK');
        }
    }
};

class Block {
    constructor(previousBlock, transactions, timeStamp, dificulty) {
        this.dificulty = dificulty;
        this.hash = '';
        this.timeStamp = timeStamp;
        this.previousBlock = previousBlock;
        this.transactions = transactions;
        this.nonce = this.createNonce();
    }

    createNonce() {
        let nonce = 0;
        const targetZeros = ('0').repeat(this.dificulty);
        while(true) {
            const hash = sha256(`${nonce}${this.previousBlock}${this.transactions}`);
            if(hash.startsWith(targetZeros)) {
                this.hash = hash;
                break;
            }
            nonce++;
        }
        return nonce;
    }
};
