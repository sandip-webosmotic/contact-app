let getUsers = JSON.parse(localStorage.getItem('users'));

const Localstorage = {

    addData(values) {
        let userArray = [];
        if (getUsers === null) {
            userArray = [];
        }
        else {
            userArray = getUsers;
        }
        userArray.push(values)
        localStorage.setItem('users', JSON.stringify(userArray));
    }
}

export { Localstorage }