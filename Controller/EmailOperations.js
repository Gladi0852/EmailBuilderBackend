const path = require("path");
const fs = require("fs");
const templates = require("../Model/Template.js");
const dummyData = require("../Data/layoutData.json"); // CommonJS way to import JSON

// Get Layout
function getLayout(req, res) {
  const file_path = path.resolve("public", "Templates", "layout.html");

  fs.readFile(file_path, "utf-8", (err, htmlContent) => {
    if (err) {
      return res.status(500).send("Error loading the email template.");
    }

    const responseData = {
      htmlContent,
      emailObject: dummyData,
    };

    res.json(responseData);
  });
}

// Save Template
async function saveTemplate(req, res) {
  const files = req.files;
  try {
    const newEmailTemplate = new templates({
      email: req.body.email,
      logoUrl: files[0].filename || "",
      title: req.body.title || "",
      titleColor: req.body.titleColor || "#ffffff",
      subtitle: req.body.subtitle || "",
      subTitleColor: req.body.subTitleColor || "#2563EB",
      bodyContent: req.body.bodyContent || "",
      bodyContentColor: req.body.bodyContentColor || "#000000",
      bodyImageUrl: files[1].filename || "",
      footerText: req.body.footerText || "",
      footerTextColor: req.body.footerTextColor || "#000000",
    });

    const savedTemplate = await newEmailTemplate.save();

    res.status(201).json({ message: "saved", id: savedTemplate.id });
  } catch (error) {
    console.error("Error saving email template:", error);
    res.status(500).json({ message: "Error saving email template." });
  }
}

// Download Layout
async function downloadLayout(req, res) {
  try {
    const { id } = req.params;
    const emailObject = await templates.findById(id);
    if (!emailObject) {
      return res.status(404).send("Template not found.");
    }

    const file_path = path.resolve("public", "Templates", "layout.html");

    fs.readFile(file_path, "utf-8", (err, htmlContent) => {
      if (err) {
        return res.status(500).send("Error loading the email template.");
      }

      const responseData = {
        htmlContent,
        emailObject,
      };

      res.json(responseData);
    });
  } catch (error) {
    console.error("Error in downloadLayout:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
}

// Export functions for use in routes
module.exports = {
  getLayout,
  saveTemplate,
  downloadLayout,
};
