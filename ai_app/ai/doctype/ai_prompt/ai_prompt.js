// Copyright (c) 2025, Ahsan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ai Prompt", {
    generate: function(frm) {
        frappe.prompt(
            [
                {
                    label: "Enter Prompt",
                    fieldname: "prompt",
                    fieldtype: "Small Text",
                    reqd: 1
                }
            ],
            function(values) {
                call_generate(values.prompt, frm);
            },
            "Generate Text",
            "Generate"
        );
    }
});

function call_generate(prompt, frm) {
    frappe.call({
        method: "ai_app.ai.doctype.ai_prompt.ai_prompt.generate_ai_text",
        args: {
            prompt: prompt,
            docname: frm.doc.name || ""   
        },
        freeze: true,
        freeze_message: "Generating response...",
        callback: function(r) {
            if (r.message) {
                frm.set_value("response_text", r.message);

                if (frm.doc.__unsaved || frm.doc.__islocal) {
                    frm.save();
                }

                frappe.show_alert("Response added and document saved");
            }
        }
    });
}
