
var tabHolder = document.querySelector("#tab-holder");

function onStart(){
    
    var htmlEditor = CodeMirror(document.querySelector("#html-editor"), {
        value: "<!-- HTML code here -->",
        tabSize: 5,
        mode: "xml",
        lineNumbers: true,
        // code mirror add on that auto refresahes the codemirror objects
        // so that when you switch tabs, even if the editor wasnt displayed yet, 
        // it checks to see
        // whenever the editor is finally displayed
        // so it can reinitialize the editor window
        // to be typed in
        autoRefresh: true
    });

    var cssEditor = CodeMirror(document.querySelector("#css-editor"), {
        value: "/* css code here */",
        tabSize: 5,
        mode: "css",
        lineNumbers: true,
        autoRefresh: true
    });

    var jsEditor = CodeMirror(document.querySelector("#javascript-editor"), {
        value: "// JavaScript code here",
        tabSize: 5,
        mode: "javascript",
        lineNumbers: true,
        autoRefresh: true
    });
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
onStart();
tabHolder.addEventListener("click", onTabClick)
