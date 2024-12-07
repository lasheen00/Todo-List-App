let taskInput =document.getElementById('taskInput');

let addToDoBtn =document.getElementById('addToDo');

let allToDoList =[];

let mySelect = document.getElementById('mySelect');

let searchInput =document.getElementById('searchInput');


if (localStorage.getItem('taskToDo') != null) {

    allToDoList=JSON.parse(localStorage.getItem('taskToDo'));
    displayData(allToDoList);
}



addToDoBtn.addEventListener("click",function(){

    let task ={
        taskDetails:taskInput.value,
        isCompleted:false,
        id:`${Math.random() * 10000} - ${Math.random() * 10000}`
    }

    allToDoList.push(task);

    localStorage.setItem('taskToDo',JSON.stringify(allToDoList));

    displayData(allToDoList);
})





function displayData(arr)
{
    let cartona =``;
    for (let task of arr) {
        cartona += `
        <div class="col-11 todo">
                    <div class="row bg-dark      ${task.isCompleted==true ? 'completed' : ''}                      ">
                        <div class="col-8 py-3 fs-5" style="color:white" >${task.taskDetails}</div>
                        <div onClick="beCompleted('${task.id}')" class="col-2 py-3 bg-success d-flex justify-content-center">
                            <i class="fa-solid fa-check fs-3 d-flex align-items-center"></i>
                        </div>
                        <div onClick="deleteTask('${task.id}')" class="col-2 py-3 bg-danger d-flex justify-content-center">
                            <i class="fa-solid fa-trash fs-3 d-flex align-items-center"></i>
                        </div>
                    </div>
                </div>`
    }

    document.getElementById('todos-container').innerHTML=cartona;
}





function beCompleted(id)
{
    let index = allToDoList.findIndex(function(task){  return task.id==id  });
    allToDoList[index].isCompleted=allToDoList[index].isCompleted==true?false:true;
    displayAccordingToSelectValue();
}





mySelect.addEventListener('change', function(){
    displayAccordingToSelectValue();
})

function displayAccordingToSelectValue(){
    switch (mySelect.options[mySelect.selectedIndex].value) {
        case 'all':
            displayData(allToDoList);
            localStorage.setItem('taskToDo',JSON.stringify(allToDoList));

            break;

        case 'completed':
            let completedTask =allToDoList.filter(function(task){ return task.isCompleted==true });
            displayData(completedTask);
            localStorage.setItem('taskToDo',JSON.stringify(allToDoList));

            break;

            case 'uncompleted':
                let uncompletedTask =allToDoList.filter(function(task){ return task.isCompleted==false });
                displayData(uncompletedTask);
                localStorage.setItem('taskToDo',JSON.stringify(allToDoList));

                break;
    
        default:
            break;
    }
}



searchInput.addEventListener('input',function(e){

    let term =e.target.value;
    let searchResult =[];

    for (let i = 0; i < allToDoList.length; i++) {
        
        if (   allToDoList[i].taskDetails.toLowerCase().includes(term.toLowerCase())      ) {
            searchResult.push(allToDoList[i]);
        }
    }
    displayData(searchResult);
})







function deleteTask(id)
{
    let indexTask = allToDoList.findIndex(function(task){return task.id==id});
    allToDoList.splice(indexTask,1);
    localStorage.setItem("taskToDo",JSON.stringify(allToDoList));
    displayData(allToDoList);
}

