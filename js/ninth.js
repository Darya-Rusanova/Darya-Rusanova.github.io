(function () {
    window.addEventListener('load', init);

    function init() {
        if (!sessionStorage.getItem(9)) document.getElementById("notif").showModal();
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById("start").addEventListener('click', start);
        document.getElementById("repeat").addEventListener("click",generateTable);
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        document.getElementById("in").addEventListener("input", prove);
    }

    function prove(){
        this.value = this.value.replace(/[^\d]/g, "");
        if (this.value == '0') this.value='';
        if (this.value > 20) {
            this.value = 20;
        }
    }

    function generateTable(){
        document.getElementById("new_table").replaceChildren();
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
                    input.addEventListener("input", prove)
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
        // document.getElementsByClassName('way')[0].style.visibility = 'visible';
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
            // ball.addEventListener('click', clickBall);
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
    
    function start()
    {
        sessionStorage.setItem(9,1);
        let table = document.getElementById("table").cloneNode(true);
        let n = document.getElementById("in").value;
        matrix = []
        for (let i=1; i<=n; ++i){
            matrix.push([])
            for (let j=1; j<=n; ++j){
                if(i==j){
                    matrix[i-1].push(0);
                } 
                // else if(table.rows[i].cells[j].children.length == 0) matrix[i-1].push(Number.MAX_VALUE)
                else {
                    let val = table.rows[i].cells[j].children[0].value
                    if(val == "") matrix[i-1].push(Number.MAX_VALUE)
                    else matrix[i-1].push(val)
                }
            }
        }
        // console.log(matrix)
        for (let k=0; k<n; ++k){
            for (let i=0; i<n; ++i){
                for (let j=0; j<n; ++j){
                    matrix[i][j] = Math.min(matrix[i][j], Number(matrix[i][k]) + Number(matrix[k][j]));
                } 
            } 
        } 
        for (let i=1; i<=n; ++i){
            for (let j=1; j<=n; ++j){
                if(matrix[i-1][j-1] == Number.MAX_VALUE)  table.rows[i].cells[j].innerText = ""
                else table.rows[i].cells[j].innerText = matrix[i-1][j-1]
            }
        }
        document.getElementById("new_table").replaceChildren(table);
    } 
})();
