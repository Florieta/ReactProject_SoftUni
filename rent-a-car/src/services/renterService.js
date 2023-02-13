const baseUrl = "https://localhost:7016";


export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/Renter/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const Update = async (user, id) => {
    const res = await fetch(`https://localhost:7016/api/Authentication/user/renter/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    return await res.json();
};