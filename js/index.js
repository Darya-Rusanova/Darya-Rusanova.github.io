(function () {
    window.addEventListener('load', init);

    function init() {
        let balls=document.getElementsByClassName("block");
        for (let i = 1; i < 13; i++)
        {
            if (sessionStorage.getItem(i))
            {
                balls[i].classList.add("connect");
            }
        }
            const canvas = document.getElementById('connectionCanvas');
            const ctx = canvas.getContext('2d');
            
            // Устанавливаем размер canvas равным его отображаемому размеру
            function resizeCanvas() {
                const container = document.querySelector('.circle-container');
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
                drawConnections();
            }
            
            // Получаем координаты центра элемента
            function getCenter(el) {
                const rect = el.getBoundingClientRect();
                const container = document.querySelector('.circle-container');
                const containerRect = container.getBoundingClientRect();
                return {
                    x: rect.left + rect.width/2 - containerRect.left,
                    y: rect.top + rect.height/2 - containerRect.top
                };
            }
            
            // Рисуем все соединения
            function drawConnections() {
                // Очищаем canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Получаем координаты всех элементов
                const center = document.querySelector('.center');
                const blocks = Array.from(document.querySelectorAll('.connect'));
                
                const centerPos = getCenter(center);
                const blockPositions = blocks.map(block => getCenter(block));
                
                // Настройки линий
                ctx.strokeStyle = '#5fb0e6';
                ctx.lineWidth = 3;
                
                // Соединяем все вершины с центром
                blockPositions.forEach(pos => {
                    drawLine(centerPos, pos);
                });
                
                // Соединяем вершины между собой (полный граф)
                for (let i = 0; i < blockPositions.length; i++) {
                    for (let j = i + 1; j < blockPositions.length; j++) {
                        drawLine(blockPositions[i], blockPositions[j]);
                    }
                }
            }
            
            // Функция для рисования линии между двумя точками
            function drawLine(point1, point2) {
                ctx.beginPath();
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
                ctx.stroke();
            }
            
            // Инициализация и обработка изменения размера окна
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
    }
})();