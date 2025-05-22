(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById("start").addEventListener('click',daic);
        document.getElementById("repeat").addEventListener("click",generateTable);
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
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
                if(j === 0) {
                    cell.textContent ='v'+i;
                }else if (j!=i)
                {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.addEventListener("change",changeTable)
                    input.className = 'table-input';
                    cell.appendChild(input);
                    if (n > 12){
                        input.style.width="20px";
                    }
                }
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        container.appendChild(table);
        createGraph();
        document.getElementsByClassName('way')[0].style.visibility = 'visible';
        document.getElementById('start').style.visibility = 'visible';
    }
    function changeTable()
    {
        let cell = this.parentNode.cellIndex;
        let row = this.parentNode.parentNode.rowIndex;
        document.getElementById("table").rows[cell].cells[row].children[0].value=this.value;
        change();
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
    function clickBall()
    {
        Array.from(document.getElementsByClassName("ball")).forEach((element) => element.className="ball");
        this.className="checked ball";
        change();
    }
    function change()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const n = document.getElementById('in').value;
        const table=document.getElementById("table");
        const balls=document.getElementById("output").children;
        ctx.strokeStyle='black';
        ctx.lineWidth = 1;
        for(let i=1;i<=n;i++)
        {
            for(let j=i+1;j<=n;j++)
            {
                if (table.rows[i].cells[j].children[0].value!='')
                {
                    drawLine(balls[i-1],balls[j-1]);
                }
            }
        }
    }
    function drawLine(a,b)
    {
        let x1 = a.offsetLeft+25-canvas.style.left;
        let y1 = a.offsetTop+25-canvas.style.top;
        let x2 = b.offsetLeft+25-canvas.style.left;
        let y2 = b.offsetTop+25-canvas.style.top;
        ctx.beginPath();
        ctx.moveTo(x1, y1); 
        ctx.lineTo(x2, y2);
        ctx.stroke(); 
    }
    function daic()
    {
        sessionStorage.setItem(8,1);
        const n = Number(document.getElementById('in').value);
        let g =[];
        for (let i = 0; i <= n; i++) {
            g.push([]);
        }
        let table = document.getElementById("table");
        for (let i =1;i<=n;i++)
        {
            for (let j =1;j<=n;j++)
            {
                if (i!=j)
                {
                    let v = Number(table.rows[i].cells[j].children[0].value);
                        if (v!==0)
                        {
                            g[i].push([j,v]);
                        }
                }
            }
        }
        console.log(g);
        const s = Number(document.getElementsByClassName("checked")[0].innerText);
        let d = new Array(n+1).fill(10000000000), p = new Array(n), u = new Array(n+1).fill(false);
        d[s]=0;
        for(let i=0;i<n;i++)
        {
            let v = -1;
            for (let j=1; j<=n; ++j)
                if (!u[j] && (v == -1 || d[j] < d[v]))
                    v = j;
            if (d[v] == 10000000000)
                break;
            u[v] = true;
            for (let j=0; j<g[v].length; ++j) {
                let to = g[v][j][0], len = g[v][j][1];
                if (d[v] + len < d[to]) {
                    d[to] = d[v] + len;
                    p[to] = v;
                }
            }
        }
        console.log(p);
        const balls=document.getElementById("output").children;
        ctx.strokeStyle='red';
        ctx.lineWidth = 15;
        for (let i=1;i<p.length;i++)
        {
            if (p[i]>0)
            {
                drawLine(balls[i-1],balls[p[i]-1]);
            }
        }
        let ans=new Array(n+1).fill(-1);
        ans[s]=0;
        function rec(i){
            if(ans[i]<0){
                console.log(i,p[i]);
                let a=rec(p[i]);
                console.log(a);
                ans[i]=a+Number(table.rows[i].cells[p[i]].children[0].value);
                return ans[i];
            }else return ans[i];
        }
        let way = document.getElementById("way");
        way.innerText='';
        for(let i=1;i<p.length;i++){
            if(ans[i]<0) rec(i);
            way.innerText += "Расстояние до вершины "+i + ": " + ans[i]+"\n";
        }
    } 
})();
