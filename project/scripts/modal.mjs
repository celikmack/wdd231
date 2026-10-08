// Create Dialog Modal box

export function setupModal() {
  const modal = document.querySelector("#modal");
  const closeBtn = document.querySelector("#close-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

export function openFactSheet(animal) {
  console.log("opening fact sheet for:", animal);
  const modal = document.querySelector("#modal");
  const modalBox = document.querySelector("#modal-box");

  // Generate HTML for all keys except description and image
  let box = `<h2>${animal.common_name}</h2>`;
  
  for (const [key, value] of Object.entries(animal)) {
    if (key !== "description" && key !== "image" && key !== "type") {
      // Format key nicely (e.g., "common_name" -> "Common Name")
      const formattedKey = key.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase());
      box += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
    }
  }

  modalBox.innerHTML = box;
  modal.showModal();
}