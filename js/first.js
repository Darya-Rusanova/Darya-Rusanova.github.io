(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('start').addEventListener('start', dfs);
    }
    
    function change()
    {
        const n = document.getElementById('in').value;
        const table=document.getElementById("table");
        const balls=document.getElementById("output").children;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        console.log(balls[1]);
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
})();
