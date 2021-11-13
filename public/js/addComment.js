document.querySelector("#comment").addEventListener("submit",evt=>{
    evt.preventDefault();
    const fetchObj = {
        comment:document.querySelector("#addComment").value,
        blogpostId:document.querySelector("#blogpostId").value,
    }
    console.log(fetchObj);
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("add comment failed!")
        }
    })
})