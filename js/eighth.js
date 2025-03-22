(function () {
    window.addEventListener('load', init);

    function init() {
        document.getElementById("res").addEventListener("click", click);
        document.addEventListener("keyup", enterUp);
    }
    function enterUp(event) {
        if (event.code == "Enter") click();
      }

    function click() {
        var ans = '';
        var vector = document.getElementById("in").value;
        var n = Math.log2(vector.length);
        if(vector.split("1").length - 1 == 0){
            document.getElementById("out").innerText = "Функция не имеет СДНФ :(";
            return 0;
        };
        for(let i = 0; i<vector.length; i++){
            if(vector[i]=='1'){
                var cur = i;
                var v = "";
              for(let j = 0; j<n; j++){                 
                    if((cur&(1<<j)) == 0) v+= "⋅" + '>vid/<'+(n-j)+ 'x>"revo"=ssalc vid<';
                    else v += "⋅" + (n-j) + "x";
//                  if((cur&(1<<j)) == 0) v+="¬";
                }
                ans += v.split("").reverse().join("").slice(0,-1)+ " ∨ ";
            }
        }
        document.getElementById("out").innerHTML = ans.slice(0, -3);
    }
})();