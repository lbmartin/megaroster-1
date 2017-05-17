$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners()  
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  removeStudent(ev) {
    const btn = ev.target
    var a = btn.closest('.student')
    this.students.splice((this.students.length)-$(a).data('id'), 1)
    btn.closest('.student').remove()
    // Remove it from the this.students array
     //(location at which to remove in array, )
  },

  growListing(ev) {
    const growth = ev.target
    //growth.closest('.student')
    document.getElementById(ev.target).style.color = "blue";

  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)

    this.max ++
    f.reset()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    this.removeClassName(li, 'template')
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id
    li
      .querySelector('button.grow')
      .addEventListener('click',this.growListing.bind(this))


    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
    return li
    

  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')
