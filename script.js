const BASE_URL='https://swapi.dev/api/'
const buttonDeleteCheckedElements=getElementByClass('buttonDelete all')
const buttonsDiv=getElementById("buttonsWithKeysDiv")
const buttonDelete=getElementByClass('buttonDelete')
const checkbox=getElementByClass('checkbox')
const closeButton=getElementByClass('closeButton')
const container=getElementById('container')
const divWithNoResultText=getElementByClass('divWithNoResultText')
const divTable=getElementById('divTable')
const divExtend=getElementByClass('divExtend')
const header=getElementById('header')
const inputForPagination=getElementByClass('inputForPagination')
const idTd=getElementByClass('id')
const img=document.querySelector('img')
const inputSearchByIndex=getElementByClass('inputSearch ByIndex')
const media=matchMedia('(max-width:1000px)')
const music=new Audio('music/soundtrack/soundtrack.mp3')
const nextPageButton=getElementByClass('paginationButton right')
const previousPageButton=getElementByClass('paginationButton left')
const paginationDiv=getElementByClass('paginationDiv')
const resultsAndSearch=getElementById('resultsAndSearch') 
const results=getElementByClass('results')
const resultsDiv=getElementById('resultsDiv')
const searchButton=getElementByClass('buttonSearch ByIndex')
const selectArea=getElementByClass('pageSize')
const spanBetweenPagination=getElementByClass('spanBetweenPagination')
const spanBetweenPaginationText=getElementByClass('spanBetweenPaginationText')
const table=getElementById('table')
const tableAndPagination=getElementById('tableAndPagination')
const themeStylesheetLink=getElementById('themeStylesheetLink')
const trDeleteAllChecked =getElementByClass('trDeleteAllChecked')

let buttonDeleteAllExsist=0
let buttonName=''
let collection =null
let collectionArr=null
let extendViewClicked=0
let everClicked=0
let id=0
let inputForPaginationMin=1
let inputForPaginationMax
let isPaginationButton=0
let instances=null
let musicIsPlayed=0
let numberOfPages
let numOfChecked=0
let pageNumber=1
let pageSizeValue=10
let resultsValue=0
let searchByEndpointClicked=0
let searchByIndexClicked=0
let searchByEndpointInputValue=''
let soundVaderNumber=1
let soundYodaNumber=1
let textFromKeyboard=''

img.onclick=playMusic

class Base{
    constructor(created,url,name){
        this.created=created
        this.url=url
        this.name=name
    }
}

class People extends Base{
    constructor(name,birth_year,height,gender,created,url){
        super(created,url,name)
        this.birth_year=birth_year
        this.height=height
        this.gender=gender
    }
}

class Planets extends Base{
    constructor(name,terrain,surface_water,climate,created,url){
        super(created,url,name)
        this.terrain=terrain
        this.surface_water=surface_water
        this.climate=climate
    }
}

class Films {    
    constructor(url,title,episode_id,director,created){
        this.url=url
        this.title=title
        this.episode_id=episode_id
        this.director=director
        this.created=created
        
    }
}

class Species extends Base{
    constructor(name,average_height,classification,language,created,url){
        super(created,url,name)
        this.average_height=average_height
        this.classification=classification
        this.language=language
    }
}

class Vehicles extends Base{
    constructor(name,model,passengers,crew,created,url){
        super(created,url,name)
        this.model=model
        this.passengers=passengers
        this.crew=crew
    }
}

class Strarships extends Base{
    constructor(name,model,length,max_atmosphering_speed,created,url){
        super(created,url,name)
        this.model=model
        this.length=length
        this.max_atmosphering_speed=max_atmosphering_speed
    }
}
// Main functions start

async function getDataAndCreateButtons(){

    table.style.display='none'

    const response= await fetch(BASE_URL)
    const data= await response.json()

    createButtons(data)
    createDivAndButtonsForTheme()
}

getDataAndCreateButtons()

function createButtons(data){

    Object.keys(data).map(key=>{

        const button=createElement('button')

        addClassList(button,'key')
        innerHTML(button,key)
        buttonsDiv.appendChild(button)
        button.onclick=click
    })
}

async function click(){
    
    removeDivWithNoResultText()
    pageNumber=1
    searchByEndpointClicked=0
    buttonDeleteAllExsist=0
    numOfChecked=0
    buttonName=this.textContent

    const response=await fetch(`${BASE_URL}${buttonName}`)
    collection=await response.json()

    if (pageSizeValue==10){

       await fetchSpecificPage(pageNumber)
       
    }

    if (pageSizeValue==20){
       
        if (collection.count<10){
            await fetchSpecificPage(pageNumber)
        
        }
        else{

            await  fetch20DataForChangeAt20(pageNumber,pageNumber+1)
        }  
    }
    
    createInstances(buttonName)
}

