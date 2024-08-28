// export const loadAuthors = async () =>{
//     const res = await fetch ('http://localhost:5000/authors')
//     const data = await res.json();
//     return data
// }

export const loadPosts = async () =>{
    const res = await fetch ('http://localhost:5000/blogPosts')
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
        
        method: "POST",
        body: formData
    })
    const data = await res.json() 
    // loadPosts()
    return data
} 

// export const postAuthors = async () =>{
//     const res = await fetch ('http://localhost:5000/authors',{
//         headers: {
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//             name: "patri",
//             surname: "patt",
//             email: "patri@patt.com",
//             avatar: "qazxcvb"
//         })
//     })
//     const data = await res.json();
//     return data
//}

// export const putAuthors = async (id) =>{
//     const res = await fetch (`http://localhost:5000/authors/${id}`,{
//         headers:{
//             "Content-Type": "application/json",
//         },
//         method: "PUT",
//         body: JSON.stringify({
//             email: "patrizia@aizirtap.com",
//         })
//     })
//     const data = await res.json()
//     return data
// }