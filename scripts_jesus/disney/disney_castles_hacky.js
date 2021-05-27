let currentPlace = null;

// SHAPES
let sky = experience.backgroundScene.shapeByName('sky');

//CASTLE
let isDay = true;
let btnDay = experience.currentScene.shapeByName('dia_btn');
let btnNight = experience.currentScene.shapeByName('noche_btn');
let floorNight = experience.currentScene.shapeByName('noche_piso');
let dayText = experience.currentScene.shapeByName('dia_txt');
let nightText = experience.currentScene.shapeByName('noche_txt');
let dayCastle = experience.currentScene.shapeByName('dia_castillo');
let nightCastle = experience.currentScene.shapeByName('noche_castillo');
let backBtn = experience.backgroundScene.shapeByName('volver_btn');
let backText = experience.backgroundScene.shapeByName('volver_txt');
let castleShopBtn = experience.backgroundScene.shapeByName('castle_shop');
let castleARBtn = experience.backgroundScene.shapeByName('castle_AR');
let castleARText = experience.backgroundScene.shapeByName('castle_ARtext');

//BOOK
let bookCover = experience.currentScene.shapeByName('libro_tapa');
let bookBack = experience.currentScene.shapeByName('libro_contratapa');
let btnBook = experience.currentScene.shapeByName('libro_btn');
let bookText = experience.currentScene.shapeByName('libro_text');
let backBookBtn = experience.backgroundScene.shapeByName('volver_book');
let bookShopBtn = experience.backgroundScene.shapeByName('book_shop');
// BOOK STATE
let open = false;

//VIDEO
let backVideoBtn = experience.backgroundScene.shapeByName('volver_video');
let videoShopBtn = experience.backgroundScene.shapeByName('video_shop');

//AUDIOS
let cancionInicial = experience.currentScene.shapeByName('cancion_inicial');
let cancionDia = experience.currentScene.shapeByName('cancion_dia');
let cancionNoche = experience.currentScene.shapeByName('cancion_noche');
let stopInicial = experience.currentScene.shapeByName('stop_inicial');

global.initAll = function() {
    //OCULTAR WIDGETS
    global.customHide(backVideoBtn);
    global.customHide(videoShopBtn);
    global.customHide(bookText);
    global.customHide(btnBook);
    global.customHide(bookShopBtn);
    global.customHide(backBookBtn);
    global.customHide(castleARText);
    global.customHide(castleARBtn);
    global.customHide(castleShopBtn);
    global.customHide(backBtn);
    global.customHide(backText);
    global.customHide(btnNight);
    global.customHide(nightText);
    global.customHide(btnDay);
    global.customHide(dayText);
    global.customHide(sky);
    global.customHide(floorNight);
    global.customHide(dayText);
    global.customHide(nightCastle);
}

global.customHide = function(obj) {
    obj.hide();
    obj.clickable = false;
}

global.customShow = function(obj) {
    obj.show();
    obj.clickable = true;
}

global.customFadeOut = function(obj, duration) {
    if (duration) {
        obj.animateAlpha({
            to: 0,
            duration: duration
        });
    } else {
        obj.fadeOut();
    }
    obj.clickable = false;
}

global.customFadeIn = function(obj, duration) {
    if (duration) {
        obj.animateAlpha({
            to: 1,
            duration: duration
        });
    } else {
        obj.fadeIn();
    }
    obj.clickable = true;
}

//AL VOLVER DEL CASTILLO
global.atCloseCastle = function() {
    currentPlace = null;

    global.customFadeOut(castleARText);
    global.customFadeOut(castleARBtn);
    global.customFadeOut(castleShopBtn);
    global.customFadeOut(backBtn);
    global.customFadeOut(backText);
    global.customFadeOut(btnNight);
    global.customFadeOut(nightText);
    global.customFadeOut(btnDay);
    global.customFadeOut(dayText);

    // if (isDay) {
    //     global.customFadeIn(btnNight);
    //     global.customFadeIn(nightText);
    //     global.customHide(btnDay);
    //     global.customHide(dayText);
    // } else {
    //     global.customFadeIn(btnDay);
    //     global.customFadeIn(dayText);
    //     global.customHide(btnNight);
    //     global.customHide(nightText);
    // }
}

//AL VOLVER DEL LIBRO
global.atCloseBook = function() {
    currentPlace = null;

    global.customFadeOut(bookShopBtn);
    global.customFadeOut(backBookBtn);
    if(open == false){
        global.customFadeOut(btnBook);
        global.customFadeOut(bookText);
    }
}

//AL VOLVER DEL VIDEO
global.atCloseVideo = function() {
    currentPlace = null;

    global.customFadeOut(backVideoBtn);
    global.customFadeOut(videoShopBtn);
}

global.closeCurrent = function() {
    if (currentPlace != null) {
        switch (currentPlace) {
            case "castle":
                global.atCloseCastle();
                break;

            case "book":
                global.atCloseBook();
                global.closeBook();
                break;

            case "video":
                global.atCloseVideo();
                break;
        }
    }
}