function createInstances(buttonName){

    if(everClicked===0){

        everClicked=1
    }

  
    if(buttonName==='people'){

        instances=collectionArr.map(({name,birth_year,height,gender,created,url})=>
        new People (name,birth_year,height,gender,created,url))     
    }

    else if(buttonName==='planets'){

        instances=collectionArr.map(({name,terrain,surface_water,climate,created,url})=>
        new Planets (name,terrain,surface_water,climate,created,url))
        
    }

    else  if(buttonName==='films'){

        instances=collectionArr.map(({url,title,episode_id,director,created})=>
        new Films (url,title,episode_id,director,created))
        
    }

    else  if(buttonName==='species'){

        instances=collectionArr.map(({name,average_height,classification,language,created,url})=>
        new Species (name,average_height,classification,language,created,url))
          
    } 

    else  if(buttonName==='vehicles'){

        instances=collectionArr.map(({name,model,passengers,crew,created,url})=>
        new Vehicles (name,model,passengers,crew,created,url))
        
    }

    else  if(buttonName==='starships'){

        instances=collectionArr.map(({name,model,length,max_atmosphering_speed,created,url})=>
        new Strarships (name,model,length,max_atmosphering_speed,created,url))
       
    } 

    if (everClicked===1){
        clearTable()
        removePagination()
        clearResultsAndSearchDiv()
    }
    
    removeDivWithNoResultText()
    createResultField()
    innerHTML(results,`Results: ${resultsValue}`)
    createSearchFieled()
    createPagination()
    const keys=createHeader(instances)
    createTableBody(instances,keys)         
}

//Main functions end

function addClassList(element,classToAdd){
    element.classList=classToAdd  
} 

function changeSpanBetweenNextAndPrevButton(){
    
    inputForPagination[0].value=pageNumber
    innerHTML(spanBetweenPaginationText[0],` from ${numberOfPages}`) 
}

function clearNumOfCheckedAndButton(){

    buttonDeleteAllExsist=0
    numOfChecked=0
}

function clearResultsAndSearchDiv(){

    innerHTML(resultsAndSearch,'')
    innerHTML(resultsDiv,'')
}
 
function clearTable(){
    
    innerHTML(table,'') 

    if(extendViewClicked===1){

        extendViewClicked=0
        divTable.removeChild(divExtend[0])      
    }
}

async function clickNextPage(){

    clearNumOfCheckedAndButton()
    
    pageNumber++
   
    if (pageSizeValue==20){

        if(pageNumber>=numberOfPages){ 
            pageNumber=numberOfPages

            if (numberOfPages%2===0){

                createNewTableWithNewData((pageNumber*2)-1,pageNumber*2) 
            }  

            else {
                
                changeSpanBetweenNextAndPrevButton()
                await fetchSpecificPage((numberOfPages*2)-1)
                clearTable()
                createInstances(buttonName)    
            }
        }

        else {
            createNewTableWithNewData((pageNumber*2)-1,pageNumber*2)
      
        }      
    }

    else if  (pageSizeValue==10){

        if  (pageNumber>numberOfPages){
            pageNumber=numberOfPages  
           
        }

        else if (searchByEndpointClicked===1){

            const response=await fetch (collection.next)
            collection=await response.json()
            resultsValue=collection.count
            numberOfPages=countNumberOfPages(pageSizeValue)
            collectionArr=collection.results
            createInstances(buttonName)

            }

        else {
            await fetchSpecificPage(pageNumber)
            changeSpanBetweenNextAndPrevButton()
            numberOfPages=countNumberOfPages(pageSizeValue)
    
            clearTable()
            createInstances(buttonName)
        }    
    } 

    if (searchByEndpointClicked===1||searchByIndexClicked===1){

        selectArea[0].setAttribute('disabled',true)  
    }
}

async function clickPreviousPage(){
    
    if (pageSizeValue==20){
       
        if(pageNumber<=1){

            pageNumber=1 
        } 

        else{
            
            pageNumber--
            createNewTableWithNewData((pageNumber*2)-1,pageNumber*2)
          }  
        }

    if (pageSizeValue==10){

        if  (pageNumber<=1){
    
            pageNumber=1   
            return
        }

        pageNumber--

        if (searchByEndpointClicked===1){


            const response=await fetch (collection.previous)
            collection=await response.json()
            resultsValue=collection.count     
            collectionArr=collection.results
            createInstances(buttonName)
        }

        else{

            createNewTableWithNewData()
        }      
    }  
    if (searchByEndpointClicked===1||searchByIndexClicked===1){
        selectArea[0].setAttribute('disabled',true)
    }
}

