
var tabHolder = document.querySelector("#tab-holder");


    
var htmlEditor = CodeMirror(document.querySelector("#html-editor"), {
    value: "<!-- HTML code here -->",
    tabSize: 2,
    mode: "xml",
    lineNumbers: true,
    // code mirror add on that auto refresahes the codemirror objects
    // so that when you switch tabs, even if the editor wasnt displayed yet, 
    // it checks to see
    // whenever the editor is finally displayed
    // so it can reinitialize the editor window
    // to be typed in
    autoRefresh: true,
    // highlights closing or opening tag when cursor is over element tag
    // needs fold/xml script to work.
    matchTags: {bothTags: true},
    // auto closes xml tag when opening tag is written
    autoCloseTags: true
});

// listen for after whenever any key is pressed in the html editor
document.querySelector("#html-editor").addEventListener("keyup", (event) =>{
    // checks to make sure the key pressed wasnt enter, {, }, or shift
    if(event.keyCode != 13  && !htmlEditor.state.completionActive && event.keyCode != 123 && event.keyCode != 125 && event.keyCode != 16){
        htmlEditor.showHint({completeSingle: false});
    }
    
});

// sets height of editor equal to parent element's height, .tab-content
htmlEditor.setSize(null, "100%");





var cssEditor = CodeMirror(document.querySelector("#css-editor"), {
    value: "/* CSS code here */",
    tabSize: 2,
    mode: {name: "css", globalVars: true},
    lineNumbers: true,
    autoRefresh: true,
    autoCloseBrackets: true,
    matchBrackets: {bothTags: true}
});

// listen for after whenever any key is pressed in the css editor
document.querySelector("#css-editor").addEventListener("keypress", (event) =>{
    // if key pressed was not enter and the csseditor is not already showing the
    // auto complete dropdown. display dropdown.
    // checks to make sure the key pressed wasnt enter, {, }, (, ), ;, or shift.
    if(event.keyCode != 13  && !cssEditor.state.completionActive && event.keyCode != 123 && event.keyCode != 125 && event.keyCode != 16 && event.keyCode != 40 && event.keyCode != 41 && event.keyCode != 59){
        cssEditor.showHint({completeSingle: false});
    }
    
});

cssEditor.setSize(null, "100%");

var jsEditor = CodeMirror(document.querySelector("#javascript-editor"), {
    value: "// JavaScript code here",
    tabSize: 2,
    mode: "javascript",
    lineNumbers: true,
    autoRefresh: true,
    autoCloseBrackets: true,
    matchBrackets: {bothTags: true}
});

// listen for after whenever any key is pressed in the css editor
document.querySelector("#javascript-editor").addEventListener("keypress", (event) =>{
    // checks to make sure the key pressed wasnt enter, {, }, (, ), ;, :, =, or shift.
    if(event.keyCode != 13 && !jsEditor.state.completionActive && event.keyCode != 123 && event.keyCode != 40 && event.keyCode != 41 && event.keyCode != 125 && event.keyCode != 16 && event.keyCode != 59 && event.keyCode != 58 && event.keyCode != 61){
        jsEditor.showHint({completeSingle: false});
    }
    
});

jsEditor.setSize(null, "100%");


function runCode(){
    // the preview window on rightside of the screen where user code will 
    // be written to
    var previewCodeWindow = document.querySelector("#preview").contentWindow.document;

    var cssUserCode = "<style>" + cssEditor.getValue() + "</style>";
    var htmlUserCode = htmlEditor.getValue();
    var jsUserCode = "<s" + "cript>" + jsEditor.getValue() + "</s" + "cript>";

    previewCodeWindow.open();
    previewCodeWindow.write(htmlUserCode + cssUserCode + jsUserCode);
    previewCodeWindow.close();
}



function onTabClick(event){

    // if element clicked is one of the tabs
    if(event.target.classList.contains("tab")){
        
        // returns an html collection which acts somewhat like an array
        var allEditors = document.getElementsByClassName("tab-content");
        var allTabs = document.getElementsByClassName("tab");

        for(var i = 0; i < allEditors.length; i++){
            // sets every editors display back to none

            if(!allEditors[i].classList.contains("d-none")){
                allEditors[i].className = allEditors[i].className += " d-none";
            }
            
        }

        for(var i = 0; i < allTabs.length; i++){
            // removes the class that shows which tab is currently active.
            allTabs[i].className = allTabs[i].className.replace(" currActive", "");
        }

        // get id of editor that should be shown by getting the clicked tabs 
        // text content and then adding it before -editor
        var currEditor = event.target.textContent.toLowerCase() + "-editor";

        // get the editor by id and display it
        document.getElementById(currEditor).className = document.getElementById(currEditor).className.replace(" d-none", "");

        event.target.className += " currActive";

    }
    
}



// events
document.querySelector("#run-code").addEventListener("click", runCode);
tabHolder.addEventListener("click", onTabClick)
