// writing IIFE to avoid mix with global scope
(()=>{

//adding structure to the DOM 
function init($rootEl, sections){
    console.log('init called');
    $rootEl.classList.add('.accordion');
    const $accordionSections = document.createDocumentFragment();
    sections.forEach(({value,title,contents},index)=>{
        const $accordionItem = document.createElement('div');


        $accordionItem.classList.add('accordion-item');

        //creating a button in the accordion item .. 
        const $accordionTitleBtn = document.createElement('button');
        $accordionTitleBtn.classList.add('accordion-item-title');
        $accordionTitleBtn.type='BUTTON';
        $accordionTitleBtn.setAttribute('data-value',title);

        //creating a span inside the accordion-item .. 
        const $accordionTitleSpan = document.createElement('span');
        $accordionTitleSpan.classList.add('accordion-icon');
       
        //appending title and span to button .. 
        $accordionTitleBtn.append(title, $accordionTitleSpan);
        $accordionTitleBtn.indexValue = index;

        //creating contents div 
        const $accordionContents = document.createElement('div');
        $accordionContents.classList.add('accordion-item-content');
        $accordionContents.textContent = contents;
        $accordionContents.hidden = true;

        

        //adding both btn and contents to the accordion-item div. 

        $accordionItem.append($accordionTitleBtn, $accordionContents)

        //adding accordion-item to the fragment
        $accordionSections.appendChild($accordionItem)

    })
    $rootEl.appendChild($accordionSections)
}



// event binding 

function addEventBinding(){
   const $rootEl= document.querySelector('#accordion');
   let prevElement = null;
   $rootEl.addEventListener('click',function (event){

    const target = event.target;
    if(target.type !=='button' || !target.classList.contains('accordion-item-title')) return;
    // if the target is not a button or does not have the class accordion-item-title, exit the function

    // if the target is a button, we will toggle the content visibility
    // and also close the previous content if it exists
    console.log(prevElement, target);

    if(prevElement == null){
        prevElement = target;

    }
    else{
        if(prevElement.indexValue !== target.indexValue){
            prevElement.nextElementSibling.hidden = true;
        }
        prevElement = target;
    }


    const $accordionItem = target.closest('.accordion-item');
    const $accordionContent = $accordionItem.querySelector('.accordion-item-content');

    $accordionContent.hidden = !$accordionContent.hidden;

   })


}


const sections = [
      {
        value: 'html',
        title: 'HTML',
        contents:
          'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
      },
      {
        value: 'css',
        title: 'CSS',
        contents:
          'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
      },
      {
        value: 'javascript',
        title: 'JavaScript',
        contents:
          'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
      },
    ]

init(document.querySelector('#accordion'), sections)
addEventBinding()
 console.log('init called');
})();