function closeExtendWindow(){
    extendViewClicked=0
    divTable.removeChild(this.parentNode)
}

function countNumberOfPages(pageSizeValue){

    const actuallyCollectionNumberOfPositions=collection.count
    numberOfPages=Math.ceil(actuallyCollectionNumberOfPositions/pageSizeValue)
    return numberOfPages
}

function cozyTheme(){

    themeStylesheetLink.setAttribute('href','style/defaultMode.css')
    img.setAttribute('src','images/starWars2.png')
}

function createActionsButton(){

    const buttonExpand=createElement('button')
    const buttonDelete=createElement('button')
    const trashBoxIcon=createElement('icon')
    const plusIcon=createElement('icon')
    const checkbox=createElement('input')
    

    checkbox.setAttribute('type','checkbox')

    addClassList(buttonExpand,`buttonExpand`)
    addClassList(buttonDelete,`buttonDelete`)
    addClassList(trashBoxIcon,'icon-trash')
    addClassList(plusIcon,'icon-plus' )
    addClassList(checkbox,'checkbox')
   
    buttonExpand.appendChild(plusIcon)
    buttonDelete.appendChild(trashBoxIcon)
    buttonDelete.appendChild(checkbox)

    buttonExpand.onclick=targetElement
    buttonDelete.onclick=targetElement
    checkbox.onclick=removeOrAddCheckedAtrribute

    return [buttonExpand,buttonDelete]  
}

function createButtonForAllChecked(){
  
    if (table.contains(trDeleteAllChecked[0])){
        table.removeChild(table.lastChild)
    }
  
    const tr=createElement('tr')
 
    const buttonDeleteCheckedElements=createElement('button')
    const trashBoxIcon=createElement('icon')
   
    addClassList(tr,'trDeleteAllChecked')
  
    addClassList(trashBoxIcon,'icon-trash')
    addClassList(buttonDeleteCheckedElements,'buttonDelete all')
    buttonDeleteCheckedElements.appendChild(trashBoxIcon)
  
    tr.appendChild(buttonDeleteCheckedElements)
    table.appendChild(tr)

buttonDeleteCheckedElements.onclick=createYesOrNoButtonForAllChecked
}

function createDivAndButtonsForTheme(){

    const button1=createElement('button')
    const button2=createElement('button')
    const div=createElement('div')
    const span=createElement('span')

    addClassList(button1,'lightMode')
    addClassList(button2,'darkMode')
    addClassList(div,'divColorTheme')
    addClassList(span,'themeSpan')

    innerHTML(span,'WRITE "VADER" OR "YODA" TO LISTEN THEM')
    innerHTML(button1,'GLOOMY-THEME')
    innerHTML(button2,'COZY-THEME')
   
    container.prepend(div)
    div.appendChild(span)
    div.appendChild(button2)
    div.appendChild(button1)
    
    button1.onclick=gloomyTheme
    button2.onclick=cozyTheme
}

function createElement(element){
    return document.createElement(element)
}

function createExtendView(target){

    
    if (collectionArr.length===1){

        id=0
    }

    else {
        idFromTableConvertedToSubstitueIdFromCollection(target)
    }

    if(extendViewClicked===0) {

        extendViewClicked=1

        const div=createElement('div')
        const divForClosingButtonText=createElement('div')
        const tr=createElement('tr')
        const th1=createElement('th')
        const th2=createElement('th')
        const closeButton=createElement('button')
        const crossIcon=createElement('icon')
        const crossIcon2=createElement('icon')
        const tableExtend=createElement('table')
        const text='close--extended--window'
        const collectionForSpecificId=collectionArr[id]

        addClassList(closeButton,'closeButton')
        addClassList(crossIcon,'icon-cancel')
        addClassList(div,'divExtend')
        addClassList(crossIcon2,'icon-cancel')
        addClassList(tableExtend,'tableExtend')

        closeButton.appendChild(crossIcon)
        closeButton.appendChild(divForClosingButtonText)
        closeButton.appendChild(crossIcon2)
        div.appendChild(closeButton)
        divTable.appendChild(div)
        tr.appendChild(th1)
        tr.appendChild(th2)
        tableExtend.appendChild(tr)

        innerHTML(th1,"KEY")
        innerHTML(th2,"VALUE")

        Object.entries(collectionForSpecificId).forEach(([key,value])=>{

            const tr=createElement('tr')
            const td1=createElement('td')
            const td2=createElement('td')

            innerHTML(td1,key)
            innerHTML(td2,value)
        
            tr.appendChild(td1)
            tr.appendChild(td2)

            tableExtend.appendChild(tr)
            closeButton.onclick=closeExtendWindow 
        })
        
        for(i=0;i<text.length;i++){

            const p=createElement('p')
            innerHTML(p,text[i])
            divForClosingButtonText.appendChild(p)
        }

        div.appendChild(tableExtend)
        
    }
     else if  (extendViewClicked===1){

        closeButton[0].style.backgroundColor='var(--delete-no-button-hover-color)'
    }
    
    return
}

