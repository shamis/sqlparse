var iniDisplay = "inline";
var treeroot =
           { name : "select",
             top : 0,
             height : 0,
             children: [ { name : "",
                           height : 0,
                           top : 0,
                           display: iniDisplay,
                           children: [
                               { name : "atom", height : 0, top : 0, display: iniDisplay, children: []}
                               , { name : "big", height : 0, top : 0, display: iniDisplay, children: []}
                               , { name : "cool", height : 0, top : 0, display: iniDisplay, children: []}]
                         },
                         { name : "from",
                           height : 0,
                           top : 0,
                           display: iniDisplay,
                           children: [
                               { name : "apple", height : 0, top : 0, display: iniDisplay, children: []}
                               , { name : "ball", height : 0, top : 0, display: iniDisplay, children: []}
                               , { name : "cat", height : 0, top : 0, display: iniDisplay, children: []}]
                         },
                         { name : "where",
                           height : 0,
                           top : 0,
                           display: iniDisplay,
                           children: [
                               { name : "",
                                 height : 0,
                                 top : 0,
                                 display: iniDisplay,
                                 children: [
                                     { name : "man", height : 0, top : 0, display: iniDisplay, children: []},
                                     { name : "=", height : 0, top : 0, display: iniDisplay, children: []},
                                     { name : "monkey", height : 0, top : 0, display: iniDisplay, children: []}]
                               },
                               { name : "and",
                                 height : 0,
                                 top : 0,
                                 display: iniDisplay,
                                 children: [
                                     { name : "woman", height : 0, top : 0, display: iniDisplay, children: []},
                                     { name : "=", height : 0, top : 0, display: iniDisplay, children: []},
                                     { name : "ape", height : 0, top : 0, display: iniDisplay, children: []}]
                               }]
                         }]
           };

function build_boxes(tree)
{
    $('#container').text('');
    build_boxes_r(tree, $('#container'), 1, 0);
}

function prep_tree(tree)
{
    if(tree.name.length > 0)
        tree.height = def_height;
    for (var i=0; i < tree.children.length ; ++i) {
        if(i == 0 ) {
            if(tree.name.length > 0) tree.children[i].top = def_height;
        } else
            tree.children[i].top = tree.children[i-1].top + tree.children[i-1].height;
        prep_tree(tree.children[i]);
        tree.height += tree.children[i].height; 
    }
}

var def_height = 20;
var tab_len    = 10;
function build_boxes_r(tree, parent_node, left, depth) {
    var col = (200 - 20 * depth);
    var node = (tree.name.length > 0
                ? $('<div id="'+tree.name+'"></div>').text(tree.name)
                : $('<div></div>'));

    node.dblclick(function(evt) {
            event.stopPropagation();
            var dom = $(this).data("tree");
            for(var i=0; i < dom.children.length; ++i)
                if(dom.children[i].display == "none")
                    dom.children[i].display = iniDisplay;
                else
                    dom.children[i].display = "none";
            build_boxes();
        })
        .addClass('inner_div')
        .css('display', tree.display)
        .css('background-color', 'rgb('+col+','+col+','+col+')')
        .data("tree", tree);
    node.css('top', tree.top)
        .css('left', left + tab_len);
    parent_node.append(node);

    for (var i=0; i < tree.children.length ; ++i) {
        build_boxes_r(tree.children[i], node, left, depth + 1);
    }
    node.height(tree.height);
}

function get_node_bottom(n)
{
    var last_child = (n.children().length > 0 ? $(n.children()[n.children().length - 1]) : null);
    if(last_child != null)
        console.log(' get_node_bottom ' + last_child.attr('id') + ' ' + last_child.position().top + ' ' + last_child.height());
    else
        console.log(' get_node_bottom ' + n.attr('id'));
    return ((n.attr('id') == undefined
            ? 0
            : def_height)
           +
            (last_child != null
            ? last_child.position().top + last_child.height()
            : 0));
}

$(document).ready(function()
{
    prep_tree(treeroot);
    build_boxes(treeroot);
});
