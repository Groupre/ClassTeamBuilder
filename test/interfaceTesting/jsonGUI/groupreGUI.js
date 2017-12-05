$(document).ready(function(){
    var categories = {
        left:'leftHand',
        aisleL:'aisleLeft',
        aisleR:'aisleRight',
        front:'front',
        back:'back',
        broken:'broken'
    }
    
    document.getElementById('build').onclick = function() {
        var rows = parseInt(document.getElementById('Enter rows here:').value,10);
        var cols = parseInt(document.getElementById('Enter columns here:').value,10);
        var table = document.createElement('table');
        table.id = 'dataTable';
        table.border = "1";
        var prevrow;
        for (var r = 0; r < (rows); r++) {
            var row = document.createElement('tr');
            for (var c = 0; c < (cols); c++) {
                var cell = document.createElement('td');
                //need to put int to string in here to change to seat letter
                cell.id = 'Seat ' + r + ' ' + c;
                cell.innerHTML = cell.id;
                row.appendChild(cell);
            }
            if (prevrow) {
                table.insertBefore(row, prevrow);
            } else {
                table.appendChild(row);
            }
            prevrow = row;
        }
        document.getElementById('output').appendChild(table);
        drag();
    }

    document.getElementById("leftHandedButton").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByClassName("highlight");

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.toggle("leftHand");
        }

        cells = table.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.remove("highlight");
        }

    }

    document.getElementById("aisleButton").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByClassName("highlight");
        var col1 = 0;
        var col2 = 0;

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            var colStr = cell.getAttribute("id");
            colStr = colStr[colStr.length-1];
            var col = parseInt(colStr);

            if(i<cells.length-1) {
                var nextColStr = cells[i+1].getAttribute("id");
                nextColStr = nextColStr[nextColStr.length-1];
                var nextCol = parseInt(nextColStr);
            }

            if(col == 0) {
                cell.classList.toggle("aisleLeft");
            } else if(col1 == 0 && col2 == 0) {
                col1 = col;
                if(col > nextCol) {
                    col2 = col;
                    col1 = nextCol;
                    cell.classList.toggle("aisleRight");
                } else {
                    cell.classList.toggle("aisleLeft");
                }
            } else {
                if(col == col1) {
                    cell.classList.toggle("aisleLeft");
                } else if(col == col2) {
                    cell.classList.toggle("aisleRight");
                }
            }
        }

        /*for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            var col = cell.getAttribute("id");
            alert(col[col.length-1]);
        }

        /*for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.toggle("aisle");
        }*/

        cells = table.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.remove("highlight");
        }
    }

    document.getElementById("frontRowButton").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByClassName("highlight");

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.toggle("front");
        }

        cells = table.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.remove("highlight");
        }
    }

    document.getElementById("backRowButton").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByClassName("highlight");

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.toggle("back");
        }

        cells = table.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.remove("highlight");
        }
    }

    document.getElementById("brokenButton").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByClassName("highlight");

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.toggle("broken");
        }

        cells = table.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            cell.classList.remove("highlight");
        }
    }

    document.getElementById("reset").onclick = function() {
        var table = document.getElementById("dataTable");
        var cells = table.getElementsByTagName("td");

        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            for(var key in categories) {
                var cat = categories[key];
                if (cell.classList.contains(cat)){
                    cell.classList.toggle(cat);
                }
            }
        }
    }

    function drag() {
        var isMouseDown = false,
        isHighlighted;
        $("#dataTable td")
        .mousedown(function () {
            isMouseDown = true;
            $(this).toggleClass("highlight");
            isHighlighted = $(this).hasClass("highlight");
            return false;
        })
        .mouseover(function () {
            if (isMouseDown) {
            $(this).toggleClass("highlight", isHighlighted);
            }
        });

        $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
    }

    function saveChanges(){
        var array = [];
        array.push(['CID', 'TID', 'Attributes']);

        var table = document.getElementById("dataTable");
        var cells = table.getElementsByTagName("td");
        
        for(var i=0; i<cells.length; i++) {
            var cell = cells[i];
            var row = [];
            row.push(cell.value);
            //row.push(cell's team) TODO implement team generation
            for(var key in categories) {
                var cat = categories[key];
                if (cell.classList.contains(cat)){
                    row.push(cat);
                }
            }
        }
        JSON.stringify(array);
    }


});