function createHeader(instances){
    
    const rowKeys= Object.keys(instances[0])
    const header=createElement('tr')
    const id=createElement('th')
    const keys=[]

    let initialValue=rowKeys.length-4
    let finishValue=rowKeys.length

    innerHTML(id,'ID')
    addClassList(id,'id')

    header.appendChild(id)

    if(!instances[0].hasOwnProperty('name')){

        initialValue= 1
        finishValue=rowKeys.length-1   
    }
 
    for (i=initialValue;i<finishValue;i++){

        const th = createElement('th')
        const nameOfButton=rowKeys[i].split('_').join(' ').toUpperCase()

        innerHTML(th,nameOfButton)
        header.appendChild(th)

        keys.push(rowKeys[i])    
    } 
    const created=createElement('th')
    const actions=createElement('th')

    addClassList(created,'created')
    addClassList(actions,'actionsTh')
    
    innerHTML(created,'CREATED')
    innerHTML(actions,'ACTIONS')
  
    header.appendChild(created)
    header.appendChild(actions)
    table.appendChild(header)
    keys.push('created','actions')
    return keys  
}

function createIdNumber(index){

    const idRow=createElement('td')
    addClassList(idRow,'id')
    
    if (pageNumber<=1){

        innerHTML(idRow,index+1)
        return idRow
    }

    else if (pageNumber>1){

        if (pageSizeValue==20){

            const dif=pageNumber-1
 
            innerHTML(idRow,index+1+dif*20)
            return idRow 
        }

        else{
            innerHTML(idRow,index+1+((pageNumber-1)*10))
            return idRow 
        }
    }
}

async function createNewTableAndNumberOfPages(pageNumber1,pageNumber2){
    
    numberOfPages= countNumberOfPages(pageSizeValue)  
    await  fetch20DataForChangeAt20(pageNumber1,pageNumber2)
    clearTable()
    createInstances(buttonName)    
}

async function createNewTableWithNewData(pageNumber1,pageNumber2){

    clearNumOfCheckedAndButton()

    numberOfPages= countNumberOfPages(pageSizeValue)  

        if(pageSizeValue==20){

            await fetch20DataForChangeAt20(pageNumber1,pageNumber2)
        }
            
        if (pageSizeValue==10){

            await fetchSpecificPage(pageNumber)
        }
            
        clearTable()
        removePagination()
        createInstances(buttonName)
        changeSpanBetweenNextAndPrevButton()
}  

function createPagination(){  

    if (isPaginationButton===0){

        isPaginationButton=1
      
        const div=createElement('div')
        const previousPageButton=createElement('button')
        const nextPageButton=createElement('button')
        const arrowLeft=createElement('icon')
        const arrowRight=createElement('icon')
        const spanLeft=createElement('span')
        const spanRight=createElement('span')
        const spanBetweenPagination=createElement('span')
        const spanBetweenPaginationText=createElement('span')
        const pageSize=createElement('select')
        const inputForPagination=createElement('input')

        inputForPagination.value=pageNumber
        
        inputForPagination.setAttribute('type', 'number')
         
        tableAndPagination.appendChild(div)
        div.appendChild(previousPageButton)
        previousPageButton.appendChild(arrowLeft)
        previousPageButton.appendChild(spanLeft)
        div.appendChild(spanBetweenPagination)
        div.appendChild(nextPageButton)
        nextPageButton.appendChild(spanRight)
        nextPageButton.appendChild(arrowRight)
        div.appendChild(pageSize)
        spanBetweenPagination.appendChild(inputForPagination)
        spanBetweenPagination.appendChild(spanBetweenPaginationText)

        
        
        addClassList(pageSize,'pageSize')
        addClassList(inputForPagination,'inputForPagination')
        addClassList(div,'paginationDiv')
        addClassList(previousPageButton,'paginationButton left')
        addClassList(arrowLeft,'icon-left')
        addClassList(spanLeft,'paginationButtonSpan')
        addClassList(nextPageButton,'paginationButton right')
        addClassList(arrowRight,'icon-right')
        addClassList(spanRight,'paginationButtonSpan')
        addClassList(spanBetweenPagination,'spanBetweenPagination')
        addClassList(spanBetweenPaginationText,'spanBetweenPaginationText')


        innerHTML(spanLeft,'PREV')
        innerHTML(spanRight,'NEXT')
    
        for (i=1;i<=2;i++){
            const option=createElement('option')
            innerHTML(option,10*i)
            pageSize.appendChild(option)    
        }

        pageSize.value=pageSizeValue
        numberOfPages=countNumberOfPages(pageSizeValue)
      
        inputForPagination.min=inputForPaginationMin
        inputForPaginationMax=inputForPagination.max=numberOfPages

        innerHTML(spanBetweenPaginationText,` from ${numberOfPages}`)
        
        pageSize.onchange=select   
        nextPageButton.onclick=clickNextPage
        previousPageButton.onclick=clickPreviousPage
        inputForPagination.oninput=setNumberOfPage
    }
}

