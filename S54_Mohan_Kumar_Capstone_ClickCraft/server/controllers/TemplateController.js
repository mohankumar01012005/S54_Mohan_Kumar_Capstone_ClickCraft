const Templates = require("../Schemas/TemplateSchema")


const createTemplate = async (req, res) => {
    try {
        const { Preview, Image, Category } = req.body;
        const template = new Templates({
            Preview,
            Image,
            Category,
        });
        const newTemplate = await template.save();
        res.status(201).json({ template: newTemplate, message: "Template Created Successfully" });
    } catch (error) {
        console.error('Error creating template:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getTemplate = async (req, res) => {
    const { id } = req.params

    try {
        const Template = await Templates.findOne({ _id: id });

        if (!Template) {
            return res.status(404).json({ message: 'Template Not Found' });
        }
        res.status(200).json(Template);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}


const getAllTemplates = async (req, res) => {
    try {
        const allTemplates = await Templates.find();

        res.status(200).json(allTemplates);
    } catch (error) {
        console.error('Error getting templates:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateTemplateStats = async (req, res) => {
    const id = req.params.id

    try {
        const template = await Templates.findById(id);

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        if (req.body.likes !== undefined) {
            template.Likes = req.body.likes;
        }

        if (req.body.views !== undefined) {
            template.Views = req.body.views;
        }

        const updatedTemplate = await template.save();

        res.status(200).json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const Like = async (req, res) => {
    try {
        const templateId = req.params.id;
        const updatedTemplate = await Templates.findByIdAndUpdate(templateId, { $inc: { Likes: 1 } }, { new: true });
        res.json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const unLike = async (req, res) => {
    const templateId = req.params.id;

    try {
        const template = await Templates.findById(templateId);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        template.Likes -= 1;

        await template.save();

        res.status(200).json(template);
    } catch (error) {
        console.error('Error un liking template:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getTemplate, updateTemplateStats, getAllTemplates, createTemplate, Like, unLike }