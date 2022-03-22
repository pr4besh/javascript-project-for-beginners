const addBtn = document.querySelector("#add");

function addNewNote(text = "") {
   const note = document.createElement("div");
   note.classList.add("note");

   note.innerHTML = `
    <div class="tools">
        <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 2c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.5l3.5 4 3.5-4H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5zm4.302 11.987h-1.8v-1.799l4.978-4.97 1.798 1.799-4.976 4.97zm5.823-5.817-1.798-1.799L14.698 5l1.8 1.799-1.373 1.371z"></path></svg></button> 
        <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m8.5 18 3.5 4 3.5-4H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.5zM7.293 6.707l1.414-1.414L12 8.586l3.293-3.293 1.414 1.414L13.414 10l3.293 3.293-1.414 1.414L12 11.414l-3.293 3.293-1.414-1.414L10.586 10 7.293 6.707z"></path></svg></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

   const editBtn = note.querySelector(".edit");
   const deleteBtn = note.querySelector(".delete");
   const main = note.querySelector(".main");
   const textArea = note.querySelector("textarea");

   textArea.value = text;
   main.innerHTML = marked.parse(text);
   deleteBtn.addEventListener("click", () => {
      note.remove();
   });

   editBtn.addEventListener("click", () => {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
   });

   textArea.addEventListener("input", (e) => {
      const { value } = e.target;
      main.innerHTML = marked.parse(value);
   });

   document.body.appendChild(note);
}

addBtn.addEventListener("click", () => {
   addNewNote();
});
