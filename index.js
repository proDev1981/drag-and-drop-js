
let currentItem

class DragItem{
    elements
    constructor(...elements){
        this.elements = elements
    }

    options(opt){}

    static dragStart(e){
        currentItem = e.target
        e.target.classList.add('dragenter')
        setTimeout(()=>{ e.target.classList.add('drag') },10)
    }

    static drag(e){
        //console.log('drag')
    }

   static createAll(...elements){
        elements.forEach(ele => {
            ele.addEventListener('dragstart', this.dragStart)
            ele.addEventListener('drag', this.drag)
        })
        return new DragItem(...elements)
   }
   static create(ele){
        ele.addEventListener('dragstart', this.dragStart)
        ele.addEventListener('drag', this.drag)
        return new DragItem(ele)
   }
}

class DropWrapper{
    elements

    constructor(...elements){
        this.elements = elements
    }

    options(opt){}

    static dragEnter(e){
        console.log('drag enter')
        if(!e.target.getAttribute('data-wrapper')) e.target.classList.add('reject')
    }

    static dragLeave(e){
        console.log('drag leave')
        if(!e.target.getAttribute('data-wrapper')) e.target.classList.remove('reject')
    }

    static dragEnd(e){
        console.log('darg end')
    }

    static dragOver(e){
        e.preventDefault()
        //if(!e.target.getAttribute('data-wrapper')) e.target.classList.add('reject')
    }
        
        
    static drop(e){
        console.log('drop')
        currentItem.classList.remove('drag')
        if(e.target.getAttribute('data-wrapper')){
            currentItem.classList.remove('dragenter')
            e.target.appendChild(currentItem)
        }  
    }

   static createAll(...elements){
        elements.forEach(ele => {
            ele.addEventListener('dragover', this.dragOver)
            ele.addEventListener('dragenter', this.dragEnter)
            ele.addEventListener('dragleave', this.dragLeave)
            ele.addEventListener('dragend', this.dragEnd)
            ele.addEventListener('drop', this.drop) 
        });
        return new DropWrapper(...elements)
    }
   static create(ele){
        ele.addEventListener('dragover', this.dragOver)
        ele.addEventListener('dragenter', this.dragEnter)
        ele.addEventListener('dragleave', this.dragLeave)
        ele.addEventListener('dragend', this.dragEnd)
        ele.addEventListener('drop', this.drop)
        return new DropWrapper(ele)
    }
}

(function main(){

    let items = document.querySelectorAll('.item')
    let list = document.querySelectorAll('.list')

    DragItem.createAll(...items).options({})
    DropWrapper.createAll(...list).options({})



}())
