(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("start").addEventListener('click', start);
    }

    let colors = ["rgb(19, 42, 19)", "rgb(49, 87, 44)", "rgb(79, 119, 45)", "rgb(144, 169, 85)", "rgb(236, 243, 158)", "rgb(3, 4, 94)", "rgb(0, 119, 182)", "rgb(0, 180, 216)", "rgb(144, 224, 239)", "rgb(202, 240, 248)", "rgb(157, 2, 8)", "rgb(220, 47, 2)", "rgb(232, 93, 4)", "rgb(250, 163, 7)", "rgb(255, 206, 8)", "rgb(128, 15, 47)", "rgb(201, 24, 74)", "rgb(255, 77, 109)", "rgb(255, 117, 143)", "rgb(255, 179, 193)"];

    function start(){
        sessionStorage.setItem(12,1);
        let balls = (document.querySelectorAll(".ball"));
        sortByDegree(balls).forEach(ball => {
            let isOccupied = new Array(20).fill(false);
            getNeighbours(ball[0]).forEach(b => {
                let cur_color = window.getComputedStyle(b).getPropertyValue('background-color');
                if(colors.includes(cur_color)) isOccupied[colors.indexOf(cur_color)] = true;
            });
            
            let color = 0;
            while(color < 20){
                if(isOccupied[color] == false){
                    balls[ball[0]-1].style.backgroundColor = colors[color];
                    return;
                }
                color++;
            }

        });
    }

    function sortByDegree(balls){
        let sorted_balls = []
        balls.forEach(ball => {
            sorted_balls.push([ball.innerText, getDegree(ball.innerText)]);
        });
        sorted_balls = sorted_balls.sort((ball1, ball2) => ball1[1] < ball2[1] ? 1 : -1);
        return sorted_balls;
    }

    function getDegree(ball){
        let n = 0;
        Array.from(document.getElementById("table").rows[ball].cells).forEach(cell => {
            if(cell.innerText == "1") n++;
        });
        return n;
    }

    function getNeighbours(ball){
        let neighbours = [];
        let table = document.getElementById("table"); 
        let balls = document.querySelectorAll('.ball');
        for(let i = 1; i<table.rows.length; i++){
            if(table.rows[ball].cells[i].innerText == "1") neighbours.push(balls[i-1]);
        }
        return neighbours;
    }


})();
