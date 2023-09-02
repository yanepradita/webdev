const char = document.getElementById("kucing");
        const bola = document.getElementById("bola");
        const playerScore = document.getElementById("score");

        let score = 0;
        let interval = null;

        let jumlahScore = () => {
            score++;
            playerScore.innerHTML = `Score : ${score}`
        };

        function jump(){
            if(char.classList != "animate") {
                char.classList.add("animate");
            }
            setTimeout(function(){
                char.classList.remove("animate")
            },500)
            let score = 0
            interval = setInterval(jumlahScore, 100)
        }

        const ifHitBola = setInterval(function(){
            const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
            const bolaLeft = parseInt(window.getComputedStyle(bola).getPropertyValue("left"))
        if(bolaLeft < 90 && bolaLeft > 0 && charTop >= 90){
            bola.style.animation = "none"
            bola.style.display = "none"
            if(confirm ("Meow mengenai bola, main lagi?")){
                window.location.reload()
            }
        }
        })