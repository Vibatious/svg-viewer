'use strict';

var button_id = 0
var svg = function () {
    return document.getElementsByClassName('preview');
}
let original_svg = function(){
    return document.getElementById("original_svg");
}
let color_picker_div = function(){
    let div = document.createElement("div");
    div.id = "color_picker";
    document.body.append(div)
}

let color_object = function(g_tag){
    let arr_fill = [],color_val;
    let e = {};
     for (var i = 0; i < g_tag.length; i++) { 
        e[i] = {};
        var tag_child = g_tag[i].childNodes;
        for (var j = 1; j < (tag_child.length - 1); j+=2) 
        { 
            color_val = g_tag[i].childNodes[j].getAttribute('fill');
            if(color_val === "none"){continue;}
            if(e)
            e[i][j] =g_tag[i].childNodes[j].getAttribute('fill') ;
        }
        arr_fill.push(e[i]);
    }
    return arr_fill;
} 

let create_span= function(){
     var span = document.createElement("span")
     document.body.append(span)
}
let color_button = function(value){
    var btn = document.createElement("input");
    btn.type = "button";
    btn.addEventListener('click',()=>{
        color_picker(btn);
    })
    btn.classList.add("svg_color");
    btn.style.backgroundColor = value;
    document.getElementById("color_buttons").append(btn);
    button_id++;
}

let createButton = function(color_arr){
    color_arr.forEach(e => {
        for (var key in e){
           // create_span();
           color_button(e[key])
        }
    })
}

let color_picker = async function (btn){
    console.log("btn");
    color_picker_div();
    $("#color_picker").colorpicker();
    $("#color_picker")
    .on("change.color",(event,color)=>{
        btn.style.backgroundColor = color;
        $("#color_picker").off("change.color");
      })

}

let svg_handle = function() {
    let svg_doc,color_arr;
    svg_doc =  original_svg().contentDocument;
    var g_tag =svg_doc.getElementsByTagName('g');  
    color_arr = color_object(g_tag);
    createButton(color_arr);

    }


function preview(){
    const button = document.getElementById("upload_button");
    button.addEventListener("change",function(e){
       var  preview_svg = svg();
        for(var i=0;i<preview_svg.length;i++){
            preview_svg[i].data = URL.createObjectURL(e.target.files[0]);
            preview_svg[i].style.display = "inline";
        }  
        })
        
        original_svg().addEventListener('load',svg_handle);            
}

function init(){
   preview();
}

init();