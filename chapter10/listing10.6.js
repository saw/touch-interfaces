body * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  width: 100%;
  -ms-touch-action: none;
}

.slide {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}

.header {
  height: 50%;
  overflow: hidden;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  border-bottom: 5px solid black;
  background: #fff;
}

.hero {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 5px;
  text-align: center;
}

.navigation {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.navigation .arrow {
  color: #fff;
  text-decoration: none;
  position: absolute;
  height: 100%;
  width: 50%;
}
.navigation .arrow span {
  display: block;
  position: absolute;
  top: 40%;
  left: 5px;
}
.navigation .next-link {
  left: 50%;
}
.navigation .next-link span {
  left: auto;
  right: 5px;
}

.hero-img {
  display: inline;
  max-height: 100%;
  max-width: 100%;
}

.title {
  border-top: 4px solid black;
  color: black;
  height: 40px;
  font-size: 24px;
  width: 100%;
  margin: 0;
  text-align: left;
}

.bd {
  width: 100%;
  height: 50%;
  position: absolute;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  top: 50%;
  padding: 0px 20px;
}

@media screen and (orientation: landscape) {
  .header {
    width: 33%;
    height: 110px;
    border-bottom: 2px solid black;
  }
  .header .hero {
    background: transparent;
  }
  .header .title {
    height: 34px;
    font-size: 14px;
  }
  .header .arrow span {
    top: 10px;
  }

  .bd {
    width: auto;
    height: 100%;
    top: 0;
    margin: 0 10px 0 34%;
    padding: 0px;
    font-size: 12px;
  }
}
