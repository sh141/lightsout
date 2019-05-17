let length = 5;//1辺
let square = length * length;//パネル数
const light = "green";//光の煌き
const dark = "lightgray";//暗いときの色

//パネルをたくさん作る
function createBox() {
    console.log('hello');//挨拶は大事
    const main = document.getElementById('main');//照準
    const boxList = [];//div群

    //boxを25個作ってid振る (idは1から始める)
    for (let i = 0; i < square; i++) {
        boxList.push(document.createElement('div'));
        boxList[i].id = i + 1;
        boxList[i].classList.add('box');
        boxList[i].style.backgroundColor = dark;
        main.appendChild(boxList[i]);
        // console.log(boxList[i]);
    }
}

//各パネルにクリック処理を埋め込む
function setClickEvent() {
    let elemList = document.getElementsByClassName("box");
    for (let i = 0; elemList.length; i++) {
        elemList[i].onclick = (evt) => {
            console.log(evt.target.id);//デバッグ
            mapAttack(evt.target);//周囲を巻き込んで爆発
            checkClear();
        };
    }
}

//パネルを点けたり消したりする
function reverse(target) {
    if (target.style.backgroundColor === light) {
        target.style.backgroundColor = dark;
    }
    else {
        target.style.backgroundColor = light;
    }
}

//範囲攻撃
function mapAttack(target) {
    const id = parseInt(target.id, 10);

    reverse(document.getElementById(id));
    if ((id + length) <= square) {
        reverse(document.getElementById(id + length));
    }
    if ((id - length) > 0) {
        reverse(document.getElementById(id - length));
    }
    if (Math.floor((id % length)) !== 0) {
        reverse(document.getElementById(id + 1));
    }
    if (Math.floor((id % length)) !== 1) {
        reverse(document.getElementById(id - 1));
    }
}

//クリアしたらお知らせ
function checkClear() {
    for (let i = 0; i < square; i++) {
        //どれかが明るかったらダメ
        if (document.getElementById(i + 1).style.backgroundColor === light) {
            return;
        }
    }

    //全部暗かったらクリア
    alert('これはクリアですねえ！');
}

function randomize() {
    for (let i = 0; i < square; i++) {
        let target = document.getElementById(i + 1);
        if (Math.floor(Math.random() * Math.floor(2)) === 0) {
            target.style.backgroundColor = dark;
        }
        else {
            target.style.backgroundColor = light;
        }
    }
}

//パネル数を変更
function changePanels() {
    length = parseInt(document.getElementById('select-length').value,10);
    // console.log(length);
    square = length * length;

    //前のパネルを消す
    const main_element = document.getElementById('main');
    main_element.innerHTML = '';
    // while (main_element.firstChild) main_element.removeChild(main_element.firstChild);

    //並び替えのためにdiv大きさを変更
    let main_width = (50 * length) + (10 * (length + 1));
    main_element.style.width = main_width + 'px';
    
    createBox();//新しい数でパネル生成
    setClickEvent();//生成したパネルにクリック処理を置く
}

//======================================
createBox();//まずパネルを置く
setClickEvent();//各パネルにクリック処理を置く




