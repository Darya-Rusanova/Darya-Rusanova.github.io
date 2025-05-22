(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById('repeat').addEventListener('click', generateTable);
        document.getElementById("start").addEventListener('click',start);
        createGraph();
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
                cell.textContent = j === 0 ? 'v'+i : j == i ? '' : 0;
                j === 0 ? 0 : j == i ? '' : cell.addEventListener("click", clickTable);
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        container.appendChild(table);
        createGraph();
        document.getElementById('start').style.visibility = 'visible';
        document.getElementsByClassName('way')[0].style.visibility = 'visible';
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
                    let x1 = balls[i-1].offsetLeft+25-canvas.style.left;
                    let y1 = balls[i-1].offsetTop+25-canvas.style.top;
                    let x2 = balls[j-1].offsetLeft+25-canvas.style.left;
                    let y2 = balls[j-1].offsetTop+25-canvas.style.top;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2); 
                    ctx.stroke();
                }
            }
        }
    }
    function start()
    {
        sessionStorage.setItem(0,1);
        const table = document.getElementById("table");
        const n = document.getElementById('in').value;
        const ans = document.getElementsByClassName("way")[0]; 
        ans.innerHTML = ''; 
        let g=new Array(n);
        for(let i = 0; i<n;i++)
        {
            let p=new Array;
            for(let j = 0;j<n;j++)
            {
                if (Number(table.rows[i+1].cells[j+1].innerText)) p.push(j);
            }
            g[i] = p;
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
            // Поиск компонент связности
            for (let i = 0; i < n; ++i) {
                if (!used[i]) {
                    comp++;
                    dfs(i);         
                }
            }   
            return comp;  
        } 
        comp = findComps();  
        ans.innerHTML += `Компонент связности: ${comp}<br>`;
        showDegree(g)
        let degrees = countDegree(g);
        const eulerResult = checkEulerian(g, degrees, comp);
        ans.innerHTML += `Эйлеровость: ${eulerResult}<br>`;
        const bipartiteResult = checkBipartite(g);
        ans.innerHTML += `Двудольность: ${bipartiteResult}<br>`;
    }
    function checkEulerian(g, degrees, components) {
        if (components !== 1) {
            return "Не эйлеров и не полуэйлеров (граф несвязный)";
        }

        let oddDegreeCount = degrees.filter(deg => deg % 2 !== 0).length;
        if (oddDegreeCount === 0) {
            return "Эйлеров (все степени чётные)";
        } else if (oddDegreeCount === 2) {
            return "Полуэйлеров (две вершины с нечётными степенями)";
        } else {
            return "Не эйлеров и не полуэйлеров";
        }
    }

    // Проверка на двудольность и полную двудольность
    function checkBipartite(g) {
        const n = g.length;
        const color = new Array(n).fill(-1);
        let isBipartite = true;
        const queue = [];

        // BFS для проверки двудольности
        for (let start = 0; start < n; start++) {
            if (color[start] === -1) {
                color[start] = 0;
                queue.push(start);

                while (queue.length && isBipartite) {
                    const v = queue.shift();
                    for (const u of g[v]) {
                        if (color[u] === -1) {
                            color[u] = color[v] ^ 1;
                            queue.push(u);
                        } else if (color[u] === color[v]) {
                            isBipartite = false;
                            break;
                        }
                    }
                }
            }
        }

        if (!isBipartite) {
            return "Не двудольный";
        }

        // Проверка на полную двудольность (K_{m,n})
        const partitionA = color.filter(c => c === 0).length;
        const partitionB = color.filter(c => c === 1).length;
        let edgeCount = 0;

        for (let v = 0; v < n; v++) {
            edgeCount += g[v].length;
        }
        edgeCount /= 2; // Каждое ребро посчитано дважды

        const possibleEdges = partitionA * partitionB;
        if (edgeCount === possibleEdges) {
            return `Полный двудольный (K<sub>${partitionA},${partitionB}</sub>)`;
        } else {
            return "Двудольный, но не полный";
        }
    }
    function showDegree(g){
        const output = document.getElementById('output-degree');
        let n = document.getElementById('in').value;
        let degrees = countDegree(g);
        output.innerHTML='';
        const radius = 220;
        for (let i = 1; i <= n; i++) {
            const ball = document.createElement('div');
            ball.className='degree';
            ball.innerText=degrees[i-1];
            const angle = (i / n) * (2 * Math.PI);
            ball.style.left=radius * Math.cos(angle) + (output.offsetWidth / 2)+"px";
            ball.style.top=radius * Math.sin(angle) + (output.offsetHeight / 2)+"px";
            output.appendChild(ball);
        }
    }
    function countDegree(g){
        let step = [];
        for(let v = 0; v < g.length; v++){
            let d = 0;
            for(let i = 0; i<g[v].length; i++){ 
                d++;
            }
            step.push(d);
        } 
        return step;
    }

})();
