let i=0
function addtask(){
    //Creating a new element and giving it a number and name on each button click
    i++
    const task = document.createElement("p")
    task.textContent = "Task " + i + " " +
    document.getElementById("taskinput").value + " " +
    document.getElementById("timeinput").value
    //appending the created elements on the "tasklist" div
    document.getElementById("tasklist").appendChild(task);
    
    //Deleting the inputs after use
    document.getElementById("taskinput").value = ""
    document.getElementById("timeinput").value = ""
}
