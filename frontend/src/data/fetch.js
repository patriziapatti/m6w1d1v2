
//FETCH PER LA SEARCHBAR
export const loadPosts = async (search) =>{
    const urlBase = 'http://localhost:5000/blogPosts'
    const urlSearch= search && `?title=${search}`
    const res = await fetch (urlBase + urlSearch,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();
    return data
}

// export const loadPosts = async (search) =>{

//     const res = await fetch ('http://localhost:5000/blogPosts',{
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         const data = await res.json();
//         return data
//     }

// export const search = async () => {
// }

export const loadComments = async (id) =>{
    const res = await fetch (`http://localhost:5000/blogPosts/${id}/comments`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();
    return data
}

export const loadSinglePost = async (paramsId) =>{
    console.log(paramsId)
    const res = await fetch (`http://localhost:5000/blogPosts/${paramsId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();
    return data
}

export const newPost = async (formValue,cover) =>{
    const formData = new FormData()
    formData.append('cover', cover)
    formData.append('category', formValue.category)
    formData.append('title', formValue.title)
    formData.append('readTime', JSON.stringify(formValue.readTime))
    formData.append('author', formValue.author)
    formData.append('content', formValue.content)
    const res= await fetch ('http://localhost:5000/blogPosts', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },        
        method: "POST",
        body: formData
    })
    const data = await res.json() 
    // loadPosts()
    return data
} 

export const login = async (formValue) => {
    try {
        const res = await fetch('http://localhost:5000/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body:JSON.stringify (formValue)
        })
        if(res.ok){
            const data = await res.json();
            return data
        }else {const errorData = await res.json()
            return {error: errorData.message || 'Errore di login'}
        }
         
    } catch (error) {
        return {error: 'Errore, riporva più tardi'} 
    }    
}

export const me = async() =>{
    const res = await fetch('http://localhost:5000/auth/me',{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(!res.ok){
        throw new Error(res.status)
    }
    const data = await res.json();
    return data
}

export const register = async (regFormValue, avatar) => {
    // console.log(regFormValue)
    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('name', regFormValue.name)
    formData.append('surname', regFormValue.surname)
    formData.append('email', regFormValue.email)
    formData.append('password', regFormValue.password)
    console.log(formData)
    try {
        const res = await fetch('http://localhost:5000/auth/register', {
            // headers: {
            //     "Content-Type": "application/json"
            // },
            method: 'POST',
            body:formData
        })
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
    
}

export const newComment = async (id, formValue) =>{
 
    const res= await fetch (`http://localhost:5000/blogPosts/${id}/comments`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },        
        method: "POST",
        body: JSON.stringify(formValue)
    })
    const data = await res.json() 
    return data
} 