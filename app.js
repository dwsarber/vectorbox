(function ($) {
    function VectorSpace(two, sizeX, sizeY) {
        this.two = two;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    function drawGrid (t, unitSize) {
        var height = t.height;
        var width = t.width;
        var lines = [];

        for (var i = 0; i < height; i = i + unitSize) {
            lines.push(t.makeLine(0, i, width, i));
        }

        for (var j = 0; j < width; j = j + unitSize) {
            lines.push(t.makeLine(j, 0, j, height));
        }

        return t.makeGroup(lines);
    }

    function closestIntersection(x, y, unitSize) {
        // TODO
    }

    function handleClick (t, g) {
        return function (e) {
            g.add(t.makeCircle(e.pageX, e.pageY, 10));
        };
    }

    $(function () {
        var sandbox = $('#sandbox');
        var elem = sandbox[0];
        var screenParams = { width: window.innerWidth, height: window.innerHeight };
        var two = new Two(screenParams).appendTo(elem);
        var group = two.makeGroup();
        var gridUnitSize = 25;

        var gridGroup = drawGrid(two, gridUnitSize);
        var pointerGroup = two.makeGroup();

        function handleMove (e) {
            // Show a circle on the intersection closest to the mouse pointer
            var ulx = e.pageX - (e.pageX % gridUnitSize);
            var uly = e.pageY - (e.pageY % gridUnitSize);
            var halfUnit = gridUnitSize / 2;

            var x = (e.pageX - ulx) <= halfUnit ? ulx : ulx + gridUnitSize;
            var y = (e.pageY - uly) <= halfUnit ? uly : uly + gridUnitSize;

            var intersector = two.makeCircle(x, y, 5);
            intersector.fill = 'blue';

            pointerGroup.remove(_.values(pointerGroup.children));
            pointerGroup.add(intersector);
        }

        sandbox.mousemove(handleMove);
        sandbox.click(handleClick(two, group));

        two.bind('update', function (frameCount) {
        }).play();
    });
})(jQuery);