function createResultField(){

    const results=createElement('p')  
    resultsValue=collection.count

    addClassList(results,'results')

    resultsDiv.appendChild(results)
    
    innerHTML(results,`Results: ${resultsValue}`)

}

function createSearchFieled(){

    const button=createElement('button')
    resultsAndSearch.appendChild(button)
    button.innerHTML=`SHOW FULL COLLECTION OF ${buttonName.toUpperCase()}`
    addClassList(button,'buttonShowFullCollection')
    button.onclick=fetchFullCollection
    
    for(i=0;i<2;i++){

        const inputSearch=createElement('input')
        const span=createElement('span')
        const button= createElement('button')
        const searchIcon=createElement('icon')
        const classOfElement=i===0? 'ByIndex':'ByEndpoint'
        const typeOfInput=i===0? 'number':"search"

        const placeholderText=i===0? `1 to ${resultsValue}`:inputSearchByEndpoinPlaceholderText(buttonName)

        inputSearch.setAttribute('type', typeOfInput)
        inputSearch.setAttribute('placeholder', placeholderText)
        addClassList(span, 'spanForSearch')
        addClassList(inputSearch,`inputSearch ${classOfElement}`)
        addClassList(button, `buttonSearch ${classOfElement}`)
        addClassList(searchIcon,`icon-search ${classOfElement}`)
        
        button.appendChild(searchIcon)
        span.appendChild(inputSearch)
        span.appendChild(button)

        resultsAndSearch.appendChild(span)  
        
        button.onclick=targetElement

        inputSearch.onfocus=function(){
            this.placeholder=''   
        }
        inputSearch.onblur=function(){
            this.placeholder=placeholderText
            this.border='none'
        }
    }

    
}

