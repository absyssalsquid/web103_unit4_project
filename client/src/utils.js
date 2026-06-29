export const deleteSlime = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetch(`/api/slimes/${id}`, options)
}

export const updateSlime = async (id, data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch(`/api/slimes/${id}`, options)
    
}

export const createSlime = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    console.log('submitting ', data)
    const response = await fetch(`/api/slimes`, options)
    if (response.ok){
        const data = await response.json()
        return data.id
    }
    return null
}