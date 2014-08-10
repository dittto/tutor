<!doctype html>
<html>
<head>
    <title>Tutor test</title>

    <style>
        .tutor-hide {
            display: none;
        }

        .tutor-box {
            background: #333333;
            color: #ffffff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 300;
        }

        .tutor-box-central {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 200;
        }

        .tutor-box-bg {
            background: rgba(255, 255, 255, 0.6);
            height: 100%;
            left: 0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 100;
        }

        #tutor-cancel {
            position: fixed;
            left: 0;
            text-align: center;
            top: 0;
            width: 100%;
            z-index: 400;
        }

        #tutor-cancel div {
            display: inline-block;
        }
    </style>
</head>
<body>
    <div id="textPageContent" class="tutor-hide">Main box</div>

    <div id="testPage" style="margin-top: 200px; height: 100px; width: 100px; background: cornflowerblue"></div>

    <div class="firstBox">First box</div>
    <div class="secondBox">Second box</div>

    <div class="startTutorial">Homepage</div>
    <div class="startReversi">Reversi</div>

    <script src="/js/jquery-1.11.1.min.js"></script>
    <script src="/js/jquery.cookie.js"></script>
    <script src="/js/tutor/config/manager.js"></script>
    <script src="/js/tutor/design/box.js"></script>
    <script src="/js/tutor/design/background.js"></script>
    <script src="/js/tutor/design/cancel.js"></script>
    <script src="/js/tutor/design/design.js"></script>
    <script src="/js/tutor/objects/page.js"></script>
    <script src="/js/tutor/objects/store.js"></script>
    <script src="/js/tutor/objects/promise.js"></script>
    <script src="/js/tutor/objects/promisefactory.js"></script>
    <script src="/js/tutor/objects/promisestore.js"></script>
    <script src="/js/tutor/tutor.js"></script>
    <script src="/js/test.js"></script>
</body>
</html>