//MOSTRAR WIDGETS DEL CASTILLO AL PRESIONAR EL BOTON DEL CASTILLO
global.castle = function() {
    if (currentPlace == "castle")
        return;

    global.closeCurrent();

    currentPlace = "castle";

    if (isDay) {
        global.customFadeIn(btnNight);
        global.customFadeIn(nightText);
        global.customHide(btnDay);
        global.customHide(dayText);
    } else {
        global.customFadeIn(btnDay);
        global.customFadeIn(dayText);
        global.customHide(btnNight);
        global.customHide(nightText);
    }

    global.customFadeIn(backBtn);
    global.customFadeIn(backText);
    global.customFadeIn(castleShopBtn);
    global.customFadeIn(castleARBtn);
    global.customFadeIn(castleARText);
}

//MOSTRAR WIDGETS DEL LIBRO AL PRESIONAR EL BOTON DEL LIBRO
global.book = function() {
    if (currentPlace == "book")
        return;

    global.closeCurrent();

    currentPlace = "book";

    global.customFadeIn(bookShopBtn);
    global.customFadeIn(backBookBtn);
    if(open == false){
        global.customFadeIn(btnBook);
        global.customFadeIn(bookText);
    }else{
        return null
    }
    
}

//MOSTRAR WIDGETS DEL VIDEO AL PRESIONAR EL BOTON DEL VIDEO
global.video = function() {
    if (currentPlace == "video")
        return;

    global.closeCurrent();

    currentPlace = "video";

    global.customFadeIn(videoShopBtn);
    global.customFadeIn(backVideoBtn);
}

//BOTÓN DE DÍA
global.day = function() {
    isDay = true;

    experience.currentScene.shapeByName("cancion_noche").stop();
    experience.currentScene.shapeByName("cancion_dia").play();

    global.customFadeOut(nightCastle, 0.1);
    global.customFadeIn(dayCastle, 0.1);
    
    global.customShow(btnNight);
    global.customHide(btnDay);
    global.customShow(nightText);
    global.customHide(dayText);

    sky.animateAlpha({
        to: 0,
        duration: 0.8
    });
    floorNight.animateAlpha({
        to: 0,
        duration: 0.8
    });
}

//BOTÓN DE NOCHE
global.night = function() {
    isDay = false;
    
    experience.currentScene.shapeByName("cancion_dia").stop();
    experience.currentScene.shapeByName("cancion_noche").play();

    global.customFadeOut(dayCastle, 0.1);
    global.customFadeIn(nightCastle, 0.1);
    

    global.customShow(btnDay);
    global.customHide(btnNight);
    global.customHide(nightText);
    global.customShow(dayText);

    sky.animateAlpha({
        to: 0.8,
        duration: 0.8
    });
    floorNight.animateAlpha({
        to: 0.99,
        duration: 0.8
    });
}

//ABRIR LIBRO
global.openBook = function() {
    global.customHide(btnBook);
    global.customHide(bookText);
    open = true
    delay(function() {
        bookCover.animatePosition({
            to: { x: 0.06, y: 3.70, z: 7.90 },
            start: 0.52,
            duration: 0.5,
            easing: "cubicOut"
        });
        bookCover.animateRotation({
            to: { x: 107, y: 0, z: 4 },
            start: 0.52,
            duration: 1,
            easing: "cubicOut"
        });
        bookBack.animatePosition({
            to: { x: 0.06, y: 3.70, z: 7.90 },
            duration: 0.5,
            easing: "cubicOut"
        });
        bookBack.animateRotation({
            to: { x: 107, y: 0, z: -180 },
            duration: 1,
            easing: "cubicOut"
        });
    }, 0.3);

    delay(function() {
        bookCover.animatePosition({
            to: { x: 0.06, y: 3.85, z: 7.90 },
            duration: 2,
            easing: "cubicInOut",
            loop: true,
            yoyo: true
        });

        bookBack.animatePosition({
            to: { x: 0.06, y: 3.85, z: 7.90 },
            duration: 2,
            easing: "cubicInOut",
            loop: true,
            yoyo: true
        });
    }, 1);

    delay(function() {
        backBookBtn.clickable = true;
    }, 1.2);
}

global.closeBook = function() {
    open = false
    delay(function() {
        bookCover.animatePosition({
            to: { x: 1.19, y: 3.70, z: 7.90 },
            start: 0.52,
            duration: 1,
            easing: "cubicOut"
        });
        bookCover.animateRotation({
            to: { x: 120, y: 0, z: -180 },
            start: 0.52,
            duration: 1,
            easing: "cubicOut"
        });
        bookBack.animatePosition({
            to: { x: 1.19, y: 3.70, z: 7.90 },
            duration: 1,
            easing: "cubicOut"
        });
        bookBack.animateRotation({
            to: { x: 120, y: 0, z: -180 },
            duration: 1,
            easing: "cubicOut"
        });
    }, 0.3);
}

global.initAll();