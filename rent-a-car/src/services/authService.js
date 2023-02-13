const baseUrl = 'https://localhost:7016';

export const login = async (userName, password) => {
    let res = await fetch(`${baseUrl}/api/Authentication/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

export const register = async (userName, password, email, firstName, lastName, phoneNumber, address, age, drivingLicenceNumber, expiredDate) => {
    let res = await fetch(`${baseUrl}/api/Authentication/register/renter`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName, password, email, firstName, lastName, phoneNumber, address, age, drivingLicenceNumber, expiredDate })
    });
console.log(res)
    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

export const registerDealer = async (userName, password, email, firstName, lastName, phoneNumber, address, companyName, companyNumber) => {
    let res = await fetch(`${baseUrl}/api/Authentication/register/dealer`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName, password, email, firstName, lastName, phoneNumber, address, companyName, companyNumber })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        console.log(jsonResult)
        throw jsonResult.message;
    }
};

export const logout = (token, userName) => {
    return fetch(`${baseUrl}/api/Authentication/logout`, {
        headers: {
            'Username': userName,
            'Token': token
        },
    })
};

export const getUser = () => {
    let username = localStorage.getItem('userName');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};