<!-- <div style="align-items:center;justify-content:center">
    <div id="dice">
      <div class="side front">
        <div class="dot center"></div>
      </div>
      <div class="side front inner"></div>
      <div class="side top">
        <div class="dot dtop dleft"></div>
        <div class="dot dbottom dright"></div>
      </div>
      <div class="side top inner"></div>
      <div class="side right">
        <div class="dot dtop dleft"></div>
        <div class="dot center"></div>
        <div class="dot dbottom dright"></div>
      </div>
      <div class="side right inner"></div>
      <div class="side left">
        <div class="dot dtop dleft"></div>
        <div class="dot dtop dright"></div>
        <div class="dot dbottom dleft"></div>
        <div class="dot dbottom dright"></div>
      </div>
      <div class="side left inner"></div>
      <div class="side bottom">
        <div class="dot center"></div>
        <div class="dot dtop dleft"></div>
        <div class="dot dtop dright"></div>
        <div class="dot dbottom dleft"></div>
        <div class="dot dbottom dright"></div>
      </div>
      <div class="side bottom inner"></div>
      <div class="side back">
        <div class="dot dtop dleft"></div>
        <div class="dot dtop dright"></div>
        <div class="dot dbottom dleft"></div>
        <div class="dot dbottom dright"></div>
        <div class="dot center dleft"></div>
        <div class="dot center dright"></div>
      </div>
      <div class="side back inner"></div>
      <div class="side cover x"></div>
      <div class="side cover y"></div>
      <div class="side cover z"></div>
    </div>
  </div>

<style>
@keyframes spin {
    0% { transform: translateZ(-100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
    33% { transform: translateZ(-100px) rotateX(360deg) rotateY(90deg) rotateZ(180deg); }
    50% { transform: translateZ(-100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
    66% { transform: translateZ(-100px) rotateX(180deg) rotateY(360deg) rotateZ(270deg); }
    83% { transform: translateZ(-100px) rotateX(270deg) rotateY(180deg) rotateZ(180deg); }
    100% { transform: translateZ(-100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
}

#dice {
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    animation: spin 100s infinite linear;
}
.side {
    position: absolute;
    width: 200px;
    height: 200px;
    background: #fff;
    box-shadow:inset 0 0 40px #ccc;
    border-radius: 40px;
}
#dice .cover, #dice .inner {
    background: #e0e0e0;
    box-shadow: none;
}
#dice .cover {
    border-radius: 0;
    transform: translateZ(0px);
}
#dice .cover.x {
    transform: rotateY(90deg);
}
#dice .cover.z {
    transform: rotateX(90deg);
}
#dice .front  {
    transform: translateZ(100px);
}
#dice .front.inner  {
    transform: translateZ(98px);
}
#dice .back {
    transform: rotateX(-180deg) translateZ(100px);
}
#dice .back.inner {
    transform: rotateX(-180deg) translateZ(98px);
}
#dice .right {
    transform: rotateY(90deg) translateZ(100px);
}
#dice .right.inner {
    transform: rotateY(90deg) translateZ(98px);
}
#dice .left {
    transform: rotateY(-90deg) translateZ(100px);
}
#dice .left.inner {
    transform: rotateY(-90deg) translateZ(98px);
}
#dice .top {
    transform: rotateX(90deg) translateZ(100px);
}
#dice .top.inner {
    transform: rotateX(90deg) translateZ(98px);
}
#dice .bottom {
    transform: rotateX(-90deg) translateZ(100px);
}
#dice .bottom.inner {
    transform: rotateX(-90deg) translateZ(98px);
}
.dot {
    position:absolute;
    width:46px;
    height:46px;
    border-radius:23px;
    background:#000000;
}
.dot.center {
    margin:77px 0 0 77px;
}
.dot.dtop {
    margin-top:20px;
}
.dot.dleft {
    margin-left:134px;
}
.dot.dright {
    margin-left:20px;
}
.dot.dbottom {
    margin-top:134px;
}
.dot.center.dleft {
    margin:77px 0 0 20px;
}
.dot.center.dright {
    margin:77px 0 0 134px;
}
</style> -->