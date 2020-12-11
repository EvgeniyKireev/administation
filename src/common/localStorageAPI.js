const getLocalData = (key) => {
    let data = localStorage.getItem(key);
    if (data !== null)
        return JSON.parse(data);
    return [];
}
const addDataToLocalArray = (key, data) => {
    const currentData = localStorage.getItem(key);
    let dataArray = [];

    if (currentData !== null)
        dataArray = JSON.parse(currentData);

    dataArray.push(data);
    localStorage.setItem(key, JSON.stringify(dataArray));
}
const removeDataFromLocalArray = (key, delKey) => {
    const currentData = localStorage.getItem(key);
    let dataArray;

    if (currentData !== null)
    {
        dataArray = JSON.parse(currentData);
        dataArray = dataArray.filter(item => item.email !== delKey);
        localStorage.removeItem(key);
        if (dataArray.length !== 0)
            localStorage.setItem(key, JSON.stringify(dataArray))
    }
}
const editDataFromLocalArray = (key, editKey, newUser) => {
    const currentData = localStorage.getItem(key);
    let dataArray;
    let user;
    if (currentData !== null)
    {
        dataArray = JSON.parse(currentData);
        user = dataArray.filter(item => item.email === editKey)
        console.log(user)
        user = {...user[0], password: newUser.password, phone: newUser.phone, fullName: newUser.name, role: newUser.role, dateChange: Date.now() }
        console.log(user)
        dataArray = dataArray.map(o => {
            if (o.email === user.email) {
                return user;
            }
            return o;
        });
        console.log(dataArray)
        localStorage.removeItem(key);
        if (dataArray.length !== 0)
            localStorage.setItem(key, JSON.stringify(dataArray))
    }
}

export const ls = {getLocalData, addDataToLocalArray, removeDataFromLocalArray, editDataFromLocalArray}