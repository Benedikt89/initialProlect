import {contactsRepository} from "../controllers/contacts-repository";
import express, {NextFunction, Request, RequestHandler, Response} from "express";

const get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let contacts = await contactsRepository.getContacts();
    return res.status(200).json(contacts.map(c => c.toClient()))
};
const post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const contact = req.body;
    await contactsRepository.addContact(contact);
    return res.status(201).json({
        message: 'Created Successful'
    })
};
const del: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.id;
    await contactsRepository.deleteContact(contactId);
    return res.status(201).json({
        message: 'Deleted Successful'
    })
};

const put: RequestHandler = async (req: Request, res: Response) => {
    let newContactInfo = req.body;
    let updated = await contactsRepository.updateContact(newContactInfo);
    res.status(201).send(updated)
};

const router = express.Router();
// Book routes
router.get('/', get);
router.put('/', put);
router.delete('/delete/:id', del);
router.post('/', post);

export default router;