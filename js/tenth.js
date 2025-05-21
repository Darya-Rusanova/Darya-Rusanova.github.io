(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('add').addEventListener('click', addBall);
        document.getElementById('delete').addEventListener('click', orchiectomy);
        //document.getElementById("start").addEventListener('click',daic)
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
    }
    let g= new Map;
    let l=[];
    l.push([]);
    let used = new Set;
    function clickBall()
    {
        Array.from(document.getElementsByClassName("ball")).forEach((element) => element.className="ball");
        this.className="checked ball";
    }
    function addBall(){
        if (l[0].length != 0) {
            let prev= document.getElementsByClassName("checked")[0];
            if (!used.has(Number(document.getElementById("in").value))){
                if (!g.has(Number(prev.innerHTML))) g.set(Number(prev.innerHTML), []);
                if (l.length-1 == findIndex2D(l,Number(prev.innerHTML))[0]) l.push([]);
                l[findIndex2D(l,Number(prev.innerHTML))[0]+1].push(Number(document.getElementById("in").value));
                g.get(Number(prev.innerHTML)).push(Number(document.getElementById("in").value));
                used.add(Number(document.getElementById("in").value));
                createBall();
            }
        }
        else {
            l[0].push(Number(document.getElementById("in").value));
            g.set(-1, [Number(document.getElementById("in").value)]);
            used.add(Number(document.getElementById("in").value));
            createBall();
        }
        changePos();
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
        console.log(victim);
        for (const [key,value] of g) {
            newVal = g.get(key).filter(num => num !== victim);
            g.set(key, newVal);
        }
        deleteRec(victim);
        changePos();
    }
    function deleteRec(victim){
        for (let[key, value] of g) {
            console.log(key,value);
            if (key === victim)
            {
                for(let j=0;j<value.length;j++)
                {
                    g.delete(j)
                    deleteRec(value[j]);
                }
            }
        }
        g.delete(victim);
        console.log(l,victim);
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
        for (const [key, value] of g) {
            if (key!=-1)
            {
                for(let j=0;j<value.length;j++)
                {
                    console.log(g)
                    drawLine(document.getElementById(key),document.getElementById(value[j]));
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
})();
