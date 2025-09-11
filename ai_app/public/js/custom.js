document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("textarea").forEach(textarea => {
    if (textarea.parentElement.querySelector(".ai-generate-btn")) return;

    let btn = document.createElement("button");
    btn.textContent = "✨ AI Generate";
    btn.type = "button";
    btn.className = "btn btn-xs btn-secondary ai-generate-btn";
    btn.style.marginTop = "5px";
    btn.style.display = "block";

    textarea.parentElement.appendChild(btn);

    btn.addEventListener("click", () => {
      // Create Frappe dialog
      let d = new frappe.ui.Dialog({
        title: "AI Generate",
        fields: [
          {
            label: "Prompt",
            fieldname: "prompt",
            fieldtype: "Text",
            default: textarea.value.trim() || ""
          }
        ],
        primary_action_label: "Generate",
        primary_action(values) {
          frappe.call({
            method: "ai_app.api.ai.generate_text",
            args: { prompt: values.prompt || "" },
            callback(r) {
              if (r.message) {
                textarea.value = r.message;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
              d.hide();
            }
          });
        }
      });

      d.show();
    });
  });
});
