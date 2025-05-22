(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById("start").addEventListener('click',crus);
        document.getElementById("repeat").addEventListener("click",generateTable);
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    }

    function generateTable(){
        document.getElementById("way").innerText='';
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
            output.append(ball);
        }
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
    function compare( a, b ) {
        if ( a[0] < b[0]){
            return -1;
        }
        if ( a[0] > b[0] ){
            return 1;
        }
        return 0;
    }
    function crus()
    {
        const n = Number(document.getElementById('in').value);
        let g=[];
        let table = document.getElementById("table");
        for (let i =1;i<=n;i++)
        {
            for (let j =i+1;j<=n;j++)
            {
                let v = Number(table.rows[i].cells[j].children[0].value);
                    if (v!==0)
                    {
                        g.push([v,i,j]);
                    }
            }
        }
        g.sort(compare);
        let res =[];
        let tree_id=Array.from(Array(n+1).keys());
        for (let i = 0;i<g.length;i++)
        {
            if (tree_id[g[i][1]]!=tree_id[g[i][2]])
            {
                res.push([g[i][1],g[i][2]])
            }
            for (let j=1; j<=n; j++)
            {
                if (tree_id[j] == tree_id[g[i][2]])
                    tree_id[j] = tree_id[g[i][1]];
            }
        }
        if(res.length!==n-1)
        {
            alert();
            return 0;
        }
        const balls=document.getElementById("output").children;
        ctx.strokeStyle='red';
        ctx.lineWidth = 15;
        for (let i =0;i<res.length;i++)
        {
            drawLine(balls[res[i][0]-1],balls[res[i][1]-1]);
        }
        let ans=0;
        for (let i =0;i<res.length;i++)
        {
            ans+=Number(table.rows[res[i][0]].cells[res[i][1]].children[0].value);
        }
        document.getElementById("way").innerText=ans;
        sessionStorage.setItem(7,1);
    } 
})();
