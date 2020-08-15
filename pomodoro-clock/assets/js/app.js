const btnPOMODORO = document.getElementById('pomodoro');
const btnSBREAK = document.getElementById('sbreak');
const btnLBREAK = document.getElementById('lbreak');
const btnSTART = document.getElementById('btn-start');
const timer = document.getElementById('countdown-timer');
const alarm = document.getElementById('alarm');
let timeLeft = 1500;
let timeCounter = 0;
let isPause = false;



btnSTART.addEventListener('click', function(e){
    if(this.innerHTML == 'START') {
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(6px)';
        this.innerHTML = 'STOP';
        var interval = setInterval(countDown,1000);
        isPause = false;
        
        
    } else {
        this.style.boxShadow = 'rgb(235, 235, 235) 0px 6px 0px';
        this.style.transform = 'translateY(-6px)';
        this.innerHTML = 'START';
        isPause = true;
        alarm.pause();
        
      
    }

    function countDown() { 
        if(!isPause){
            timeCounter++;

            timer.innerHTML = convertToSeconds(timeLeft - timeCounter);
            if(timeCounter == timeLeft){
                clearInterval(interval);
                timeCounter = 0; 
                alarm.play();
                timer.innerHTML = convertToSeconds(timeLeft);
                
            }
        }else{
            clearInterval(interval);
        }
       
    }

    

});






function convertToSeconds(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60; 
    if(min < 10){min = `0${min}`;}
    if(sec < 10){sec = `0${sec}`;}
    if(min < 1){
        return `${sec}`;
    }  
    return `${min}:${sec}`;
}