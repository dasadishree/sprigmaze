const player = "p"
const box = "b"
const goal = "g"
const wall = "w"

//creates the design of each element
setLegend(
  [ player, bitmap`
................
...8888..8888...
...88.8..8.88...
......8888......
.....888888.....
88..88888888..88
88.8880880888.88
.8.8880880888.8.
.88888888888888.
...8883333888...
....88833888....
.....888888.....
......8888......
.....88..88.....
...8.8....8.8...
...888....888...` 
  ],
  [goal,   bitmap`
......HHHH......
.....HHHHHH.....
....HHH00HHH....
...HHH0000HHH...
..HHH00HH00HHH..
.HHH00H00H00HHH.
HHH00H0000H00HHH
HH00H00HH00H00HH
H000H00HH00H000H
HH00H000000H00HH
.HH00H0000H00HH.
..HH00HHHH00HH..
...HH000000HH...
....HHH00HHH....
.....HHHHHH.....
......HHHH......`
  ],
  [wall,  bitmap`
3330333303333033
3330333303333033
0000000000000000
3033330333303333
3033330333303333
0000000000000000
3330333303333033
3330333303333033
0000000000000000
3333033330333303
3333033330333303
0000000000000000
3033330333303333
3033330333303333
0000000000000000
3333033330333303`
  ]
);

//levels and maps
let level = 0;

const levels = [
    map`
..g
.w.
p..`,
    map`
...
.wg
.pw`,
     map`
gww
..w
w.p`,
  map`
p.w.
w...
..wg
.www`,
    map`
.....
.wwgw
...ww
.wwpw
.....`,
    map`
p..w..
.w...w
.ww.wg
ww....
...ww.
.w..ww`,
    map`
......
.ww.w.
..w.wg
..wwww
w.....
...wwp`,
  map`
p....wg
..ww.w.
...w...
wwww.w.
.....w.
.www.ww
.w.....`

];

const currentLevel = levels[level];
setMap(currentLevel);


//controls
onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});


//physics
setSolids([player, wall]);


//win condition
afterInput(() => {
    const numberCovered = tilesWith(goal, player).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`8` });
        }
    }
});

//restart
onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
