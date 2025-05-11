(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('in').addEventListener('change', generateTable);
        document.getElementById("start").addEventListener('click',prim)
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
                }else 
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
        createGraf();
        document.getElementById('start').style.visibility = 'visible';
    }
    function changeTable()
    {
        let cell = this.parentNode.cellIndex;
        let row = this.parentNode.parentNode.rowIndex;
        document.getElementById("table").rows[cell].cells[row].children[0].value=this.value;
        change();
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
                console.log(table.rows[i].cells[j].children[0].value)
                if (table.rows[i].cells[j].children[0].value!='')
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
    function prim()
    {
        
    } 
})();
