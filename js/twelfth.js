(function () {
    window.addEventListener('load', init);

    function init() {
        if (!sessionStorage.getItem(12)) document.getElementById("notif").showModal();
        document.getElementById("start").addEventListener('click', start);
    }

    let colors = ["rgb(244, 163, 0)", "rgb(192, 228, 200)", "rgb(255, 182, 193)", "rgb(185, 217, 217)", "rgb(217, 228, 255)", "rgb(246, 225, 179)", "rgb(214, 181, 17)", "rgb(247, 139, 158)", "rgb(156, 219, 146)", "rgb(191, 162, 112)", "rgb(242, 177, 163)", "rgb(217, 196, 163)", "rgb(232, 168, 215)", "rgb(154, 227, 212)", "rgb(239, 153, 219)", "rgb(247, 229, 211)", "rgb(248, 211, 161)", "rgb(193, 216, 179)", "rgb(225, 255, 179)", "rgb(135, 148, 217)"];

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
