'use strict'

class GetSetData {
    constructor() {
        this.p1NameGet = document.getElementById("p1NameInput");
        this.p2NameGet = document.getElementById("p2NameInput");
        this.p1NameSet = document.getElementById("p1NameDisplay");
        this.p2NameSet = document.getElementById("p2NameDisplay");
        this.turnIndicator = document.getElementById("turnIndicator");
        this.player1 = { name: '', sign: 'X' };
        this.player2 = { name: '', sign: 'O' };
        this.turn = "p1";
    }

    setNames = () => {
        this.player1.name = this.p1NameGet.value;
        this.player2.name = this.p2NameGet.value;
        this.p1NameSet.textContent = "P1: " + this.player1.name;
        this.p2NameSet.textContent = "P2: " + this.player2.name;
    }

    setTurn = () => {
        if (this.turn == "p1") {
            this.turnIndicator.textContent = "Turn: " + this.player1.name;
        }
        else if (this.turn == "p2") {
            this.turnIndicator.textContent = "Turn: " + this.player2.name;
        }
    }

    loadBar = () => {
        let elem = document.getElementById("myBar");
        let loading = document.getElementById("loading");
        let blend = document.getElementById("beforeStart");
        let start = document.getElementById("afterStart");
        let width = 0;
        let id = setInterval(frame, 12);

        blend.style.opacity = 0;
        blend.style.zIndex = 1;
        elem.style.opacity = 1;
        loading.style.opacity = 1;

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                elem.style.opacity = 0;
                loading.style.opacity = 0;
                loading.style.zIndex = 2;
                start.style.opacity = 1;
                start.style.zIndex = 10;
            }
            else {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = width * 1 + '%';
            }
        }
    }

    setGameBoard = () => {
        const gameBoard = document.getElementById("gameBoard");
        const resetBtn = document.getElementById("resetBtn");
        for (let element of gameBoard.children) {
            element.addEventListener("click", this.setGridItem);
        }
        resetBtn.addEventListener("click", this.resetGame)
    }

    setGridItem = (event) => {
        const item = event.target;
        const winnerDisplay = document.getElementById("winnerDisplay");
        const blend = document.getElementById("beforeStart");
        const start = document.getElementById("afterStart");
        let activeField = [];
        const checkWinner = () => {
            const gameBoard = document.getElementById("gameBoard");

            const A123x = activeField[0] + activeField[1] + activeField[2] == "XXX" ? "p1Won" : false;
            const A123o = activeField[0] + activeField[1] + activeField[2] == "OOO" ? "p2Won" : false;
            const A1B1C1x = activeField[0] + activeField[3] + activeField[6] == "XXX" ? "p1Won" : false;
            const A1B1C1o = activeField[0] + activeField[3] + activeField[6] == "OOO" ? "p2Won" : false;
            const A1B2C3x = activeField[0] + activeField[4] + activeField[8] == "XXX" ? "p1Won" : false;
            const A1B2C3o = activeField[0] + activeField[4] + activeField[8] == "OOO" ? "p2Won" : false;
            const A2B2C2x = activeField[1] + activeField[4] + activeField[7] == "XXX" ? "p1Won" : false;
            const A2B2C2o = activeField[1] + activeField[4] + activeField[7] == "OOO" ? "p2Won" : false;
            const A3B3C3x = activeField[2] + activeField[5] + activeField[8] == "XXX" ? "p1Won" : false;
            const A3B3C3o = activeField[2] + activeField[5] + activeField[8] == "OOO" ? "p2Won" : false;
            const B123x = activeField[3] + activeField[4] + activeField[5] == "XXX" ? "p1Won" : false;
            const B123o = activeField[3] + activeField[4] + activeField[5] == "OOO" ? "p2Won" : false;
            const C123x = activeField[6] + activeField[7] + activeField[8] == "XXX" ? "p1Won" : false;
            const C123o = activeField[6] + activeField[7] + activeField[8] == "OOO" ? "p2Won" : false;
            const C1B2A3x = activeField[6] + activeField[4] + activeField[2] == "XXX" ? "p1Won" : false;
            const C1B2A3o = activeField[6] + activeField[4] + activeField[2] == "OOO" ? "p2Won" : false;

            let winningNumbers = [A123x, A1B1C1x, A1B2C3x, A2B2C2x, A3B3C3x, B123x, C123x, C1B2A3x, A123o, A1B1C1o, A1B2C3o, A2B2C2o, A3B3C3o, B123o, C123o, C1B2A3o];
            for (let element of winningNumbers) {
                if (element !== false) {
                    setTimeout(() => {
                        if (element == "p1Won") {

                            winnerDisplay.textContent = this.player1.name + " wins the game!"
                            winnerDisplay.style.opacity = 1;
                            winnerDisplay.style.zIndex = 20;
                            start.style.opacity = 0;
                            start.style.zIndex = 1;
                            for (let element of gameBoard.children) {
                                element.textContent = "";
                            }

                            setTimeout(() => {
                                winnerDisplay.style.opacity = 0;
                                winnerDisplay.style.zIndex = 1;
                                blend.style.opacity = 1;
                                blend.style.zIndex = 30;
                            }, 2500)
                        }

                        else if (element == "p2Won")
                            winnerDisplay.textContent = this.player2.name + " wins the game!"
                        winnerDisplay.style.opacity = 1;
                        winnerDisplay.style.zIndex = 20;
                        start.style.opacity = 0;
                        start.style.zIndex = 1;
                        for (let element of gameBoard.children) {
                            element.textContent = "";
                        }
                        setTimeout(() => {
                            winnerDisplay.style.opacity = 0;
                            winnerDisplay.style.zIndex = 1;
                            blend.style.opacity = 1;
                            blend.style.zIndex = 30;
                        }, 2500)
                    }, 1000)
                }
            }
        }

        const reflectBoard = () => {
            const gameBoard = document.getElementById("gameBoard");

            for (let element of gameBoard.children) {
                activeField.push(element.textContent);
            }
            checkWinner()
        }

        if (this.turn == "p1") {
            item.textContent = this.player1.sign;
            this.turnIndicator.textContent = "Turn: " + this.player2.name;
            this.turn = "p2";
            reflectBoard();
        }
        else if (this.turn == "p2") {
            item.textContent = this.player2.sign;
            this.turnIndicator.textContent = "Turn: " + this.player1.name;
            this.turn = "p1";
            reflectBoard();
        }
    }

    resetGame = () => {
        const gameBoard = document.getElementById("gameBoard");
        for (let element of gameBoard.children) {
            element.textContent = "";
        }
    }

    init = () => {
        this.setNames();
        this.setTurn();
        this.loadBar();
        this.setGameBoard();
    }
}


let game = new GetSetData();
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", game.init);




