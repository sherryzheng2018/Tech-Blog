if(document.querySelector("#createPost")){
document.querySelector("#createPost").addEventListener("submit",(e)=>{
    e.preventDefault();
    const fetchObj = {
        title: document.querySelector("#newPostTitle").value,
        content: document.querySelector("#newPostContent").value,
    }
    fetch("/api/blogposts",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            return alert("comment failed!")
        } else {
            res.json().then(data=>{
                location.href = '/dashboard'
            })
        }
    })
});

}
if(document.querySelector("#editPost")) {
document.querySelector("#editPost").addEventListener("submit",(e)=>{
    e.preventDefault();
    const fetchObj = {
        title: document.querySelector("#newPostTitle").value,
        content: document.querySelector("#newPostContent").value,
    }
    fetch("/api/blogposts/"+document.querySelector("#postId").value,{
        method:"PUT",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            return alert("comment failed!")
        } else {
            res.json().then(data=>{
                location.href = `/dashboard/`
            })
        }
    })
})

document.querySelector("#delete").addEventListener("click",(e)=>{
    e.preventDefault();
    fetch("/api/blogposts/"+document.querySelector("#postId").value,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            return alert("delete failed!")
        } else {
            res.json().then(data=>{
                location.href = `/dashboard/`
            })
        }
    })
})
}

