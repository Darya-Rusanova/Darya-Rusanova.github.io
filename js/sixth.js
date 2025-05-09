(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById('repeat').addEventListener('click', generateTable);
        document.getElementById("start").addEventListener('click',check);
        createGraf();
    }

    function generateTable(){

        let n = document.getElementById('in').value;
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
        createGraf();
        document.getElementById('start').style.visibility = 'visible';
        document.getElementsByClassName('way')[0].style.visibility = 'visible';
    }
    function createGraf(){
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
    function check()
    {
        const table = document.getElementById("table");
        const n = document.getElementById('in').value;
        const ans = document.getElementsByClassName("way")[0].value; 
        let g=new Array(n);
        for(let i = 1; i<=n;i++)
        {
            let p=new Array;
            for(let j = 1;j<=n;j++)
            {
                if (Number(table.rows[i].cells[j].innerText)) p.push(j);
            }
            g.push(p);
        }
        let used=new Array(n); 
        let comp = 0; 
        for (let i=0; i<=n; ++i) used[i] = 0;
        function dfs(v){
            used[v]=1;
            for(let i = 0; i<g[v].length; i++)
            {
                if (used[g[v][i]]!==1)
                {
                    dfs(g[v][i]);
                }
            }
        }

        function findComps() {
            for (let i = 0; i < n; ++i) {
                used[i] = 0;
            }
            for (let i = 0; i < n; ++i) {
                if (!used[i]) {
                    dfs(i); 
                    comp++;
                }
            }   
            return comp;  
        } 
        rightAns = findComps();   

        if (rightAns == ans){
            message(1);
        }else{
            message(0);
        }
    }
    function message(mes){
        var msg = "";
        switch(mes){
            case 0:
                msg = "Неверно! Вернитесь и попробуйте еще раз.";
                break;
            case 1: 
                msg = "Верно!";
                sessionStorage.setItem(6,1);
                break;
            case 2: 
                msg = "Некорректная запись! Вернитесь и попробуйте еще раз.";
                break;
        }
        document.getElementById("message").innerText = msg;
        window.res.showModal();
    }
})();
