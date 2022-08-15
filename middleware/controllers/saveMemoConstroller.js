const Memo = require('../../data/Memo');
const bcrypt = require('bcrypt');

const saveMemo = async (req, res) =>
{
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ 'message': 'title, and description are not filled in.'});
    
    // check for duplicate memo in the database
    const duplicatedMemo = await Memo.findOne({ title: title}).exec();
    if (duplicatedMemo) return res.sendStatus(409); // there is already the exact same memo
    
    try
    {
        // encrypt the memo
        const hashedTitle = await bcrypt.hash(title, Math.floor(Math.random() * 10)+1);
        const hashedDescription = await bcrypt.hash(description, Math.floor(Math.random() * 10)+1);
         
        // create and store the new user
        const result = await Memo.create(
        {
            "title": hashedTitle,
            "description": hashedDescription,
        });

        console.log(result);
        res.status(201).json({ 'success': `New memo ${title} is saved!` });
    }
    catch (err)
    {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { saveMemo };