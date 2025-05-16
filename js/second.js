(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("start").addEventListener('click', start);
        document.getElementById("retry").addEventListener('click', retry);
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById('repeat').addEventListener('click', generateTable);
    }

    function retry(){
        Array.from(document.getElementsByClassName('ball')).forEach((ball) => ball.className = "ball");
        checked_nodes = [];
        document.getElementById("nodes").innerText = checked_nodes;
    }

    var checked_nodes = []
    var nodes = []

    function message(mes){
        var msg = "";
        switch(mes){
            case 0:
                msg = "Неверно! Попробуйте еще раз.";
                break;
            case 1: 
                msg = "Верно!";
                break;
        }
        document.getElementById("message").innerText = msg;
        window.res.showModal();
    }

    
    function start()
    {
        sessionStorage.setItem(1,1);
        const table = document.getElementById("table");
        const n = document.getElementById('in').value;
        // const begin = Number(document.getElementsByClassName("checked")[0].innerText);
        
    }

    function generateTable(){
        retry();
        let n = document.getElementById('in').value;
        if (n === '') return;
        const container = document.getElementById('input');
        container.innerHTML='';
        const table = document.createElement('table');
        table.id='table';
        if (n > 15){
            table.style.fontSize="17px";
        }

        const matrix = Array.from({ length: n + 1}, () => Array(n).fill(0));
        for (let i = 1; i < n+1; i++) {
            for (let j = i; j < n+1; j++) {
                const randomValue = Math.round(Math.random());
                matrix[i][j] = randomValue;
                matrix[j][i] = randomValue;
            }
        }

        let row =document.createElement('tr');
        for (let j = 0; j <= n; j++) {
            const cell = document.createElement('th');
            cell.textContent =  j === 0 ? '' : 'v'+j; 
            row.appendChild(cell);
        }
        table.appendChild(row);
        for (let i = 1; i <= n; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j <= n; j++) {
                const cell = document.createElement(j === 0 ? 'th' : 'td');
                cell.textContent = j === 0 ? 'v'+i : j == i ? '' : matrix[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
        createGraph();
        document.getElementById('start').style.visibility = 'visible';
        document.getElementById('retry').style.visibility = 'visible';
        document.getElementsByClassName('way')[0].style.visibility = 'visible';

    }

    function clickBall(){
        if(this.className == "checked ball"){
            checked_nodes.pop();
            this.className = (checked_nodes.includes(this.innerText)) ? "pass ball" : "ball";
            if(checked_nodes.length > 0)document.querySelectorAll('.ball')[checked_nodes[checked_nodes.length-1]-1].className = "checked ball"
            // [nodes[-1]].className = "ball";
        }
        else{
            checked_nodes.push(this.innerText);
            Array.from(document.getElementsByClassName("checked ball")).forEach((element) => element.className="pass ball");
            this.className="checked ball";
        }
        document.getElementById("nodes").innerText = checked_nodes.join('');
    }
    function createGraph(){
        
        const output = document.getElementById('output');
        let n = document.getElementById('in').value;
        output.innerHTML='';
        const radius = 180;
        for (let i = 1; i <= n; i++) {
            const ball = document.createElement('div');
            ball.className='ball';
            ball.innerText=i;
            const angle = (i / n) * (2 * Math.PI);
            ball.style.left=radius * Math.cos(angle) + (output.offsetWidth / 2)+"px";
            ball.style.top=radius * Math.sin(angle) + (output.offsetHeight / 2)+"px";
            ball.addEventListener('click', clickBall);
            output.append(ball);
        }
        change();
    }
    function change()
    {  
        const n = document.getElementById('in').value;
        const table=document.getElementById("table");
        const balls=document.getElementById("output").children;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=1;i<=n;i++)
        {
            for(let j=i+1;j<=n;j++)
            {
                if (table.rows[i].cells[j].innerText=='1')
                {
                    let x1 = balls[i-1].offsetLeft+25-canvas.style.left; // X-координата первой точки
                    let y1 = balls[i-1].offsetTop+25-canvas.style.top; // Y-координата первой точки
                    let x2 = balls[j-1].offsetLeft+25-canvas.style.left; // X-координата второй точки
                    let y2 = balls[j-1].offsetTop+25-canvas.style.top; // Y-координата второй точки
                    ctx.beginPath(); // Начинаем новый путь
                    ctx.moveTo(x1, y1); // Перемещаемся к первой точке
                    ctx.lineTo(x2, y2); // Рисуем линию ко второй точке
                    ctx.stroke(); // Отображаем линию
                }
            }
        }
    }


})();
