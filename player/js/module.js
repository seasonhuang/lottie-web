"use strict";
/*<%= contents %>*/
var lottiejs = {};

var _isFrozen = false;

function setLocationHref (href) {
    locationHref = href;
}

function searchAnimations() {
    if (standalone === true) {
        animationManager.searchAnimations(animationData, standalone, renderer);
    } else {
        animationManager.searchAnimations();
    }
}

function setSubframeRendering(flag) {
    subframeEnabled = flag;
}

function loadAnimation(params) {
    if (standalone === true) {
        params.animationData = JSON.parse(animationData);
    }
    return animationManager.loadAnimation(params);
}

function setQuality(value) {
    if (typeof value === 'string') {
        switch (value) {
            case 'high':
                defaultCurveSegments = 200;
                break;
            case 'medium':
                defaultCurveSegments = 50;
                break;
            case 'low':
                defaultCurveSegments = 10;
                break;
        }
    } else if (!isNaN(value) && value > 1) {
        defaultCurveSegments = value;
    }
    if (defaultCurveSegments >= 50) {
        roundValues(false);
    } else {
        roundValues(true);
    }
}

function inBrowser() {
    return typeof navigator !== 'undefined';
}

function installPlugin(type, plugin) {
    if (type === 'expressions') {
        expressionsPlugin = plugin;
    }
}

function getFactory(name) {
    switch (name) {
        case "propertyFactory":
            return PropertyFactory;
        case "shapePropertyFactory":
            return ShapePropertyFactory;
        case "matrix":
            return Matrix;
    }
}

lottiejs.play = animationManager.play;
lottiejs.pause = animationManager.pause;
lottiejs.togglePause = animationManager.togglePause;
lottiejs.setSpeed = animationManager.setSpeed;
lottiejs.setDirection = animationManager.setDirection;
lottiejs.stop = animationManager.stop;
lottiejs.loadAnimation = loadAnimation;
lottiejs.setSubframeRendering = setSubframeRendering;
lottiejs.resize = animationManager.resize;
//lottiejs.start = start;
lottiejs.goToAndStop = animationManager.goToAndStop;
lottiejs.destroy = animationManager.destroy;
lottiejs.setQuality = setQuality;
lottiejs.installPlugin = installPlugin;
lottiejs.freeze = animationManager.freeze;
lottiejs.unfreeze = animationManager.unfreeze;
lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations;
lottiejs.__getFactory = getFactory;
lottiejs.version = '[[BM_VERSION]]';

var standalone = '__[STANDALONE]__';
var animationData = '__[ANIMATIONDATA]__';
var renderer = '';

module.exports = lottiejs;
