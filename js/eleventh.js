(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("start").addEventListener('click', pruf);
        document.getElementById("repeat").addEventListener("click",clear);
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    }
    let g=[];
    function clear(){
        g=[];
        createGraph();
    }
    function pruf () {
        g=[];
        let prufer_code = document.getElementById("in").value.split(',').map(item => parseInt(item, 10)-1);
        console.log(prufer_code);
        for (let i=0;i<prufer_code.length;i++) 
        {
            if (prufer_code[i]>=prufer_code.length+2 || prufer_code[i]<0 || Number.isNaN(prufer_code[i])) {
                alert("ты че еблан");
                return 0;
            }
        }
            sessionStorage.setItem(11,1);
            console.log(prufer_code);
            let n = prufer_code.length + 2;
            let degree =[];
            for (let i=0;i<n;i++) degree.push(1);
            for (let i=0; i<n-2; ++i) ++degree[prufer_code[i]];
        
            let leaves=[];
            for (let i=0; i<n; ++i)
                if (degree[i] == 1)
                    leaves.push(i);
        
            let result=[];
            for (let i=0; i<n-2; ++i) {
                leaves.sort(compare);
                let leaf = leaves[0];
                leaves.splice(0,1);
        
                let v = prufer_code[i];
                result.push([leaf, v]);
                if (--degree[v] == 1)
                    leaves.push(v);
            }
            result.push([leaves[0], leaves[leaves.length-1]]);
            g=result;
            console.log(g);
        createGraph();
    }
    function compare( a, b ) {
        if ( a < b){
            return -1;
        }
        if ( a> b ){
            return 1;
        }
        return 0;
    }
    
    function createGraph(){
        const output = document.getElementById('output');
        output.innerHTML='';
        if (g.length!==0){
            let n = g.length+1;
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
        }
        change();
    }
    function change()
    {
        const n = g.length;
        const balls=document.getElementById("output").children;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(let i=0;i<n;i++)
        {
            console.log(g[i]);
            let x1 = balls[g[i][0]].offsetLeft+25-canvas.style.left;
            let y1 = balls[g[i][0]].offsetTop+25-canvas.style.top;
            let x2 = balls[g[i][1]].offsetLeft+25-canvas.style.left;
            let y2 = balls[g[i][1]].offsetTop+25-canvas.style.top;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2); 
            ctx.stroke();
        }
    }
})();
