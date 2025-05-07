(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById("start").addEventListener('click',start);
        createGraf();
    }

    function generateTable(){
        let n = document.getElementById('in').value;
        const container = document.getElementById('input');
        container.innerHTML='';
        const table = document.createElement('table');
        table.id='table';

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
                cell.textContent = j === 0 ? 'v'+i : j == i ? '' : 0;
                cell.addEventListener("click", clickTable);
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
            ball.addEventListener('click', clickBall);
            output.appendChild(ball);
        }
        change();
    }
    function clickTable()
    {
        this.innerText = this.innerText=='0' ? '1' : '0' ;
        let cell = this.cellIndex;
        let row = this.parentNode.rowIndex;
        document.getElementById("table").rows[cell].cells[row].innerText=this.innerText;
        change();
    }
    function clickBall()
    {
        Array.from(document.getElementsByClassName("ball")).forEach((element) => element.className="ball");
        this.className="checked ball";
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
                    console.log(x1,x2,y1,y2);
                    console.log(canvas.offsetTop);
                    ctx.beginPath(); // Начинаем новый путь
                    ctx.moveTo(x1, y1); // Перемещаемся к первой точке
                    ctx.lineTo(x2, y2); // Рисуем линию ко второй точке
                    ctx.stroke(); // Отображаем линию
                }
            }
        }
    }
    function start()
    {
        const table = document.getElementById("table");
        const n = document.getElementById('in').value;
        const begin = Number(document.getElementsByClassName("checked")[0].innerText);
        const ans = document.getElementsByClassName("way")[0];
        ans.innerText='';
        console.log(begin);
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
        for (let i=0; i<=n; ++i) used[i] = 0;
        ans.innerText+=begin+' ';
        dfs(begin);
        
        function dfs(v){
            used[v]=1;
            for(let i = 0; i<g[v].length; i++)
            {
                console.log(g[v]);
                if (used[g[v][i]]!==1)
                {
                    console.log(used);
                    ans.innerText+=(g[v][i])+' ';
                    dfs(g[v][i]);
                }
            }
        }
    }
})();