function createTableBody(instances,keys){
    table.style.display='block'
    
    instances.map((element,index)=>{
  
        const tr=createElement('tr')
        const number=createIdNumber(index)
     
        const date=new Date(element.created)
        const readyDate=`${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
        
        tr.appendChild(number)
        for(i=0;i<keys.length-2;i++){

            const td=createElement('td')
            innerHTML(td,element[keys[i]])
            tr.appendChild(td)
        }

        const created=createElement('td')
        const actionsBar=createElement('td')

        addClassList(actionsBar,'actions')
        addClassList(created,'created')

        innerHTML(created,readyDate)

        tr.appendChild(created)
        actionsBar.appendChild(createActionsButton()[0])
        actionsBar.appendChild(createActionsButton()[1])
        tr.appendChild(actionsBar)
        table.appendChild(tr)
    })   
}

function createYesOrNoButtonForAllChecked(){

    const div=createElement('div')
    const yes=createElement('button')
    const no=createElement('button')
    const areUsureText=createElement('span')
    const tr=this.parentNode

    tr.removeChild(this) 
    div.appendChild(areUsureText)
    div.appendChild(yes)   
    div.appendChild(no)   
    tr.appendChild(div)

    addClassList(yes,'button yes all')
    addClassList(no,'button no all')
    addClassList(areUsureText,'areUsureText')
 
    innerHTML(areUsureText,'Do u want remove all marked element?') 
    innerHTML(yes,'YES') 
    innerHTML(no,'NO') 
    no.onclick=createButtonForAllChecked
    yes.onclick=removeCheckedElements
}

async function fetchFilteredByEndpointAndWithSpecificIndex(numberPageToFetch){
    
    const response =await fetch (`${BASE_URL}${buttonName}/?search=+${searchByEndpointInputValue}&page=${numberPageToFetch}`)
    collection= await response.json()
    collectionArr=collection.results
    
       
    createInstances(buttonName)
}

async function fetchFilteredByEndpointAndCreateNewInstances(buttonName){

    removeDivWithNoResultText()

    const response =await fetch (`${BASE_URL}${buttonName}/?search= ${searchByEndpointInputValue}`)
    collection= await response.json()
    pageSizeValue=10

    if (collection.count===0){
      
        const div=createElement('div')
        inputSearchByIndex[0].disabled=true
        inputSearchByIndex[0].placeholder='----'
        inputSearchByIndex[0].style.border='none'
        searchButton[0].disabled=true
        selectArea[0].disabled=true
        selectArea[0].style.pointerEvents='none'
        
            
        addClassList(div,'divWithNoResultText')
       
        tableAndPagination.prepend(div)
        
        innerHTML(div,`I can't find it!`)
        innerHTML(spanBetweenPagination[0],'0')
        innerHTML(results[0],`Results:${collection.count}`)

        clearTable()     
      
    }

    else{

        collectionArr=collection.results
        pageNumber=1
        createInstances(buttonName)
        selectArea[0].setAttribute('disabled',true)
    }   
}

async function fetchFullCollection(){

    
    removeDivWithNoResultText()
    const response=await fetch(`${BASE_URL}${buttonName}`)
    collection =await response.json()
    collectionArr=collection.results
    pageNumber=1
    searchByEndpointClicked=0 

    clearNumOfCheckedAndButton()
    createInstances(buttonName)
}

async function fetchSpecifyIndex(indexFromInput){

    const response=await fetch(`${BASE_URL}${buttonName}/${indexFromInput}/`)
    collectionArr=[await response.json()]
}

async function fetchSpecificPage(pageNumber){

    const response=await fetch(`${BASE_URL}${buttonName}/?page=${pageNumber}`)
    collection=await response.json()
    collectionArr=collection.results
}

async function fetch20DataForChangeAt20(pageNumber1,pageNumber2){
    const response1=await fetch(`${BASE_URL}${buttonName}/?page=${pageNumber1}`)
    const data1=await response1.json()
    const response2=await fetch(`${BASE_URL}${buttonName}/?page=${pageNumber2}`)
    const data2=await response2.json()
    
    collectionArr=[...data1.results,...data2.results]
    return data1
}

function findCheckbox(target){
    
        if (target.tagName==='BUTTON'){
    
            const checkbox=target.children[1]
            
            if(checkbox.hasAttribute('checked')){

                checkbox.removeAttribute('checked',false)
                numOfChecked--

                if (numOfChecked===0){
    
                    buttonDeleteAllExsist=0
                    table.removeChild(trDeleteAllChecked[0])    
                }
    
            }
    
            return
        }
     findCheckbox(target.parentNode)
    
}

function findExtendButtonTr(target){
  
    if (target.tagName==='TR'){ 
        createExtendView(target)
        return target
    }
    findExtendButtonTr(target.parentNode)
}

function findTargetActionsBar(target){

    if(target.tagName==='TD'){
        
        const div1=createElement('div')
        const div2=createElement('div')
        const yes=createElement('button')
        const no=createElement('button')
        const areUsureText=createElement('span')

        addClassList(div1,'divLeft')
        addClassList(div2,'divRight')
        addClassList(yes,'button yes')
        addClassList(no,'button no')
        addClassList(areUsureText,'areUsureText')
     
        innerHTML(areUsureText,'Are You sure?') 
        innerHTML(yes,'YES') 
        innerHTML(no,'NO') 
        innerHTML(target,'') 
      
        div1.appendChild(areUsureText)
        div2.appendChild(yes)
        div2.appendChild(no)  

        target.appendChild(div1)
        target.appendChild(div2)

        
        yes.onclick=removeRow
        no.onclick=function(){
            innerHTML(target,'')
            target.appendChild(createActionsButton()[0])
            target.appendChild(createActionsButton()[1])   
         } 
        return     
    }
    findTargetActionsBar(target.parentNode)  
}

function getElementByClass(className){
    return document.getElementsByClassName(className)
}

function getElementById(id){
    return document.getElementById(id)
}

function gloomyTheme(){

    themeStylesheetLink.setAttribute('href','style/glomyTheme.css')
    img.setAttribute('src','images/starWarsGloomy.png')
}

function idFromTableConvertedToSubstitueIdFromCollection(target){

    const rowIdNumber=(target.firstChild.textContent)-1
    const rowIdString=rowIdNumber.toString()

    if (pageSizeValue==10){
        if (pageNumber>1){

            id=rowIdString[rowIdString.length-1]
        }

        else id=rowIdNumber   
    }

    if(pageSizeValue==20){
        
        if (pageNumber>1){

            const dif= pageNumber-1
            idAfterRefactor= dif*20
            id=rowIdNumber-idAfterRefactor   
        }

        else id=rowIdNumber
    }
    
}

function innerHTML(parent, itemToAdd){
    return parent.innerHTML=itemToAdd
}

function inputSearchByEndpoinPlaceholderText(buttonName){

    if (buttonName==='people'){
        return `search by name`

    }
    else if (buttonName==='films'){
        return `search by title`

    }
    else if (buttonName==='starships'){
        return `search by name or model`

    }
    else if (buttonName==='vehicles'){
        return `search by name or model`

    }
    else if (buttonName==='species'){
        return `search by name`

    }
    else if (buttonName==='planets'){
        return `search by name`

    }


}

function playMusic(){

    if (musicIsPlayed===1){
            music.pause()
            musicIsPlayed=0
    }

    else{

            musicIsPlayed=1
            music.play()
        }
}  

async function searchByEndpoint(target){
    
    if (target.tagName==='SPAN'){
        
        searchByEndpointInputValue=target.firstChild.value
        
        if (searchByEndpointInputValue===''){

            target.firstChild.style.border='3px solid var(--red)'        
            return
        }

     

        else if (buttonName==='people'){
           await  fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }
        else if (buttonName==='planets'){
            await   fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }
        else if (buttonName==='films'){
            await   fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }
        else if (buttonName==='starships'){
            await   fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }
        else if (buttonName==='vehicles'){
            await   fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }
        else if (buttonName==='species'){
            await   fetchFilteredByEndpointAndCreateNewInstances(buttonName,searchByEndpointInputValue)
        }

        clearNumOfCheckedAndButton()

        searchByEndpointClicked=1
        return
    }
    searchByEndpoint(target.parentNode)
}

async function searchByIndex(target){

    console.log(numOfChecked,'search by index')

    
    
    if (target.tagName==='SPAN'){
        
        const indexFromInput=target.firstChild.value
       
        if ((indexFromInput==='')||(indexFromInput<1)||(indexFromInput>resultsValue)){
            target.firstChild.value=''
            target.firstChild.placeholder=`1 to ${resultsValue}` 
            target.firstChild.style.border='3px solid var(--red)'
        
            return 
        }

        else  if  (searchByEndpointClicked===1){

            clearNumOfCheckedAndButton()
        
            const collectionPage=+indexFromInput+10
            const numberPageToFetch=collectionPage.toString()[0]
            const indexFromInputLastDigit=indexFromInput[indexFromInput.length-1]
            let indexFromCollection=null
            pageNumber=numberPageToFetch
         
            await  fetchFilteredByEndpointAndWithSpecificIndex(numberPageToFetch)

            if (indexFromInputLastDigit==='0'){
               
                indexFromCollection=9 
            }

            else {

                indexFromCollection=indexFromInputLastDigit-1  
            }
          
            const searchingIdData=collection.results[indexFromCollection]
            const collectionURL=searchingIdData.url
            const response=await fetch(collectionURL) 
            collectionArr=[await response.json()]
           
            target.firstChild.style.backgroundColor='var(--white)'
            target.firstChild.style.border='none'

            createInstances(buttonName)
            innerHTML(idTd[1],indexFromInput)   
            
            selectArea[0].setAttribute('disabled',true) 

            return   
        }

        else {

            const collectionPage=+indexFromInput+10
            const numberPageToFetch=collectionPage.toString()[0]
            pageNumber=numberPageToFetch
    
            await  fetchSpecificPage(numberPageToFetch)   
    
            const indexFromCollection=indexFromInput[indexFromInput.length-1]
            dataIndexFromcollection =collection.results[+indexFromCollection-1]
            const collectionURL=dataIndexFromcollection.url
            const response=await fetch(collectionURL) 
            collectionArr=[await response.json()]    
               
    
            target.firstChild.style.backgroundColor='var(--white)'
            target.firstChild.style.border='none'
    
            createInstances(buttonName)
            innerHTML(idTd[1],indexFromInput)    
            return   
        }           
    }
     
    searchByIndex(target.parentNode)
}

async function select (event){
    
    clearNumOfCheckedAndButton()

    pageSizeValue=event.target.value
     
    if (pageSizeValue=='20'){

        if (numberOfPages==1){

            return
        }

        else if (pageNumber===1){

            createNewTableWithNewData(pageNumber,pageNumber+1)
        }

        else if (pageNumber%2===0){

            pageNumber=pageNumber/2
            await createNewTableAndNumberOfPages(pageNumber*2-1,pageNumber*2)
            changeSpanBetweenNextAndPrevButton()
        } 

        else if(!pageNumber%2===0){

            if(pageNumber==numberOfPages){
                
                numberOfPages= countNumberOfPages(pageSizeValue)
                pageNumber=numberOfPages
                changeSpanBetweenNextAndPrevButton()
                fetchSpecificPage(pageNumber*2-1)
                clearTable()
                createInstances(buttonName)
               
            }

            else{
                
                pageNumber=Math.ceil(pageNumber/2)
                createNewTableAndNumberOfPages(pageNumber*2-1,pageNumber*2)  
                changeSpanBetweenNextAndPrevButton()
               } 
            }     
    }  

    if (pageSizeValue=='10'){

        if (pageNumber==1){

            createNewTableWithNewData((pageNumber*2)-1,pageNumber*2)
        } 

        else if (pageNumber%2===0){
          
            pageNumber=pageNumber*2-1
            createNewTableWithNewData((pageNumber*2)-1,pageNumber*2) 
        }   

        else if (!pageNumber%2===0){

            if (pageNumber==numberOfPages){
                pageNumber=pageNumber*2-1
                createNewTableWithNewData()

                changeSpanBetweenNextAndPrevButton()   
            }

            else{

                    pageNumber=pageNumber*2-1
                    createNewTableWithNewData()  
                }
            }
    }
    inputForPagination.max=numberOfPages
}

async function setNumberOfPage(){   

    console.log(pageNumber)
 
    if (pageSizeValue==10){

        if (this.value>inputForPaginationMax||this.value<inputForPaginationMin){

            this.value=pageNumber
            return       
        }
           
        else {

            pageNumber=this.value
            createNewTableWithNewData()
        }
    }

    if(pageSizeValue==20){

        if (this.value>inputForPaginationMax||this.value<inputForPaginationMin){
    
            this.value=pageNumber
            return       
        }

        pageNumber=this.value
        
        if (pageNumber==numberOfPages){

            if(pageNumber%2!==0){
                
                await fetchSpecificPage(pageNumber*2-1)
                clearTable()
                createInstances(buttonName)     
            }
            else {
            
                pageNumber=this.value
                await createNewTableWithNewData(pageNumber*2-1,pageNumber*2)
                clearTable()
                createInstances(buttonName)   
            } 
        }

        else {
            
            pageNumber=this.value
            await createNewTableWithNewData(pageNumber*2-1,pageNumber*2)
            clearTable()
            createInstances(buttonName)   
        }    
    }
}

function removeCheckedElements(){

    table.removeChild(table.lastChild)
    const arr=[]

    for(element of checkbox){
        
       
        if (element.checked===true){

            const tr=element.parentNode.parentNode.parentNode
            arr.push(tr)   
            numOfChecked--    
        }
    }
    arr.forEach(element=>table.removeChild(element))
    
    buttonDeleteAllExsist=0  
}

function removeDivWithNoResultText(){

    if (tableAndPagination.contains(divWithNoResultText[0])){
        
        tableAndPagination.removeChild(divWithNoResultText[0])

    }  
}

function removeOrAddCheckedAtrribute(){  

    if (buttonDeleteAllExsist===0){

        createButtonForAllChecked()   
    }
    
    if (this.hasAttribute('checked')){

        numOfChecked--
        console.log(numOfChecked)

        if (numOfChecked===0){
            
          
            buttonDeleteAllExsist=0
            table.removeChild(trDeleteAllChecked[0])
            
        }
        this.removeAttribute('checked',false)
        
    }

    else {
        
        numOfChecked++
        console.log(numOfChecked)

        if (numOfChecked>0){
            buttonDeleteAllExsist=1
        }
        this.setAttribute('checked',true)
        
    }  
}

function removePagination(){

    if (isPaginationButton===1){
      
        tableAndPagination.removeChild(paginationDiv[0])
        isPaginationButton=0
    }
}

function removeRow(){
    const tr=this.parentNode.parentNode.parentNode
    table.removeChild(tr)
}

function targetElement(event){

    const target=event.target

    if (target.classList.contains('buttonDelete')||target.classList.contains('icon-trash')){

        if (buttonDeleteAllExsist===1){
            findCheckbox(target)
        }
        
        findTargetActionsBar(target)
    }

    else if (target.classList.contains('buttonExpand')||target.classList.contains('icon-plus')){ 
       
        findExtendButtonTr(target)
    }

    else if (target.classList.contains('ByIndex')){

        searchByIndex(target)
    }
    
    else if (target.classList.contains('ByEndpoint')){

        searchByEndpoint(target)
        searchByEndpointClicked=1
    }
     
}


window.addEventListener('keydown',function(event){
    
    textFromKeyboard+=event.code[event.code.length-1]

    if (textFromKeyboard.includes('VADER')){

        if(soundVaderNumber>5)
        {
            soundVaderNumber=1
        }

        const voice=new Audio(`music/vader/vader${soundVaderNumber}.wav`)
        voice.play()
        textFromKeyboard=''
        soundVaderNumber++   

    }
    if (textFromKeyboard.includes('YODA')){

        if(soundYodaNumber>4){

            soundYodaNumber=1
        }

        const voice=new Audio(`music/yoda/yoda${soundYodaNumber}.wav`)
        voice.play()
        textFromKeyboard=''
        soundYodaNumber++   
    }
})






