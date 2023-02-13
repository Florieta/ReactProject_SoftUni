const baseUrl = "https://localhost:7016";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/Car`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/Car/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};


export const create = async (car) => {
    const res = await fetch('https://localhost:7016/api/Car', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    });
    return await res.json();
};

export const Update = async (car) => {
    const res = await fetch(`https://localhost:7016/api/Car`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    });
    return await res.json();
};

export const deleteCity = async (id) => {
    const res = await fetch(`${baseUrl}/api/Car/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}