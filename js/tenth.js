(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('add').addEventListener('click', addBall);
        document.getElementById('delete').disabled = true;
        document.getElementById("start").addEventListener('click', pruf)
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    }
    let g= [];
    for (let i=0;i<=20;i++){
        g.push([]);
    }
    let l=[];
    l.push([]);
    let used = new Set;
    function clickBall()
    {
        Array.from(document.getElementsByClassName("ball")).forEach((element) => element.className="ball");
        this.className="checked ball";
    }
    function addBall(){
        if (document.getElementById("in").value<=21){
            if (l[0].length != 0) {
                let prev= document.getElementsByClassName("checked")[0];
                if (!used.has(Number(document.getElementById("in").value))){
                    if (l.length-1 == findIndex2D(l,Number(prev.innerHTML))[0]) l.push([]);
                    l[findIndex2D(l,Number(prev.innerHTML))[0]+1].push(Number(document.getElementById("in").value));
                    g[Number(prev.innerHTML)].push(Number(document.getElementById("in").value));
                    g[Number(document.getElementById("in").value)].push(Number(prev.innerHTML));
                    used.add(Number(document.getElementById("in").value));
                    createBall();
                }
            }
            else {
                l[0].push(Number(document.getElementById("in").value));
                used.add(Number(document.getElementById("in").value));
                createBall();
            }
            changePos();
        }
    }
    function createBall(){
        const ball = document.createElement('div');
        ball.className='ball';
        ball.innerText=document.getElementById("in").value;
        ball.id=document.getElementById("in").value;
        ball.addEventListener('click', clickBall);
        output.append(ball);
    }
    function orchiectomy()
    {
        let victim = Number(document.getElementById("in").value);
        deleteRec(victim);
        for (let i =0;i<g.length;i++) {
            for( let j=0;j<g[i].length;j++)
            {
                if (g[i][j]==victim) g[i].splice(j,1);
            }
        }
        changePos();
        console.log(g,l,used);
    }
    function deleteRec(victim){
        let y= g[victim];
        for (let i=0;i<y.length;i++) {
            console.log(g[victim].length);
            console.log(victim,findIndex2D(l,victim)[0],g[victim][i],findIndex2D(l,g[victim][i])[0]);
            if (findIndex2D(l,victim)[0]<findIndex2D(l,y[i])[0])
            {
                deleteRec(y[i]);
                g[victim]=[];
            }
        }
        l[findIndex2D(l,victim)[0]].splice(findIndex2D(l,victim)[1],1);
        used.delete(victim);
        document.getElementById(victim).remove();
    }
    function findIndex2D(arr, element) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === element) {
                    return [i, j];
                }
            }
        }
        return -1; 
    }
    function changePos()
    {
        const output = document.getElementById('output');
        Array.from(document.getElementsByClassName('ball')).forEach((ball) => {
            let pos = findIndex2D(l,Number(ball.innerText));
            ball.style.left=output.offsetWidth/(l[pos[0]].length+1)*(pos[1]+1)+"px";
            ball.style.top=output.offsetHeight/(l.length+1)*(l.length-(pos[0]))+"px";
        });
        change();
    }
    function change()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle='black';
        ctx.lineWidth = 1;
        for (let i=0;i<g.length;i++) {
            for(let j=0;j<g[i].length;j++)
            {
                drawLine(document.getElementById(i),document.getElementById(g[i][j]));
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

    function pruf(){
        let n = document.getElementsByClassName("ball").length;
        for(let i=1;i<=n;i++)
        {
            if (g[i].length===0) {
                document.getElementById("al").showModal();
            };
        }
        let degree=[];
        let killed=[];
        
        for (let i=0;i<=20;i++){
            degree.push([]);
            killed.push([]);
        }
        let leaves = [];
        for (let i=0; i<=20; ++i) {
            degree[i] = g[i].length;
            console.log(degree[i],g[i].length);
            if (degree[i] === 1)
                leaves.push(i);
            killed[i] = false;
        }
    
        let result =[];
        for (let iter=0; iter<n-2; ++iter) {
            leaves.sort(compare);
            console.log(result,leaves);
            let leaf = leaves[0];
            leaves.splice(0,1);
            killed[leaf] = true;
    
            let v;
            for (let i=0; i<g[leaf].length; ++i)
                if (!killed[g[leaf][i]])
                    v = g[leaf][i];
    
            result.push(v);
            if (--degree[v] == 1)
                leaves.push(v);
        }
        document.getElementById("res").innerText=result;
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
})();
