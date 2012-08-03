var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

function loadsqlfiles()
{    
    var fileref = document.getElementById("sqlscriptfiles");
    if(fileref != null) {
        sqlFiles = null;
        fileref.parentNode.removeChild(fileref);
    }
    
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", "sqls.js?" + Math.floor((Math.random()*1000)+1));
    fileref.setAttribute("id", "sqlscriptfiles");
    fileref.onload = function() {
        var qfilesList = document.getElementById("qfiles");
        qfilesList.innerHTML = "";
        for(var i=0; i < sqlFiles.length; ++i) {
            var opt=document.createElement('option');
            opt.setAttribute("value", sqlFiles[i]);
            opt.innerHTML = sqlFiles[i];
            qfilesList.appendChild(opt); 
        }
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function loadsql()
{    
    var e = document.getElementById("qfiles");
    var file = e.options[e.selectedIndex].value;
    
    var fileref = document.getElementById("sqlscript");
    if(fileref != null) {
        parsetree = null;
        fileref.parentNode.removeChild(fileref);
    }
    
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", file + "?" + Math.floor((Math.random()*1000)+1));
    fileref.setAttribute("id", "sqlscriptfiles");
    fileref.onload = function() {
        document.getElementById("sqltext").innerHTML = parsetree.sql();
        reload_tree(parsetree.json());
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function reload_tree(json){
    //A client-side tree generator
    document.getElementById("infovis").innerHTML = "";

    //Implement a node rendering function called 'nodeline' that plots a straight line
    //when contracting or expanding a subtree.
    $jit.ST.Plot.NodeTypes.implement({
        'nodeline': {
          'render': function(node, canvas, animating) {
                if(animating === 'expand' || animating === 'contract') {
                  var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
                  var width  = nconfig.width, height = nconfig.height;
                  var algnPos = this.getAlignedPos(pos, width, height);
                  var ctx = canvas.getCtx(), ort = this.config.orientation;
                  ctx.beginPath();
                  if(ort == 'left' || ort == 'right') {
                      ctx.moveTo(algnPos.x, algnPos.y + height / 2);
                      ctx.lineTo(algnPos.x + width, algnPos.y + height / 2);
                  } else {
                      ctx.moveTo(algnPos.x + width / 2, algnPos.y);
                      ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
                  }
                  ctx.stroke();
              } 
          }
        }
    });

    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({
        orientation: 'top',
        injectInto: 'infovis',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 20,
        //set max levels to show. Useful when used with
        //the request method for requesting trees of specific depth
        constrained: false,
        levelsToShow: 1000,
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        offsetY: 200,
        Node: {
            height: 20,
            width: 90,
            //use a custom
            //node rendering function
            type: 'rectangle',
            color:'#23A4FF',
            lineWidth: 2,
            align:"center",
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            lineWidth: 2,
            color:'#23A4FF',
            overridable: true
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node) {
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
                st.onClick(node.id);
            };
            //set label styles
            var style = label.style;
            style.width = 90 + 'px';
            style.height = 17 + 'px';            
            style.cursor = 'pointer';
            style.color = '#fff';
            //style.backgroundColor = '#1a1a1a';
            style.fontSize = '1em';
            style.textAlign= 'center';
            //style.textDecoration = 'underline';
            style.paddingTop = '3px';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node) {
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#1f00ff";
            }
            else {
                delete node.data.$color;
            }
        },
        
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj) {
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    //st.loadJSON(eval( '(' + json + ')' ));
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
}
