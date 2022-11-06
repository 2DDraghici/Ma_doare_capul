

const simpotome = document.querySelector('#raspuns');

function renderSimptom(doc)

{   
    let li = document.createElement('div');
    li.setAttribute('class', 'boala')
    let nume = document.createElement('span')
    let simptom = document.createElement('span')
    let cross = document.createElement('div')
    let descriere = document.createElement('div')
    descriere.setAttribute('class', "descriere")

    li.setAttribute('data-id', doc.id);
    nume.textContent = doc.data().Nume
    simptom.textContent = doc.data().Simptome
    cross.textContent = "x"

    descriere.appendChild(nume)
    descriere.appendChild(simptom)
    li.appendChild(descriere)
    li.appendChild(cross)

    simpotome.appendChild(li)

    //delete data
    cross.addEventListener('click', (e) =>
    {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('Dureri de cap').doc(id).delete()
    })
}


function selectedSubjectName() {
    var subjectIdNode = document.getElementById('dropdown');
    var value =
    subjectIdNode.options[subjectIdNode.selectedIndex].value;
    console.log("The selected value= " + value);
    simpotome.innerHTML = ''
    db.collection("Dureri de cap").where("Nume","==",value).get().then((snapshot) => {
        snapshot.docs.forEach(doc =>{
            renderSimptom(doc)
        })
    })
}
