const baseUrl = "https://localhost:7016";

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/api/Order`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const getById = async (id) => {
    const res = await fetch(`${baseUrl}/api/Order/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
};

export const Create = async (data) =>{
   const res =  await fetch(`${baseUrl}/api/Order`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}