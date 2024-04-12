const root = document.getElementById('root')

const renderToDoList = (todos, name) => {
    const wrapper = document.createElement('div')
    const list = document.createElement('ul')
    const authorName = document.createElement('p')
    authorName.innerText = name

    todos.forEach((todos) => {
        const title = document.createElement('p')
        const li = document.createElement('li')
        li.classList.add('listItem')

        title.innerText = todos.title

        if(todos.completed) {
            const icon = document.createElement('img')
            icon.src = './check.png'
            icon.style.height = '16px'
            icon.style.width = '16px'

            li.appendChild(icon)
            li.style.textDecoration = 'line-through'
        }

        li.appendChild(title)
        list.appendChild(li)
    })

    wrapper.appendChild(authorName)
    wrapper.appendChild(list)

    root.appendChild(wrapper)

}

const userUrl = 'https://jsonplaceholder.typicode.com/users'
const userTodos = 'https://jsonplaceholder.typicode.com/todos'

const getData = (url) => {
    return fetch(url).then(res => res.json())
}

Promise.all([
    getData(userUrl),
    getData(userTodos)
]).then(([users, todos]) => {

    users.forEach((user) => {
        const todosList = todos.filter(todos => todos.userId === user.id)

        renderToDoList(todosList, user.name)
    })

})