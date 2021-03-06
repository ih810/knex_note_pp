//Handlebars complier, this is a frontN template, reloadNotes will render the text below
var notesTemplate = Handlebars.compile(
`  {{#each notes}}
<div class="note col col-sm-6">
  <form>
    <textarea
      class="note form-control my-3 p-0"
      rows="4"
      cols="1"
      style="border:0px; resize:none; width:90%"
      id="{{this.id}}"
    >{{this.content}}</textarea>
  </form>
  </div>
  <div class="col col-sm-6 d-flex justify-content-start">
          <button
            type="button"
            class="btn-close"
            data-id="{{this.id}}"
            style="height: 30px;"
          >
            x
          </button>
        </div>
{{/each}}
`
);
$(document).ready(()=>{
  axios.get("/api/index").then((res)=>{
    console.log(res)
    console.log(res.data)
    $("#notes").html(notesTemplate({ notes: res.data }));
    bindListener();
  })
})

const reloadNotes = (notes)=>{
  $("#notes").html(notesTemplate({ notes: notes }));
  bindListener();
}

const bindListener =()=>{
  $("#add").submit((e)=>{
    e.preventDefault();

    let val = $("textarea[name=note]").val();
    if(val === ""){
      return;
    }

    $("textarea[name=note]").val("");
    axios
    .post("/api/index", {
      note: val,
    })
    .then((res)=>{
      console.log('post')
      reloadNotes(res.data);
    })
    .catch((err)=>{
      console.log('post gone wrong')
      console.log(err);
      // window.location.reload()
    });
  });

  $(".note").on("blur", (e)=>{
    const noteId = e.target.id;
    
    axios
    .put(`/api/index/${noteId}`, {
      note: $(`#${noteId}`).val(),
    })
    .then((res)=>{
      console.log('put')
      reloadNotes(res.data);
    });
  });

  $(".btn-close").on("click", (e)=>{
    console.log('e', e)
    console.log('etarget', e.target)
    console.log('etargetdataset', e.target.dataset)
    const noteId = e.target.dataset.id
    console.log('wt', noteId)
    axios
    .delete(`/api/index/${noteId}`)
    .then((res)=>{
      console.log('del')
      reloadNotes(res.data)
    })
  })
}