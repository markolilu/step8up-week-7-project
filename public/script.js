document.addEventListener("DOMContentLoaded", () => {
  const dataList = document.getElementById("data-list");
  const dataForm = document.getElementById("data-form");
  const dataInput = document.getElementById("data-input");
  const toggleBtn = document.getElementById("toggleBtn");

  const fetchData = async () => {
    try {
      const response = await fetch("/data");
      const data = await response.json();
      dataList.innerHTML = ""; 
      data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.text;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
          const newText = prompt("Enter new text:", item.text);
          if (newText) {
            fetch(`/data/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: newText }),
            })
              .then((response) => {
                if (response.ok) {
                  fetchData();
                }
              })
              .catch((error) => {
                console.error("Error updating data:", error);
              });
          }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
          try {
            const deleteResponse = await fetch(`/data/${item.id}`, {
              method: "DELETE",
            });
            if (deleteResponse.ok) {
              fetchData();
            }
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        });
          
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        dataList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  dataForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newData = { text: dataInput.value };

    try {
      const response = await fetch("/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        dataInput.value = ""; 
        fetchData(); 
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  });

  toggleBtn.addEventListener("click", () => {
      dataList.classList.toggle("hidden");
  });

  fetchData();
});

