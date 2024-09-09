
//FETCH CARICAMENTO POST CHE INCLUDE LA SEARCHBAR
export const loadPosts = async (search, page = 1, perPage = 8) => {
    const urlBase = 'http://localhost:5000/blogPosts';
    const searchParam = search ? `&title=${search}` : '';
    const url = `${urlBase}?page=${page}&perPage=${perPage}${searchParam}`;
  
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    const data = await res.json();
    return data;
  };


//FETCH PER CARICARE TUTTI I COMMENTI
export const loadComments = async (id) =>{
    const res = await fetch (`http://localhost:5000/blogPosts/${id}/comments`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();
    return data
}

//FETCH PER CARICARE SINGOLO POST TRAMITE ID
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


//FETCH PER CREAZIONE DI NUOVO POST TRAMITE IL FORM 
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


//FETCH PER LA LOGIN
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


//FETCH ME
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


//FETCH PER LA REGISTRAZIONE DEL NUOVO UTENTE
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


//FETCH PER AGGIUNGERE UN COMMENTO A SINGOLO POST
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

//FETCH PER ELIMINARE UN POST 
export const deletePost = async (postId) =>{
    try {
        const res = await fetch(`http://localhost:5000/blogPosts/${postId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },        
            method: "DELETE",
        })
        if (res.ok) {
            console.log(`Post con ID ${postId} eliminato con successo.`);
        } else {
            const errorData = await res.json()
            console.error(`Errore: ${errorData.message}`);
        }
    } catch (error) {
        console.error(`Errore durante l'eliminazione del post: ${error.message}`);
    }
}


//FETCH PER MODIFICARE I COMMENTI AI POST
export const updateComment = async (blogpostId, commentId, updatedCommentData) => {
    try {
      const response = await fetch(`http://localhost:5000/blogPosts/${blogpostId}/comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Invia il token JWT per autenticazione
        },
        body: JSON.stringify(updatedCommentData), // Il nuovo contenuto del commento
      });
  
      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento del commento");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Errore nell'update del commento:", error);
      throw error;
    }
  };


  //FETCH PER ELIMINARE UN COMMENTO
  export const deleteComment = async (blogpostId, commentId) => {
    /*   try { */
        const response = await fetch(`http://localhost:5000/blogPosts/${blogpostId}/comment/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assicurati di avere il token corretto
          },
        });
    }

//FETCH PER MODIFICARE IL POST (NO COVER)
// export const editPost = async (postId, formValue) =>{
//     const res = await fetch(`http://localhost:5000/blogPosts/${postId}`, {
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`,
//             "Content-Type": "application/json"
//         },        
//         method: "PUT",
//         body: JSON.stringify(formValue)
//     })

// }



// export const commentAuthor = async (authorId) =>{
//     const res= await fetch (`http://localhost:5000/authors/${authorId}`, {
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`,
//             "Content-Type": "application/json"
//         },        
//     })
//     const data = await res.json() 
//     return data
// }