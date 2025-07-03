
const addnote = document.querySelector('#addnote')

//creating to local storage function
const updateLSData = () =>{
    const textdatas = document.querySelectorAll('textarea')
    const notes = []
    //array manipulating
    textdatas.forEach((note)=>{
        return notes.push(note.value)
    })

    //adding into localstorage 
    //setitem to add item to local storage getitem to get item
    //format - (key,string)
    localStorage.setItem('notes',JSON.stringify(notes)) //cannot add array and object on string use json to convert itno string
}

//we text paramter
const addnewnote = (text = ' ')=>{
    //add div 
    const note = document.createElement('div')
    //add class
    note.classList.add('note')

    //html inner data to be add
    const innerdata = ` 
    <div class="operation">
        <button class="delete"> <i class="far fa-trash-alt"></i> </button>
        <button class="edit"> <i class="fas fa-edit"></i></button>
    </div>
    <div class="main ${text ? "" : " hiddden"}" ></div>
    <textarea class ="${text ? "hidden" : " "}" wrap ="off" placeholder = "Enter Note Here" name="" id="" cols="40" rows="5"></textarea> `

    //inserting html in div

    note.insertAdjacentHTML('afterbegin',innerdata)

    //getting the refrences

    //use note. because the all are in note div

    const editbtn = note.querySelector('.edit')
    const delbtn = note.querySelector('.delete')
    const maindiv = note.querySelector('.main')
    const textarea = note.querySelector('textarea')

    //deleting the node

    delbtn.addEventListener('click',()=>{
        note.remove()
        updateLSData()
    })

    //textarea

    textarea.value =text
    maindiv.innerHTML=text

    //change will give value after event is change

    //event object parent object of all events give which btn is used value text areaetc
    textarea.addEventListener('change',(event)=>{
        const value = event.target.value
        maindiv.innerHTML=value
        updateLSData()

    })
    //toggling edit btn

    editbtn.addEventListener('click',()=>{
        //toogling hidden class
        maindiv.classList.toggle('hidden')
        textarea.classList.toggle('hidden')

    })

    //it append node as the child of node

    document.body.appendChild(note)


}

//getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes')) //string to array

if(notes){
    notes.forEach((note)=>{
        addnewnote(note)
    })
}

addnote.addEventListener('click', () => addnewnote())




