

export const CreateResponse = (res, status, message) => {
    res.removeHeader("X-Powered-By");
    switch (status)
    {
        case 1:
            res.status(200).json(message);
            break;
        case 2:
            res.status(400).json(message);
            break;
        case 3:
            res.status(401).json(message);
            break;
        case 4:
            res.status(404).json(message);
            break;
        default:
            res.status(500).json({error: "internal error"});
            break;
    }
}